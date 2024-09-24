import React from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { nanoid } from 'nanoid';
import { isEmpty } from 'lodash';

import { SETTINGS } from '@/config/settings';
import { DEFAULT_IMAGES, VIDEO_REVALIDATE_SEC, SITE_KEYWORDS } from '@/config/constants';
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
  fMakeImageUrl,
  fTrailerCode,
  fMakeThumbnailUrl,
} from '@/utils/formatContent';
import { cLog } from '@/utils/test';
import { fetchVideoDetail } from '@/library/api/videos';
import VideoLikeButton from '@/components/ui/Button/VideoLike';
import ReviewButton from '@/components/ui/Button/Review';
import ShareButton from '@/components/ui/Button/Share';
import VideoSynopsis from '@/components/ui/VideoSynopsis';
import VideoMyRating from '@/components/ui/VideoMyRating';
import VideoReviewSimple from '@/components/ui/VideoReviewSimple';
import PeopleImage from '@/components/ui/Button/People/Image';

import MoreIcon from '@/resources/icons/more.svg';
import PlayIcon from '@/resources/icons/play.svg';
import ArrowLeftIcon from '@/resources/icons/arrow-left.svg';
import ArrowRightIcon from '@/resources/icons/arrow-right.svg';
import styles from '@/styles/pages/Contents.module.scss';
import Video from '@/components/ui/Video';

const VideoSubInfoClient = dynamic(() => import('@/components/ui/Client/VideoSubInfo'), { ssr: false });
const VideoTrailerClient = dynamic(() => import('@/components/ui/Client/VideoTrailer'), { ssr: false });
const VideoGalleryClient = dynamic(() => import('@/components/ui/Client/VideoGallery'), { ssr: false });
const VideoPeopleClient = dynamic(() => import('@/components/ui/Client/VideoPeople'), { ssr: false });
const ContentsClient = dynamic(() => import('@/components/ui/Client/Contents'), { ssr: false });

