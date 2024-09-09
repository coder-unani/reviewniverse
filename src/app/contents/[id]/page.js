'use client';

import React, { Suspense, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Swiper, SwiperSlide } from 'swiper/react';
import SkeletonContents from '@/components/ui/Skeleton/Contents';
import VideoLikeButton from '@/components/ui/Button/VideoLike';
import CollectionButton from '@/components/ui/Button/Collection';
import ReviewButton from '@/components/ui/Button/Review';
import VideoSectionSynopsis from '@/components/ui/VideoSectionSynopsis';
import VideoSectionPoster from '@/components/ui/VideoSectionPoster';
import VideoSectionPlatform from '@/components/ui/VideoSectionPlatform';
import VideoSectionCast from '@/components/ui/VideoSectionCast';
import VideoSectionGallery from '@/components/ui/VideoSectionGallery';
import { useModalContext } from '@/contexts/ModalContext';
import { useVideoDetailContext } from '@/contexts/VideoDetailContext';
import { SETTINGS } from '@/config/settings';
import { SITE_KEYWORDS } from '@/config/constants';
import { EndpointManager, ENDPOINTS } from '@/config/endpoints';
import { fYear, fUpperCase } from '@/utils/format';
import {
  fBackgroundImage,
  fThumbnail,
  fReleaseText,
  fReleaseDate,
  fRatingColor,
  fRatingText,
  fRuntimeText,
} from '@/utils/formatContent';
import { isEmpty } from 'lodash';
import MoreIcon from '@/resources/icons/more.svg';
import styles from '@/styles/pages/Contents.module.scss';

const VideoSectionMyRating = dynamic(() => import('@/components/ui/VideoSectionMyRating'), { ssr: false });
const VideoSectionReview = dynamic(() => import('@/components/ui/VideoSectionReview'), { ssr: false });
const ReviewModal = dynamic(() => import('@/components/ui/Modal/Review'), { ssr: false });

/**
 * TODO:
 * - 반응형 레이아웃
 * - 리뷰 무한 스크롤 (스와이퍼 삭제)
 * - 리뷰 자세히 보기 (리뷰 모달?)
 * - react modal 라이브러리 사용하기 (갤러리 등)
 * - react tooltip 라이브러리 사용하기 (ex.평점 취소하기)
 * - 줄거리 더보기 기능
 */

/*
// 메타 태그 설정
// TODO: 트위터, 페이스북, 카카오, 네이버 메타태그 설정
// TODO: og태그 이미지 사이즈 고려
export const metadata = ({ params }) => {
  const title = `${content.data.title} (${fYear(content.data.release)}) - 리뷰니버스`;
  const description = isEmpty(content.data.synopsis)
    ? ''
    : content.data.synopsis;
  const imageUrl = fThumbnail(content.data.thumbnail);
  const path = EndpointManager.generateUrl(ENDPOINTS.VIDEO_DETAIL, {
    videoId: videoId,
  });
  const url = `${SETTINGS.DOMAIN_URL}${path}`;
  const keywords = isEmpty(content.data.tag)
    ? ''
    : `${SITE_KEYWORDS}, ${content.data.tag}`;

  return {
    title,
    description,
    keywords,
    openGraph: {
      url,
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 600,
          alt: title,
        },
      ],
    },
  };
};
*/

