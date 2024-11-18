import React from 'react';
import { nanoid } from 'nanoid';
import { isEmpty } from 'lodash';

import Video from '@/components/ui/Video';
import VideosSwiperForContentClient from '@/components/ui/Client/VideosSwiperForContent';

import ArrowLeftIcon from '@/resources/icons/arrow-left.svg';
import ArrowRightIcon from '@/resources/icons/arrow-right.svg';
import styles from '@/styles/components/VideosSwiper.module.scss';
import contentStyles from '@/styles/pages/Contents.module.scss';

const VideosSwiperForContent = ({ children, videos, template = 'default', referrer = null, referrerKey = null }) => {
  if (isEmpty(videos)) return null;

  // 고유 아이디 생성
  const uniqueId = nanoid();

  return (
    <>
      <section className={contentStyles.detail__videos__section}>
        {children}
        <div className={`${styles.horizontal__videos__wrapper} ${styles[template]}`}>
          <div className={`swiper ${styles.horizontal__videos}`} data-swiper-id={uniqueId}>
            <div className="swiper-wrapper">
              {videos.map((video) => (
                <div className="swiper-slide horizontal-template--small" key={video.id}>
                  <Video video={video} isContent referrer={referrer} referrerKey={referrerKey} />
                </div>
              ))}
            </div>
          </div>
          <button
            type="button"
            className={`swiper-prev-button ${styles.horizontal__prev__button}`}
            data-swiper-id={uniqueId}
            disabled // 초기 비활성화
          >
            <ArrowLeftIcon width={28} height={28} />
          </button>
          <button
            type="button"
            className={`swiper-next-button ${styles.horizontal__next__button}`}
            data-swiper-id={uniqueId}
          >
            <ArrowRightIcon width={28} height={28} />
          </button>
        </div>
      </section>

      {/* 클라이언트 컴포넌트에서 Swiper 제어 */}
      <VideosSwiperForContentClient uniqueId={uniqueId} />
    </>
  );
};

export default VideosSwiperForContent;
