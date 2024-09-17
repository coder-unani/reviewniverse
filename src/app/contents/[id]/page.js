import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fetchVideoDetail } from '@/library/api/videos';
import VideoPoster from '@/components/ui/VideoPoster';
import VideoPeople from '@/components/ui/VideoPeople';
import VideoGallery from '@/components/ui/VideoGallery';
import { SETTINGS } from '@/config/settings';
import { HOME_REVALIDATE_SEC, SITE_KEYWORDS } from '@/config/constants';
import { EndpointManager, ENDPOINTS } from '@/config/endpoints';
import { fParseInt, fYear, fUpperCase } from '@/utils/format';
import {
  fBackgroundImage,
  fThumbnail,
  fReleaseText,
  fReleaseDate,
  fRatingColor,
  fRatingText,
  fRuntimeText,
  fPlatformFilter,
  fPlatformNameByCode,
  fActorCode,
  fStaffCode,
} from '@/utils/formatContent';
import { nanoid } from 'nanoid';
import { isEmpty } from 'lodash';
import MoreIcon from '@/resources/icons/more.svg';
import styles from '@/styles/pages/Contents.module.scss';

const VideoLikeButton = dynamic(() => import('@/components/ui/Button/VideoLike'), { ssr: false });
const ReviewButton = dynamic(() => import('@/components/ui/Button/Review'), { ssr: false });
const VideoSubInfoSwiper = dynamic(() => import('@/components/ui/Swiper/VideoSubInfo'), { ssr: false });
const VideoSynopsis = dynamic(() => import('@/components/ui/VideoSynopsis'), { ssr: false });
const VideoMyRating = dynamic(() => import('@/components/ui/VideoMyRating'), { ssr: false });
const VideoReviews = dynamic(() => import('@/components/ui/VideoReviews'), { ssr: false });
const ContentsClient = dynamic(() => import('@/components/ui/Client/Contents'), { ssr: false });

// ISR 재생성 주기 설정
export const revalidate = HOME_REVALIDATE_SEC;

/**
 * TODO:
 * - 반응형 레이아웃
 * - react modal 라이브러리 사용하기 (갤러리 등)
 * - react tooltip 라이브러리 사용하기 (ex.평점 취소하기)
 */

// Content
const getContent = async ({ videoId }) => {
  // 비디오 상세 API 호출
  const res = await fetchVideoDetail({ videoId });
  if (res.status === 200) {
    return res.data.data;
  } else {
    return {};
  }
};

// 메타 태그 설정
export const generateMetadata = async ({ params }) => {
  const { id } = params;
  const videoId = fParseInt(id);
  if (videoId === 0) {
    notFound();
  }

  const content = await getContent({ videoId });
  if (isEmpty(content)) {
    return {};
  }

  // TODO: 트위터, 페이스북, 카카오, 네이버 메타태그 설정
  // TODO: og태그 이미지 사이즈 고려, 이미지 사이즈 1200x630px 권장으로 인해 background 이미지 사용
  const title = content.title;
  const releaseYear = fYear(content.release);
  const synopsis = content.synopsis || '';
  // const imageUrl = fThumbnail(content.thumbnail);
  const imageUrl = fBackgroundImage(content.thumbnail);
  const path = EndpointManager.generateUrl(ENDPOINTS.VIDEO_DETAIL, { videoId });
  const url = `${SETTINGS.SITE_BASE_URL}${path}`;
  const keywords = content.tag ? `${SITE_KEYWORDS}, ${title}, ${content.tag}` : `${SITE_KEYWORDS}, ${title}`;

  const metaTitle = `${title} (${releaseYear}) | 리뷰니버스`;

  return {
    alternates: {
      canonical: url,
    },
    title: metaTitle,
    description: synopsis,
    keywords: keywords,
    openGraph: {
      url: url,
      title: metaTitle,
      description: synopsis,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: metaTitle,
        },
      ],
    },
  };
};

