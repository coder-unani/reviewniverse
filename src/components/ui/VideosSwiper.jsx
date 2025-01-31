import React from 'react';
import { nanoid } from 'nanoid';
import { isEmpty } from 'lodash';

import Video from '@/components/ui/Video';
import VideoForRank from '@/components/ui/VideoForRank';
import VideoForUpcoming from '@/components/ui/VideoForUpcoming';
import VideosSwiperClient from '@/components/ui/Client/VideosSwiper';

import ArrowLeftIcon from '@/resources/icons/arrow-left.svg';
import ArrowRightIcon from '@/resources/icons/arrow-right.svg';
import styles from '@/styles/components/VideosSwiper.module.scss';

// 템플릿에 따른 비디오 아이템 렌더링
const RenderVideoItems = ({ video, template, index }) => {
  switch (template) {
    case 'rank':
      // 랭킹 비디오 아이템 렌더링
      return <VideoForRank video={video} index={index} />;
    case 'upcoming':
      // 커밍순 아이템 렌더링
      return <VideoForUpcoming video={video} />;
    case 'default':
      // 기본 비디오 아이템 렌더링
      return <Video video={video} />;
    default:
      // 기본 비디오 아이템 렌더링
      return <Video video={video} />;
  }
};

const VideosSwiper = ({ children, videos, template = 'default' }) => {
  if (isEmpty(videos)) return null;

  // 고유 아이디 생성
  const uniqueId = nanoid();

  return (
    <>
      <section className={styles.horizontal__videos__section}>
        {children}
        <div className={`${styles.horizontal__videos__wrapper} ${styles[template]}`}>
          <div className={`swiper ${styles.horizontal__videos}`} data-swiper-id={uniqueId}>
            <div className="swiper-wrapper">
              {videos.map((video, index) => (
                <div className="swiper-slide horizontal-template" key={video.id}>
                  <RenderVideoItems video={video} template={template} index={index} />
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
      <VideosSwiperClient uniqueId={uniqueId} />
    </>
  );
};

export default VideosSwiper;
