import React from 'react';
import dynamic from 'next/dynamic';
import { fDate } from '@/utils/format';
import { fPreviewThumbnail, fBackgroundImage, fReleaseText } from '@/utils/formatContent';
import { isEmpty } from 'lodash';
import { EndpointManager, ENDPOINTS } from '@/config/endpoints';
import vpStyles from '@/styles/components/VideosPreview.module.scss';

const VideosPreviewSwiper = dynamic(() => import('@/components/ui/Swiper/VideosPreview'), { ssr: false });

const VideosPreview = async ({ videos }) => {
  if (isEmpty(videos)) {
    return null;
  }

  return (
    <>
      {/* 프리뷰 배경 이미지 */}
      <div className={`swiper main-swiper ${vpStyles.preview__videos}`}>
        <div className="swiper-wrapper">
          {videos.map((video) => (
            <div className="swiper-slide" key={video.id}>
              <picture className={vpStyles.preview__background__wrapper}>
                <div
                  className={vpStyles.preview__background__image}
                  style={{ backgroundImage: `url(${fPreviewThumbnail(video.thumbnail)})` }}
                />
              </picture>

              <section className={vpStyles.preview__info__section}>
                <div className={vpStyles.preview__info__wrapper}>
                  <div className={vpStyles.preview__title__wrapper}>
                    <div>
                      <p className={vpStyles.preview__title__og} data-swiper-parallax="-150">
                        {video.title_og || video.title}
                      </p>
                      <h2 className={vpStyles.preview__title__kr} data-swiper-parallax="-250">
                        {video.title}
                      </h2>
                    </div>
                  </div>
                  <div className={vpStyles.preview__release__wrapper}>
                    <div className={vpStyles.preview__release} data-swiper-parallax="-200">
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
                  <a
                    href={EndpointManager.generateUrl(ENDPOINTS.VIDEO_DETAIL, {
                      videoId: video.id,
                    })}
                    className={vpStyles.preview__thumbnail__link}
                    aria-label={video.title}
                    data-index={index}
                  >
                    <picture className={vpStyles.preview__thumbnail__wrapper}>
                      <img
                        className={vpStyles.preview__thumbnail}
                        src={fBackgroundImage(video.thumbnail, true)}
                        alt={video.title}
                      />
                    </picture>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 클라이언트 컴포넌트에서 Swiper 제어 */}
      <VideosPreviewSwiper />
    </>
  );
};

export default VideosPreview;