export default function page({ params }) {
  const { isReviewModal } = useModalContext();
  const { videoId, content, contentIsLoading, contentError, myInfo, myInfoIsLoading, myInfoError } =
    useVideoDetailContext();
  const subInfoSwiperConfig = {
    spaceBetween: 10,
    slidesPerView: 'auto',
    slidesPerGroup: 2,
    speed: 1000,
    allowTouchMove: true,
    breakpoints: {
      769: {
        spaceBetween: 12,
      },
    },
  };

  // 헤더 스타일 변경
  useEffect(() => {
    const header = document.querySelector('header');
    const handleScroll = () => {
      if (window.scrollY > 100 && header.classList.contains('transparent')) {
        header.classList.remove('transparent');
      } else if (window.scrollY <= 100 && !header.classList.contains('transparent')) {
        header.classList.add('transparent');
      }
    };
    window.addEventListener('scroll', handleScroll);
    header.classList.add('transparent');
    return () => {
      window.removeEventListener('scroll', handleScroll);
      header.classList.remove('transparent');
    };
  }, []);

  // 스켈레톤 UI 로딩
  if (contentIsLoading || myInfoIsLoading) {
    return <SkeletonContents />;
  }

  if (!content || !content.data) return;

  return (
    <>
      <Suspense fallback={<SkeletonContents />}>
        <main className={styles.detail__main}>
          <section className={styles.detail__main__section}>
            <picture className={styles.detail__background__wrapper}>
              <div
                className={styles.detail__background}
                style={{
                  backgroundImage: `url(${fBackgroundImage(content.data.thumbnail)})`,
                }}
              />
            </picture>

            <div className={styles.detail__main__info__container}>
              <div className={styles.detail__main__info__wrapper}>
                <article className={styles.detail__title__container}>
                  <article className={styles.detail__title__wrapper}>
                    <p className={styles.detail__title__og}>{content.data.title_og || content.data.title}</p>
                    <h2 className={styles.detail__title__kr}>{content.data.title}</h2>
                  </article>
                  <ul className={styles.detail__genre__wrapper}>
                    {content.data.genre.map((genre, index) => (
                      <li key={index}>
                        <Link
                          href={EndpointManager.generateUrl(ENDPOINTS.GENRE, {
                            genreId: genre.id,
                          })}
                          state={{ name: genre.name }}
                          className={styles.detail__genre__link}
                        >
                          {genre.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </article>

                <article className={styles.detail__control__container}>
                  <article className={styles.detail__control__wrapper}>
                    <VideoLikeButton videoId={videoId} myInfo={myInfo} />
                    {/* <CollectionButton /> */}
                    <ReviewButton />
                  </article>
                </article>
              </div>
            </div>

            <div className={styles.detail__sub__info__container}>
              <Swiper className={styles.detail__sub__info__wrapper} {...subInfoSwiperConfig}>
                <SwiperSlide
                  className={`${styles.detail__sub__info__item} ${styles.rating}`}
                  data-color={fRatingColor(content.data.rating)}
                >
                  <p className={styles.detail__sub__title}>평점</p>
                  <div className={styles.detail__sub__content__wrapper}>
                    <p className={styles.detail__sub__content}>{fRatingText(content.data.rating)}</p>
                  </div>
                </SwiperSlide>

                <SwiperSlide className={`${styles.detail__sub__info__item} ${styles.notice__age}`}>
                  <p className={styles.detail__sub__title}>관람등급</p>
                  <div className={styles.detail__sub__content__wrapper}>
                    <p className={styles.detail__sub__content}>{fUpperCase(content.data.notice_age)}</p>
                  </div>
                </SwiperSlide>

                <SwiperSlide className={`${styles.detail__sub__info__item} ${styles.release}`}>
                  <p className={styles.detail__sub__title}>{fReleaseText(content.data.code)}</p>
                  <div className={styles.detail__sub__content__wrapper}>
                    <p className={`${styles.detail__sub__content} ${styles.year}`}>{fYear(content.data.release)}</p>
                    {fReleaseDate(content.data.release) && (
                      <p className={`${styles.detail__sub__content} ${styles.date}`}>
                        {fReleaseDate(content.data.release)}
                      </p>
                    )}
                  </div>
                </SwiperSlide>

                <SwiperSlide
                  className={`${styles.detail__sub__info__item} ${styles.country}`}
                  data-index={content.data.country ? content.data.country.length : 0}
                >
                  <p className={styles.detail__sub__title}>제작국가</p>
                  <div className={styles.detail__sub__content__wrapper}>
                    {content.data.country ? (
                      content.data.country.map((country, index) => (
                        <p className={styles.detail__sub__content} key={index} data-indx={index + 1}>
                          {country.name_ko}
                        </p>
                      ))
                    ) : (
                      <p className={styles.detail__sub__content}>-</p>
                    )}
                  </div>
                  {content.data.country && content.data.country.length > 1 && (
                    <MoreIcon className={styles.detail__sub__button} />
                  )}
                </SwiperSlide>

                <SwiperSlide
                  className={`${styles.detail__sub__info__item} ${styles.production}`}
                  data-index={content.data.production ? content.data.production.length : 0}
                >
                  <p className={styles.detail__sub__title}>제작사</p>
                  <div className={styles.detail__sub__content__wrapper}>
                    {content.data.production ? (
                      content.data.production.map((prodn, index) => (
                        <Link
                          href={EndpointManager.generateUrl(ENDPOINTS.PRODUCTION, { productionId: prodn.id })}
                          state={{ name: prodn.name }}
                          className={styles.detail__sub__content}
                          key={index}
                        >
                          {prodn.name}
                        </Link>
                      ))
                    ) : (
                      <p className={styles.detail__sub__content}>-</p>
                    )}
                  </div>
                  {content.data.production && content.data.production.length > 1 && (
                    <MoreIcon className={styles.detail__sub__button} />
                  )}
                </SwiperSlide>

                <SwiperSlide className={`${styles.detail__sub__info__item} ${styles.runtime}`}>
                  <p className={styles.detail__sub__title}>{fRuntimeText(content.data.code)}</p>
                  <div className={styles.detail__sub__content__wrapper}>
                    <p className={styles.detail__sub__content}>{content.data.runtime}</p>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </section>

          <div className={styles.detail__sub__wrapper}>
            <section className={styles.detail__sub__section}>
              <VideoSectionSynopsis content={content} />
              <VideoSectionPoster content={content} />
              <div className={styles.detail__more__wrapper}>
                <VideoSectionMyRating videoId={videoId} myInfo={myInfo} />
                <VideoSectionPlatform content={content} />
              </div>
            </section>
            <VideoSectionCast content={content} target="actor" />
            <VideoSectionCast content={content} target="staff" />
            <VideoSectionGallery content={content} />
            <VideoSectionReview videoId={videoId} myInfo={myInfo} />
          </div>
        </main>
      </Suspense>

      {isReviewModal && <ReviewModal content={content.data} myReview={myInfo.review} />}
    </>
  );
}
