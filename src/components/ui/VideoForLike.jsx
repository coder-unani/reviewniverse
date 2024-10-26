'use client';

import React from 'react';
import Link from 'next/link';

import { EndpointManager, ENDPOINTS } from '@/config/endpoints';
import { fYear } from '@/utils/format';
import { fVideoCode, fThumbnail } from '@/utils/formatContent';
import VideoImage from '@/components/ui/VideoImage';

import styles from '@/styles/components/Video.module.scss';

const VideoForLike = ({ video, referrer = null, referrerKey = null }) => {
  const { id, title, thumbnail, code, release } = video.video;
  const pathname = EndpointManager.generateUrl(ENDPOINTS.CONTENTS, { videoId: id });
  const videoThumbnail = fThumbnail(thumbnail);
  const videoCode = fVideoCode(code);
  const videoRelease = fYear(release);

  return (
    <Link
      href={{
        pathname,
        query: {
          ...(referrer && { ref: referrer }),
          ...(referrerKey && { ref_key: referrerKey }),
        },
      }}
      className={styles.default__video__item}
      aria-label={title}
    >
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
            <span>{videoRelease}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoForLike;
