import React from 'react';
import Link from 'next/link';
import { EndpointManager, ENDPOINTS } from '@/config/endpoints';
import { fYear } from '@/utils/format';
import { fThumbnail, fCountry, fRatingColor, fRatingText } from '@/utils/formatContent';
import styles from '@/styles/components/VideoItem.module.scss';

/**
 * TODO:
 * - 이미지 레이지 로딩 어떻게 할건지
 * - 레이지 로딩은 클라이언트 컴포넌트에서만 사용 가능
 */

const VideoItem = ({ video }) => {
  const path = EndpointManager.generateUrl(ENDPOINTS.VIDEO_DETAIL, {
    videoId: video.id,
  });

  return (
    <Link href={path} className={styles.default__video__item} aria-label={video.title}>
      <div className={styles.default__thumbnail__container}>
        <picture className={styles.default__thumbnail__wrapper}>
          <img
            className={styles.default__thumbnail}
            src={fThumbnail(video.thumbnail)}
            srcSet={fThumbnail(video.thumbnail)}
            alt="썸네일"
            loading="lazy"
          />
        </picture>
        <div className={styles.default__code__wrapper}>
          <div className={styles.default__code}>{video.code_string}</div>
        </div>
      </div>
      <div className={styles.default__info__container}>
        <p className={styles.default__title}>{video.title}</p>
        <div className={styles.default__subtitle__wrapper}>
          <div className={styles.default__subtitle}>
            <span>{fYear(video.release)}</span>
            {video.country && (
              <>
                <span>|</span>
                <span>{fCountry(video.country)}</span>
              </>
            )}
          </div>
          <div className={styles.default__rating__wrapper} data-color={fRatingColor(video.rating)}>
            <div className={styles.default__rating__square}></div>
            <span className={styles.default__rating}>{fRatingText(video.rating)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoItem;
