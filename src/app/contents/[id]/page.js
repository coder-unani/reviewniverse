'use client';

import React, { Suspense, useEffect } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import SkeletonVideoDetail from '@/components/ui/Skeleton/VideoDetail';
import VideoLikeButton from '@/components/ui/Button/VideoLike';
import CollectionButton from '@/components/ui/Button/Collection';
import ReviewButton from '@/components/ui/Button/Review';
import ReviewModal from '@/components/ui/Modal/Review';
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

/**
 * TODO:
 * - 반응형 레이아웃
 * - 리뷰 무한 스크롤 (스와이퍼 삭제)
 * - 리뷰 자세히 보기 (리뷰 모달?)
 * - react modal 라이브러리 사용하기 (갤러리 등)
 * - react tooltip 라이브러리 사용하기 (ex.평점 취소하기)
 * - 줄거리 더보기 기능
 */

const PosterSection = React.lazy(
  () => import('@/components/ui/VideoSectionPoster')
);
const SynopsisSection = React.lazy(
  () => import('@/components/ui/VideoSectionSynopsis')
);
const MyRatingSection = React.lazy(
  () => import('@/components/ui/VideoSectionMyRating')
);
const PlatformSection = React.lazy(
  () => import('@/components/ui/VideoSectionPlatform')
);
const ActorSection = React.lazy(
  () => import('@/components/ui/VideoSectionActor')
);
const StaffSection = React.lazy(
  () => import('@/components/ui/VideoSectionStaff')
);
const GallerySection = React.lazy(
  () => import('@/components/ui/VideoSectionGallery')
);
const ReviewSection = React.lazy(
  () => import('@/components/ui/VideoSectionReview')
);

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
  const {
    videoId,
    content,
    contentIsLoading,
    contentError,
    myInfo,
    myInfoIsLoading,
    myInfoError,
  } = useVideoDetailContext();
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
      } else if (
        window.scrollY <= 100 &&
        !header.classList.contains('transparent')
      ) {
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
    return <SkeletonVideoDetail />;
  }

  if (!content || !content.data) return;

  return (
    <>
      <Suspense fallback={<SkeletonVideoDetail />}>
        <main className="detail-main-container">
          <section className="detail-main-section">
            <picture className="detail-background-wrapper">
              <div
                className="detail-background"
                style={{
                  backgroundImage: `url(${fBackgroundImage(content.data.thumbnail)})`,
                }}
              />
            </picture>

            <div className="detail-main-info-container">
              <div className="detail-main-info-wrapper">
                <article className="detail-title-container">
                  <article className="detail-title-wrapper">
                    <p className="detail-title-og">
                      {content.data.title_og || content.data.title}
                    </p>
                    <h2 className="detail-title-kr">{content.data.title}</h2>
                  </article>
                  <ul className="detail-genre-wrapper">
                    {content.data.genre.map((genre, index) => (
                      <li key={index}>
                        <Link
                          href={EndpointManager.generateUrl(ENDPOINTS.GENRE, {
                            genreId: genre.id,
                          })}
                          state={{ name: genre.name }}
                          className="detail-genre-link"
                        >
                          {genre.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </article>

                <article className="detail-control-container">
                  <article className="detail-control-wrapper">
                    <VideoLikeButton />
                    {/* <CollectionButton /> */}
                    <ReviewButton />
                  </article>
                </article>
              </div>
            </div>

            <div className="detail-sub-info-container">
              <Swiper
                className="detail-sub-info-wrapper"
                {...subInfoSwiperConfig}
              >
                <SwiperSlide
                  className="detail-sub-info-item rating"
                  data-color={fRatingColor(content.data.rating)}
                >
                  <p className="detail-sub-title">평점</p>
                  <div className="detail-sub-content-wrapper">
                    <p className="detail-sub-content">
                      {fRatingText(content.data.rating)}
                    </p>
                  </div>
                </SwiperSlide>

                <SwiperSlide className="detail-sub-info-item notice-age">
                  <p className="detail-sub-title">관람등급</p>
                  <div className="detail-sub-content-wrapper">
                    <p className="detail-sub-content">
                      {fUpperCase(content.data.notice_age)}
                    </p>
                  </div>
                </SwiperSlide>

                <SwiperSlide className="detail-sub-info-item release">
                  <p className="detail-sub-title">
                    {fReleaseText(content.data.code)}
                  </p>
                  <div className="detail-sub-content-wrapper">
                    <p className="detail-sub-content year">
                      {fYear(content.data.release)}
                    </p>
                    {fReleaseDate(content.data.release) && (
                      <p className="detail-sub-content date">
                        {fReleaseDate(content.data.release)}
                      </p>
                    )}
                  </div>
                </SwiperSlide>

                <SwiperSlide
                  className="detail-sub-info-item country"
                  data-index={
                    content.data.country ? content.data.country.length : 0
                  }
                >
                  <p className="detail-sub-title">제작국가</p>
                  <div className="detail-sub-content-wrapper">
                    {content.data.country ? (
                      content.data.country.map((country, index) => (
                        <p
                          className="detail-sub-content"
                          key={index}
                          data-indx={index + 1}
                        >
                          {country.name_ko}
                        </p>
                      ))
                    ) : (
                      <p className="detail-sub-content">-</p>
                    )}
                  </div>
                  {content.data.country && content.data.country.length > 1 && (
                    <MoreIcon className="detail-sub-button" />
                  )}
                </SwiperSlide>

                <SwiperSlide
                  className="detail-sub-info-item production"
                  data-index={
                    content.data.production ? content.data.production.length : 0
                  }
                >
                  <p className="detail-sub-title">제작사</p>
                  <div className="detail-sub-content-wrapper">
                    {content.data.production ? (
                      content.data.production.map((prodn, index) => (
                        <Link
                          href={EndpointManager.generateUrl(
                            ENDPOINTS.PRODUCTION,
                            { productionId: prodn.id }
                          )}
                          state={{ name: prodn.name }}
                          className="detail-sub-content"
                          key={index}
                        >
                          {prodn.name}
                        </Link>
                      ))
                    ) : (
                      <p className="detail-sub-content">-</p>
                    )}
                  </div>
                  {content.data.production &&
                    content.data.production.length > 1 && (
                      <MoreIcon className="detail-sub-button" />
                    )}
                </SwiperSlide>

                <SwiperSlide className="detail-sub-info-item runtime">
                  <p className="detail-sub-title">
                    {fRuntimeText(content.data.code)}
                  </p>
                  <div className="detail-sub-content-wrapper">
                    <p className="detail-sub-content">{content.data.runtime}</p>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </section>

          <div className="detail-main-wrapper">
            <section className="detail-sub-section">
              <SynopsisSection />
              <PosterSection />
              <div className="detail-more-wrapper">
                <MyRatingSection />
                <PlatformSection />
              </div>
            </section>
            <ActorSection />
            <StaffSection />
            <GallerySection />
            <ReviewSection />
          </div>
        </main>
      </Suspense>

      {isReviewModal && (
        <ReviewModal content={content.data} myReview={myInfo.review} />
      )}
    </>
  );
}
