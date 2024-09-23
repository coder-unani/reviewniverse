'use client';

import React from 'react';
import Link from 'next/link';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { EndpointManager, ENDPOINTS } from '@/config/endpoints';
import { fVideoCode, fThumbnail } from '@/utils/formatContent';
import RatingReview from '@/components/ui/RatingReview';

import defStyles from '@/styles/components/VideoItem.module.scss';

const VideoRatingItem = ({ video }) => {
  const path = EndpointManager.generateUrl(ENDPOINTS.CONTENTS, { videoId: video.video.id });
  const title = video.video.title;
  const thumbnail = fThumbnail(video.video.thumbnail);
  const code = fVideoCode(video.video.code);
  const rating = video.rating;

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
            <RatingReview rating={rating} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoRatingItem;