// ISR 재생성 주기 설정
export const revalidate = VIDEO_REVALIDATE_SEC;

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
  // 숫자가 아닌 경우 notFound 페이지로 이동
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
  const path = EndpointManager.generateUrl(ENDPOINTS.CONTENTS, { videoId });
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
  // 숫자가 아닌 경우 notFound 페이지로 이동
  if (videoId === 0) {
    notFound();
  }

  const content = await getContent({ videoId });
  // 비디오 정보가 없는 경우 notFound 페이지로 이동
  if (isEmpty(content)) {
    notFound();
  }

  const subInfoUniqueId = nanoid();
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
  const upcoming = content.upcoming || [];
  const platformTitle = '보러가기';
  const platforms = fPlatformFilter(content.platform);
  const actorTitle = '출연진';
  const actors = content.actor || [];
  const actorFormatCode = fActorCode;
  const staffTitle = '제작진';
  const staffs = content.staff || [];
  const staffFormatCode = fStaffCode;
  const trailerUniqueId = nanoid();
  const trailerTitle = '관련 영상';
  const trailer = content.trailer || [];
  const galleryUniqueId = nanoid();
  const galleryTitle = '갤러리';
  const gallery = content.thumbnail || [];
  const galleryAlt = `${titleKr} 스틸컷`;

  // 플랫폼 보러가기
  const VideoPlatform = ({ platforms, upcoming }) => {
    if (isEmpty(platforms)) {
      return null;
    }

    // platforms.code 와 upcoming.code 가 같은 upcoming 데이터를 찾아서 platforms에 upcoming.release 추가
    const updatedPlatforms = platforms.map((platform) => {
      const upcomingPlatform = upcoming.find((upcoming) => upcoming.platform === platform.code);
      if (upcomingPlatform) {
        return {
          ...platform,
          release: upcomingPlatform.release,
        };
      }
      return platform;
    });

    return (
      <section className={styles.detail__platform__section}>
        <div className={styles.detail__main__title}>{platformTitle}</div>
        <ul className={styles.detail__platform__wrapper}>
          {updatedPlatforms.map((platform, index) => (
            <li
              className={`platform-item ${styles.detail__platform}`}
              aria-label={`${fPlatformNameByCode(platform.code)} 보러가기`}
              data-url={platform.url}
              key={index}
            >
              <div className={styles.platform__image__wrapper}>
                {platform.release && (
                  <div className={styles.platform__image__overlay}>
                    <span className={styles.platform__release__overlay}>{fYear(platform.release)}</span>
                    <span className={styles.platform__release__overlay}>{fReleaseDate(platform.release)}</span>
                  </div>
                )}
                <Image
                  className={styles.platform__image}
                  src={`${SETTINGS.CDN_BASE_URL}/assets/images/platform/${platform.code}.png`}
                  alt={fPlatformNameByCode(platform.code)}
                  width={60}
                  height={60}
                  loading="lazy"
                />
              </div>
              <div className={styles.platform__info}>
                <p className={styles.platform__name}>{fPlatformNameByCode(platform.code)}</p>
                {platform.release && <p className={styles.platform__release}>{platform.release}</p>}
              </div>
            </li>
          ))}
        </ul>
      </section>
    );
  };

  // 출연진/제작진 컴포넌트
  const VideoPeople = ({ people, title, formatCode }) => {
    if (isEmpty(people)) {
      return null;
    }

    const uniqueId = nanoid();

    return (
      <>
        <section className={styles.detail__people__section}>
          <div className={styles.detail__main__title}>{title}</div>
          <article className={styles.detail__people__wrapper} data-length={people.length}>
            <div className={`swiper ${styles.detail__people}`} data-swiper-id={uniqueId}>
              <div className="swiper-wrapper people-template">
                {people.map((person, index) => (
                  <div className="swiper-slide" key={index}>
                    <Link
                      href={EndpointManager.generateUrl(ENDPOINTS.PEOPLE, { peopleId: person.id })}
                      className={styles.detail__people__link}
                      aria-label={`${person.name} 작품 보러가기`}
                    >
                      <PeopleImage
                        image={fMakeImageUrl(person.picture, DEFAULT_IMAGES.noActor)}
                        size={60}
                        alt={person.name}
                      />
                      <div className={styles.detail__people__info__wrapper}>
                        <p className={styles.detail__people__name}>{person.name}</p>
                        <div className={styles.detail__people__role__wrapper}>
                          <span className={styles.detail__people__role}>{formatCode(person.code)}</span>
                          {person.role && (
                            <>
                              <span className={styles.detail__people__role}>|</span>
                              <span className={styles.detail__people__role}>{person.role}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            <button
              type="button"
              className={`swiper-prev-button ${styles.people__prev__button}`}
              data-swiper-id={uniqueId}
              disabled // 초기 비활성화
            >
              <ArrowLeftIcon width={28} height={28} />
            </button>
            <button
              type="button"
              className={`swiper-next-button ${styles.people__next__button}`}
              data-swiper-id={uniqueId}
            >
              <ArrowRightIcon width={28} height={28} />
            </button>
          </article>
        </section>

        {/* 출연진/제작진 swiper 제어: 클라이언트 컴포넌트 */}
        <VideoPeopleClient uniqueId={uniqueId} />
      </>
    );
  };

  return (
    <>
      <main className={styles.detail__main}>
        <section className={styles.detail__main__section}>
          {/* 배경 이미지 */}
          <picture className={styles.detail__background__wrapper}>
            <div className={styles.detail__background} style={{ backgroundImage: `url(${backgroundImageUrl})` }} />
          </picture>
          <div className={styles.detail__main__info__container}>
            <div className={styles.detail__main__info__wrapper}>
              <article className={styles.detail__title__container}>
                {/* 제목 */}
                <article className={styles.detail__title__wrapper}>
                  <p className={styles.detail__title__og}>{titleOg}</p>
                  <h2 className={styles.detail__title__kr}>{titleKr}</h2>
                </article>
                {/* 장르 */}
                <ul className={styles.detail__genre__wrapper}>
                  {!isEmpty(genres) &&
                    genres.map((genre, index) => (
                      <li key={index}>
                        <Link
                          href={EndpointManager.generateUrl(ENDPOINTS.GENRES, { genreId: genre.id })}
                          className={styles.detail__genre__link}
                          aria-label={`${genre.name} 장르 보러가기`}
                        >
                          {genre.name}
                        </Link>
                      </li>
                    ))}
                </ul>
              </article>
              {/* 비디오 관련 버튼 */}
              <article className={styles.detail__control__container}>
                <article className={styles.detail__control__wrapper}>
                  <VideoLikeButton videoId={videoId} />
                  {/* <CollectionButton /> */}
                  <ReviewButton />
                  <ShareButton title={titleKr} desc={synopsis} image={poster} />
                </article>
              </article>
            </div>
          </div>

          <div className={styles.detail__sub__info__container}>
            <div className={`swiper ${styles.detail__sub__info__wrapper}`} data-swiper-id={subInfoUniqueId}>
              <div className="swiper-wrapper">
                {/* 평점 */}
                <div
                  className={`swiper-slide sub-margin-right ${styles.detail__sub__info__item} ${styles.rating}`}
                  data-color={ratingColor}
                >
                  <p className={styles.detail__sub__title}>{ratingTitle}</p>
                  <div className={styles.detail__sub__content__wrapper}>
                    <p className={styles.detail__sub__content}>{ratingText}</p>
                  </div>
                </div>
                {/* 관람등급 */}
                <div
                  className={`swiper-slide sub-margin-right ${styles.detail__sub__info__item} ${styles.notice__age}`}
                >
                  <p className={styles.detail__sub__title}>{noticeAgeTitle}</p>
                  <div className={styles.detail__sub__content__wrapper}>
                    <p className={styles.detail__sub__content}>{noticeAge}</p>
                  </div>
                </div>
                {/* 개봉일자/관람일자 */}
                <div className={`swiper-slide sub-margin-right ${styles.detail__sub__info__item} ${styles.release}`}>
                  <p className={styles.detail__sub__title}>{releaseText}</p>
                  <div className={styles.detail__sub__content__wrapper}>
                    <p className={`${styles.detail__sub__content} ${styles.year}`}>{releaseYear}</p>
                    {releaseDate && <p className={`${styles.detail__sub__content} ${styles.date}`}>{releaseDate}</p>}
                  </div>
                </div>
                {/* 제작국가 */}
                <div
                  className={`swiper-slide sub-margin-right ${styles.detail__sub__info__item} ${styles.country}`}
                  data-index={countries.length}
                >
                  <p className={styles.detail__sub__title}>{countryTitle}</p>
                  <div className={styles.detail__sub__content__wrapper}>
                    {isEmpty(countries) ? (
                      <p className={styles.detail__sub__content}>-</p>
                    ) : (
                      countries.map((country, index) => (
                        <p key={index} className={styles.detail__sub__content} data-indx={index + 1}>
                          {country.name_ko}
                        </p>
                      ))
                    )}
                  </div>
                  {countries.length > 1 && <MoreIcon className={styles.detail__sub__button} />}
                </div>
                {/* 제작사 */}
                <div
                  className={`swiper-slide sub-margin-right ${styles.detail__sub__info__item} ${styles.production}`}
                  data-index={productions.length}
                >
                  <p className={styles.detail__sub__title}>{productionTitle}</p>
                  <div className={styles.detail__sub__content__wrapper}>
                    {isEmpty(productions) ? (
                      <p className={styles.detail__sub__content}>-</p>
                    ) : (
                      productions.map((production, index) => (
                        <Link
                          href={EndpointManager.generateUrl(ENDPOINTS.PRODUCTIONS, { productionId: production.id })}
                          className={styles.detail__sub__content}
                          aria-label={`${production.name} 제작사 보러가기`}
                          key={index}
                        >
                          {production.name}
                        </Link>
                      ))
                    )}
                  </div>
                  {productions.length > 1 && <MoreIcon className={styles.detail__sub__button} />}
                </div>
                {/* 상영시간/시리즈 */}
                <div className={`swiper-slide sub-margin-right ${styles.detail__sub__info__item} ${styles.runtime}`}>
                  <p className={styles.detail__sub__title}>{runtimeTitle}</p>
                  <div className={styles.detail__sub__content__wrapper}>
                    <p className={styles.detail__sub__content}>{runtime}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 비디오 subInfo swiper 제어: 클라이언트 컴포넌트 */}
            <VideoSubInfoClient uniqueId={subInfoUniqueId} />
          </div>
        </section>

        <div className={styles.detail__sub__wrapper}>
          <section className={styles.detail__sub__section}>
            {/* 작품 소개: 클라이언트 컴포넌트 */}
            <VideoSynopsis synopsis={synopsis} title={synopsisTitle} />

            {/* 포스터 */}
            {!isEmpty(poster) && (
              <section className={styles.detail__poster__section}>
                <picture className={styles.detail__poster__wrapper}>
                  <img className={styles.detail__poster} src={poster} srcSet={poster} alt={posterAlt} />
                </picture>
              </section>
            )}

            <div className={styles.detail__more__wrapper}>
              {/* 평가하기: 클라이언트 컴포넌트 */}
              <VideoMyRating videoId={videoId} title={myRatingTitle} />

              {/* 플랫폼 보러가기 */}
              <VideoPlatform platforms={platforms} upcoming={upcoming} />
            </div>
          </section>

          {/* 리뷰: 클라이언트 컴포넌트 */}
          <VideoReviewSimple videoId={videoId} />

          {/* 출연진/제작진 */}
          <VideoPeople people={actors} title={actorTitle} formatCode={actorFormatCode} />
          <VideoPeople people={staffs} title={staffTitle} formatCode={staffFormatCode} />

          {/* 트레일러 */}
          {!isEmpty(trailer) && (
            <>
              <section className={styles.detail__gallery__section}>
                <div className={styles.detail__main__title}>{trailerTitle}</div>
                <article className={styles.detail__gallery__wrapper}>
                  <div className={`swiper ${styles.detail__gallery}`} data-swiper-id={trailerUniqueId}>
                    <div className="swiper-wrapper">
                      {trailer.map((video, index) => (
                        <div
                          className={`swiper-slide gallery-margin-right ${styles.detail__gallery__item}`}
                          data-index={index}
                          key={index}
                        >
                          <picture className={styles.detail__photo__wrapper}>
                            <PlayIcon className={styles.detail__play__icon} width={36} height={36} />
                            <Image
                              className={styles.detail__photo}
                              src={video.thumbnail}
                              alt={`${titleKr} ${fTrailerCode(video.code)}`}
                              width={323}
                              height={181}
                              loading="lazy"
                            />
                          </picture>
                        </div>
                      ))}
                    </div>
                  </div>
                  <button
                    type="button"
                    className={`swiper-prev-button ${styles.gallery__prev__button}`}
                    data-swiper-id={trailerUniqueId}
                    disabled // 초기 비활성화
                  >
                    <ArrowLeftIcon width={28} height={28} />
                  </button>
                  <button
                    type="button"
                    className={`swiper-next-button ${styles.gallery__next__button}`}
                    data-swiper-id={trailerUniqueId}
                  >
                    <ArrowRightIcon width={28} height={28} />
                  </button>
                </article>
              </section>

              {/* 트레일러 swiper 제어: 클라이언트 컴포넌트  */}
              <VideoTrailerClient uniqueId={trailerUniqueId} trailer={trailer} alt={titleKr} />
            </>
          )}

          {/* 갤러리 */}
          {!isEmpty(gallery) && (
            <>
              <section className={styles.detail__gallery__section}>
                <div className={styles.detail__main__title}>{galleryTitle}</div>
                <article className={styles.detail__gallery__wrapper}>
                  <div className={`swiper ${styles.detail__gallery}`} data-swiper-id={galleryUniqueId}>
                    <div className="swiper-wrapper">
                      {gallery.map((image, index) => (
                        <div
                          className={`swiper-slide gallery-margin-right ${styles.detail__gallery__item}`}
                          data-index={index}
                          key={index}
                        >
                          <picture className={styles.detail__photo__wrapper}>
                            <Image
                              className={styles.detail__photo}
                              src={fMakeThumbnailUrl(image)}
                              alt={galleryAlt}
                              width={323}
                              height={181}
                              loading="lazy"
                            />
                          </picture>
                        </div>
                      ))}
                    </div>
                  </div>
                  <button
                    type="button"
                    className={`swiper-prev-button ${styles.gallery__prev__button}`}
                    data-swiper-id={galleryUniqueId}
                    disabled // 초기 비활성화
                  >
                    <ArrowLeftIcon width={28} height={28} />
                  </button>
                  <button
                    type="button"
                    className={`swiper-next-button ${styles.gallery__next__button}`}
                    data-swiper-id={galleryUniqueId}
                  >
                    <ArrowRightIcon width={28} height={28} />
                  </button>
                </article>
              </section>

              {/* 갤러리 swiper 제어: 클라이언트 컴포넌트  */}
              <VideoGalleryClient uniqueId={galleryUniqueId} gallery={gallery} alt={galleryAlt} />
            </>
          )}
        </div>
      </main>

      {/* 비디오 상세: 클라이언트 컴포넌트 */}
      <ContentsClient content={content} />
    </>
  );
};

export default Contents;
