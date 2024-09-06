import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { EndpointManager, ENDPOINTS } from '@/config/endpoints';
import { fYear } from '@/utils/format';
import {
  fThumbnail,
  fCountry,
  fRatingColor,
  fRatingText,
} from '@/utils/formatContent';
import styles from '@/styles/components/VideoItem.module.scss';

/**
 * TODO:
 * - 정적 이미지 생성
 */

const VideoItem = ({ video }) => {
  const path = EndpointManager.generateUrl(ENDPOINTS.VIDEO_DETAIL, {
    videoId: video.id,
  });

  return (
    <Link
      href={path}
      className={styles.default__video__item}
      aria-label={video.title}
    >
      <div className={styles.default__thumbnail__container}>
        <picture className={styles.default__thumbnail__wrapper}>
          <Image
            className={styles.default__thumbnail}
            src={fThumbnail(video.thumbnail)}
            alt="썸네일"
            sizes="(max-width: 768px) 100%, (max-width: 1200px) 100%"
            fill
            placeholder="blur"
            blurDataURL={fThumbnail(video.thumbnail)}
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
          <div
            className={styles.default__rating__wrapper}
            data-color={fRatingColor(video.rating)}
          >
            <div className={styles.default__rating__square}></div>
            <span className={styles.default__rating}>
              {fRatingText(video.rating)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoItem;
