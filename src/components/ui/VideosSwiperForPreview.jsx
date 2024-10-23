import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import { isEmpty } from 'lodash';

import { EndpointManager, ENDPOINTS } from '@/config/endpoints';
import { fDate } from '@/utils/format';
import { fPreviewThumbnail, fBackgroundImage, fReleaseText, fRatingColor, fRatingText } from '@/utils/formatContent';

import StarIcon from '@/resources/icons/fill-star.svg';
import vStyles from '@/styles/components/Video.module.scss';
import vpStyles from '@/styles/components/VideosSwiperForPreview.module.scss';

const PreviewSwiper = dynamic(() => import('@/components/ui/Client/VideosSwiperForPreview'), { ssr: false });

const VideosSwiperForPreview = async ({ videos, referrer = null, referrerKey = null }) => {
  if (isEmpty(videos)) return null;

  return (
    <>
      {/* 프리뷰 배경 이미지 */}
      <div className={`swiper main-swiper ${vpStyles.preview__videos}`}>
        <div className="swiper-wrapper">
          {videos.map((video) => (
            <div className="swiper-slide" key={video.id}>
              <picture className={vpStyles.preview__background__wrapper}>
                <div
                  className={`preview-background-image ${vpStyles.preview__background__image}`}
                  style={{ backgroundImage: `url(${fPreviewThumbnail(video.thumbnail)})` }}
                />
              </picture>
              <section className={vpStyles.preview__info__section}>
                <div className={vpStyles.preview__info__wrapper}>
                  <div className={vpStyles.preview__title__wrapper}>
                    <p className={vpStyles.preview__title__og} data-swiper-parallax="-150">
                      {video.title_og || video.title_en || video.title}
                    </p>
                    <div className={vpStyles.preview__title} data-swiper-parallax="-250">
                      <h2 className={vpStyles.preview__title__kr} data-small={video.title.length > 20}>
                        {video.title}
                      </h2>
                      {video.rating > 0 && (
                        <div className={vStyles.default__rating__wrapper} data-color={fRatingColor(video.rating)}>
                          <StarIcon className={vStyles.default__rating__icon} width={16} height={16} />
                          <span className={vStyles.default__rating}>{fRatingText(video.rating)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className={vpStyles.preview__release__wrapper}>
                    <div className={vpStyles.preview__release} data-swiper-parallax="-150">
                      <span>{fReleaseText(video.code)}</span>
                      <span>|</span>
                      <span>{fDate(video.release)}</span>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          ))}
        </div>
      </div>

      {/* 프리뷰 썸네일 이미지 */}
      <section className={vpStyles.preview__thumbnails__section}>
        <div className={vpStyles.preview__thumbnails__wrapper}>
          <div className={`swiper thumb-swiper ${vpStyles.preview__thumbnails}`}>
            <div className="swiper-wrapper">
              {videos.map((video, index) => (
                <div
                  className={`swiper-slide preview-margin-right ${vpStyles.preview__thumbnail__item}`}
                  key={video.id}
                >
                  <Link
                    href={{
                      pathname: EndpointManager.generateUrl(ENDPOINTS.CONTENTS, { videoId: video.id }),
                      query: {
                        ...(referrer && { ref: referrer }),
                        ...(referrerKey && { ref_key: referrerKey }),
                      },
                    }}
                    className={vpStyles.preview__thumbnail__link}
                    aria-label={video.title}
                    data-index={index}
                  >
                    <picture className={vpStyles.preview__thumbnail__wrapper}>
                      <Image
                        className={vpStyles.preview__thumbnail}
                        src={fBackgroundImage(video.thumbnail, true)}
                        alt={video.title}
                        width={254}
                        height={382}
                        quality={100}
                        loading="lazy"
                      />
                    </picture>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 클라이언트 컴포넌트에서 Swiper 제어 */}
      <Suspense fallback="">
        <PreviewSwiper />
      </Suspense>
    </>
  );
};

export default VideosSwiperForPreview;
