'use client';

import React from 'react';
import Link from 'next/link';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { EndpointManager, ENDPOINTS } from '@/config/endpoints';
import { fYear } from '@/utils/format';
import { fVideoCode, fThumbnail } from '@/utils/formatContent';

import defStyles from '@/styles/components/Video.module.scss';

const VideoForLike = ({ video }) => {
  const path = EndpointManager.generateUrl(ENDPOINTS.CONTENTS, { videoId: video.video.id });
  const title = video.video.title;
  const thumbnail = fThumbnail(video.video.thumbnail);
  const code = fVideoCode(video.video.code);
  const release = fYear(video.video.release);

  return (
    <Link href={path} className={defStyles.default__video__item} aria-label={title}>
      <div className={defStyles.default__thumbnail__container}>
        <picture className={defStyles.default__thumbnail__wrapper}>
          <LazyLoadImage
            className={defStyles.default__thumbnail}
            src={thumbnail}
            srcSet={thumbnail}
            alt={title}
            effect="blur"
          />
        </picture>
        <div className={defStyles.default__code__wrapper}>
          <div className={defStyles.default__code}>{code}</div>
        </div>
      </div>
      <div className={defStyles.default__info__container}>
        <p className={defStyles.default__title}>{title}</p>
        <div className={defStyles.default__subtitle__wrapper}>
          <div className={defStyles.default__subtitle}>
            <span>{release}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoForLike;
