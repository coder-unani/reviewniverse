import React from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { nanoid } from 'nanoid';
import { isEmpty } from 'lodash';

import { fTrailerCode } from '@/utils/formatContent';

import PlayIcon from '@/resources/icons/play.svg';
import ArrowLeftIcon from '@/resources/icons/arrow-left.svg';
import ArrowRightIcon from '@/resources/icons/arrow-right.svg';
import styles from '@/styles/pages/Contents.module.scss';

const VideoTrailerSwiper = dynamic(() => import('@/components/ui/Swiper/VideoTrailer'), { ssr: false });

// TODO: 썸네일 위에 재생 아이콘 추가

const VideoTrailer = React.memo(({ trailer, title, alt }) => {
  if (isEmpty(trailer)) {
    return null;
  }

  const uniqueId = nanoid();

  return (
    <>
      <section className={styles.detail__gallery__section}>
        <div className={styles.detail__main__title}>{title}</div>
        <article className={styles.detail__gallery__wrapper}>
          <div className={`swiper ${styles.detail__gallery}`} data-swiper-id={uniqueId}>
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
                      alt={`${alt} ${fTrailerCode(video.code)}`}
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
            data-swiper-id={uniqueId}
            disabled // 초기 비활성화
          >
            <ArrowLeftIcon width={28} height={28} />
          </button>
          <button
            type="button"
            className={`swiper-next-button ${styles.gallery__next__button}`}
            data-swiper-id={uniqueId}
          >
            <ArrowRightIcon width={28} height={28} />
          </button>
        </article>
      </section>

      <VideoTrailerSwiper uniqueId={uniqueId} trailer={trailer} alt={alt} />
    </>
  );
});

export default VideoTrailer;
