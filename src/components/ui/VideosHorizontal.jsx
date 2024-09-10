import React from 'react';
import dynamic from 'next/dynamic';
import VideoItem from '@/components/ui/VideoItem';
import VideoRankItem from '@/components/ui/VideoRankItem';
import VideoComingItem from '@/components/ui/VideoComingItem';
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

  const uniqueId = nanoid();

  // 기본 비디오 아이템 렌더링
  const DefaultItems = ({ videos }) => {
    return videos.map((video, index) => (
      <div className={`swiper-slide horizontal-margin-right ${styles.horizontal__video__item}`} key={video.id}>
        <VideoItem video={video} index={index} />
      </div>
    ));
  };

  // 랭킹 비디오 아이템 렌더링
  const RankItems = ({ videos }) => {
    return videos.map((video, index) => (
      <div className={`swiper-slide horizontal-margin-right ${styles.horizontal__video__item}`} key={video.id}>
        <VideoRankItem video={video} index={index} />
      </div>
    ));
  };

  // 커밍순 아이템 렌더링
  const ComingItems = ({ videos }) => {
    return videos.map((video, index) => (
      <div className={`swiper-slide horizontal-margin-right ${styles.horizontal__video__item}`} key={video.id}>
        <VideoComingItem video={video} index={index} />
      </div>
    ));
  };

  // 템플릿에 따른 비디오 아이템 렌더링
  const SwitchTemplate = ({ videos, template }) => {
    switch (template) {
      case 'default':
        return <DefaultItems videos={videos} />;
      case 'rank':
        return <RankItems videos={videos} />;
      case 'coming':
        return <ComingItems videos={videos} />;
      default:
        return <DefaultItems videos={videos} />;
    }
  };

  return (
    <>
      <section className={styles.horizontal__videos__section}>
        {children}
        <div className={`${styles.horizontal__videos__wrapper} ${template}`}>
          <div className={`swiper ${styles.horizontal__videos}`} data-swiper-id={uniqueId}>
            <div className="swiper-wrapper">
              <SwitchTemplate videos={videos} template={template} />
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
