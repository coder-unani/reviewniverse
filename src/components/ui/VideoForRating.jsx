'use client';

import React from 'react';
import Link from 'next/link';

import { EndpointManager, ENDPOINTS } from '@/config/endpoints';
import { fVideoCode, fThumbnail } from '@/utils/formatContent';
import RatingScore from '@/components/ui/RatingScore';
import VideoImage from '@/components/ui/VideoImage';

import styles from '@/styles/components/Video.module.scss';

const VideoForRating = ({ video }) => {
  const { id, title, thumbnail, code } = video.video;
  const { rating } = video;
  const pathname = EndpointManager.generateUrl(ENDPOINTS.CONTENTS, { videoId: id });
  const videoThumbnail = fThumbnail(thumbnail);
  const videoCode = fVideoCode(code);

  return (
    <Link href={pathname} className={styles.default__video__item} aria-label={title}>
      <div className={styles.default__thumbnail__container}>
        <picture className={styles.default__thumbnail__wrapper}>
          <VideoImage thumbnail={videoThumbnail} title={title} />
        </picture>
        <div className={styles.default__code__wrapper}>
          <div className={styles.default__code}>{videoCode}</div>
        </div>
      </div>
      <div className={styles.default__info__container}>
        <p className={styles.default__title}>{title}</p>
        <div className={styles.default__subtitle__wrapper}>
          <div className={styles.default__subtitle}>
            <RatingScore rating={rating} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoForRating;
