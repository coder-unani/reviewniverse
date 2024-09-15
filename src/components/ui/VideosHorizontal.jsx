import React from 'react';
import dynamic from 'next/dynamic';
import VideoItem from '@/components/ui/VideoItem';
import VideoRankItem from '@/components/ui/VideoRankItem';
import VideoUpComingItem from '@/components/ui/VideoUpComingItem';
import { nanoid } from 'nanoid';
import { isEmpty } from 'lodash';
import ArrowLeftIcon from '@/resources/icons/arrow-left.svg';
import ArrowRightIcon from '@/resources/icons/arrow-right.svg';
import styles from '@/styles/components/VideosHorizontal.module.scss';

const VideosHorizontalSwiper = dynamic(() => import('@/components/ui/Swiper/VideosHorizontal'), { ssr: false });

const VideosHorizontal = ({ children, videos, template = 'default' }) => {
  if (isEmpty(videos)) {
    return null;
  }

  // 서버에서 최소한의 슬라이드를 렌더링
  const uniqueId = nanoid();

  // 템플릿에 따른 비디오 아이템 렌더링
  const RenderVideoItems = ({ video, template, index }) => {
    switch (template) {
      case 'rank':
        // 랭킹 비디오 아이템 렌더링
        return <VideoRankItem video={video} index={index} />;
      case 'coming':
        // 커밍순 아이템 렌더링
        return <VideoUpComingItem video={video} index={index} />;
      default:
        // 기본 비디오 아이템 렌더링
        return <VideoItem video={video} index={index} />;
    }
  };

  return (
    <>
      <section className={styles.horizontal__videos__section}>
        {children}
        <div className={`${styles.horizontal__videos__wrapper} ${template}`}>
          <div className={`swiper ${styles.horizontal__videos}`} data-swiper-id={uniqueId}>
            <div className="swiper-wrapper">
              {videos.map((video, index) => (
                <div
                  className={`swiper-slide horizontal-margin-right ${styles.horizontal__video__item}`}
                  key={video.id}
                >
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
      <VideosHorizontalSwiper uniqueId={uniqueId} />
    </>
  );
};

export default VideosHorizontal;