const Contents = async ({ params }) => {
  const { id } = params;
  const videoId = fParseInt(id);
  if (videoId === 0) {
    notFound();
  }

  const content = await getContent({ videoId });

  const uniqueId = nanoid();
  const backgroundImageUrl = fBackgroundImage(content.thumbnail);
  const titleOg = content.title_og || content.title_en || content.title || '';
  const titleKr = content.title || '';
  const genres = content.genre || [];
  const ratingTitle = '평점';
  const ratingColor = fRatingColor(content.rating);
  const ratingText = fRatingText(content.rating);
  const noticeAgeTitle = '관람등급';
  const noticeAge = fUpperCase(content.notice_age);
  const releaseText = fReleaseText(content.code);
  const releaseYear = fYear(content.release);
  const releaseDate = fReleaseDate(content.release);
  const countryTitle = '제작국가';
  const countries = content.country || [];
  const productionTitle = '제작사';
  const productions = content.production || [];
  const runtimeTitle = fRuntimeText(content.code);
  const runtime = content.runtime || '';
  const synopsisTitle = '작품 소개';
  const synopsis = content.synopsis || '';
  const poster = fThumbnail(content.thumbnail, false);
  const posterAlt = `${titleKr} 포스터`;
  const myRatingTitle = '평가하기';
  const platformTitle = '보러가기';
  const platforms = fPlatformFilter(content.platform);
  const actorTitle = '출연진';
  const actors = content.actor || [];
  const actorFormatCode = fActorCode;
  const staffTitle = '제작진';
  const staffs = content.staff || [];
  const staffFormatCode = fStaffCode;
  const galleryTitle = '갤러리';
  const gallery = content.thumbnail || [];
  const galleryAlt = `${titleKr} 스틸컷`;

  // 장르 컴포넌트
  const VideoGenres = ({ genres }) => {
    if (isEmpty(genres)) {
      return null;
    }

    return genres.map((genre, index) => (
      <li key={index}>
        <Link
          href={EndpointManager.generateUrl(ENDPOINTS.GENRE, { genreId: genre.id })}
          className={styles.detail__genre__link}
          aria-label={`${genre.name} 장르 보러가기`}
        >
          {genre.name}
        </Link>
      </li>
    ));
  };

  // 제작국가 컴포넌트
  const VideoCountries = ({ countries }) => {
    if (isEmpty(countries)) {
      return <p className={styles.detail__sub__content}>-</p>;
    }

    return countries.map((country, index) => (
      <p key={index} className={styles.detail__sub__content} data-indx={index + 1}>
        {country.name_ko}
      </p>
    ));
  };

  // 제작사 컴포넌트
  const VideoProductions = ({ productions }) => {
    if (isEmpty(productions)) {
      return <p className={styles.detail__sub__content}>-</p>;
    }

    return productions.map((production, index) => (
      <Link
        href={EndpointManager.generateUrl(ENDPOINTS.PRODUCTION, { productionId: production.id })}
        className={styles.detail__sub__content}
        aria-label={`${production.name} 제작사 보러가기`}
        key={index}
      >
        {production.name}
      </Link>
    ));
  };

  // 플랫폼 컴포넌트
  const VideoPlatforms = ({ platforms, title }) => {
    if (isEmpty(platforms)) {
      return null;
    }

    const imageBaseUrl = `${SETTINGS.CDN_BASE_URL}/assets/images/platform/`;

    return (
      <section className={styles.detail__platform__section}>
        <h4 className={styles.detail__main__title}>{title}</h4>
        <article className={styles.detail__platform__wrapper}>
          {platforms.map((platform, index) => (
            <button
              type="button"
              className={`platform-button ${styles.detail__platform}`}
              aria-label={`${fPlatformNameByCode(platform.code)} 보러가기`}
              data-url={platform.url}
              key={index}
            >
              <img
                className={styles.platform__image}
                src={`${imageBaseUrl}${platform.code}.png`}
                alt={fPlatformNameByCode(platform.code)}
              />
            </button>
          ))}
        </article>
      </section>
    );
  };

  return (
    <>
      <main className={styles.detail__main}>
        <section className={styles.detail__main__section}>
          <picture className={styles.detail__background__wrapper}>
            <div className={styles.detail__background} style={{ backgroundImage: `url(${backgroundImageUrl})` }} />
          </picture>

          <div className={styles.detail__main__info__container}>
            <div className={styles.detail__main__info__wrapper}>
              <article className={styles.detail__title__container}>
                <article className={styles.detail__title__wrapper}>
                  <p className={styles.detail__title__og}>{titleOg}</p>
                  <h2 className={styles.detail__title__kr}>{titleKr}</h2>
                </article>
                <ul className={styles.detail__genre__wrapper}>
                  <VideoGenres genres={genres} />
                </ul>
              </article>

              {/* 클라이언트 컴포넌트 */}
              <article className={styles.detail__control__container}>
                <article className={styles.detail__control__wrapper}>
                  <VideoLikeButton videoId={videoId} />
                  {/* <CollectionButton /> */}
                  <ReviewButton />
                </article>
              </article>
            </div>
          </div>

          <div className={styles.detail__sub__info__container}>
            <div className={`swiper ${styles.detail__sub__info__wrapper}`} data-swiper-id={uniqueId}>
              <div className="swiper-wrapper">
                <div
                  className={`swiper-slide sub-margin-right ${styles.detail__sub__info__item} ${styles.rating}`}
                  data-color={ratingColor}
                >
                  <p className={styles.detail__sub__title}>{ratingTitle}</p>
                  <div className={styles.detail__sub__content__wrapper}>
                    <p className={styles.detail__sub__content}>{ratingText}</p>
                  </div>
                </div>

                <div
                  className={`swiper-slide sub-margin-right ${styles.detail__sub__info__item} ${styles.notice__age}`}
                >
                  <p className={styles.detail__sub__title}>{noticeAgeTitle}</p>
                  <div className={styles.detail__sub__content__wrapper}>
                    <p className={styles.detail__sub__content}>{noticeAge}</p>
                  </div>
                </div>

                <div className={`swiper-slide sub-margin-right ${styles.detail__sub__info__item} ${styles.release}`}>
                  <p className={styles.detail__sub__title}>{releaseText}</p>
                  <div className={styles.detail__sub__content__wrapper}>
                    <p className={`${styles.detail__sub__content} ${styles.year}`}>{releaseYear}</p>
                    {releaseDate && <p className={`${styles.detail__sub__content} ${styles.date}`}>{releaseDate}</p>}
                  </div>
                </div>

                <div
                  className={`swiper-slide sub-margin-right ${styles.detail__sub__info__item} ${styles.country}`}
                  data-index={countries.length}
                >
                  <p className={styles.detail__sub__title}>{countryTitle}</p>
                  <div className={styles.detail__sub__content__wrapper}>
                    <VideoCountries countries={countries} />
                  </div>
                  {countries.length > 1 && <MoreIcon className={styles.detail__sub__button} />}
                </div>

                <div
                  className={`swiper-slide sub-margin-right ${styles.detail__sub__info__item} ${styles.production}`}
                  data-index={productions.length}
                >
                  <p className={styles.detail__sub__title}>{productionTitle}</p>
                  <div className={styles.detail__sub__content__wrapper}>
                    <VideoProductions productions={productions} />
                  </div>
                  {productions.length > 1 && <MoreIcon className={styles.detail__sub__button} />}
                </div>

                <div className={`swiper-slide sub-margin-right ${styles.detail__sub__info__item} ${styles.runtime}`}>
                  <p className={styles.detail__sub__title}>{runtimeTitle}</p>
                  <div className={styles.detail__sub__content__wrapper}>
                    <p className={styles.detail__sub__content}>{runtime}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className={styles.detail__sub__wrapper}>
          <section className={styles.detail__sub__section}>
            <VideoSynopsis synopsis={synopsis} title={synopsisTitle} />
            <VideoPoster poster={poster} alt={posterAlt} />

            <div className={styles.detail__more__wrapper}>
              <VideoMyRating videoId={videoId} title={myRatingTitle} />
              <VideoPlatforms platforms={platforms} title={platformTitle} />
            </div>
          </section>
          <VideoPeople people={actors} title={actorTitle} formatCode={actorFormatCode} />
          <VideoPeople people={staffs} title={staffTitle} formatCode={staffFormatCode} />
          <VideoGallery gallery={gallery} title={galleryTitle} alt={galleryAlt} />
          <VideoReviews videoId={videoId} />
        </div>
      </main>

      {/* 클라이언트 컴포넌트에서 Swiper 제어 */}
      <VideoSubInfoSwiper uniqueId={uniqueId} />
      <ContentsClient content={content} />
    </>
  );
};

export default Contents;
