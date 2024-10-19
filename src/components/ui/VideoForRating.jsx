'use client';

import React from 'react';
import Link from 'next/link';

import { EndpointManager, ENDPOINTS } from '@/config/endpoints';
import { fVideoCode, fThumbnail } from '@/utils/formatContent';
import RatingScore from '@/components/ui/RatingScore';
import VideoImage from '@/components/ui/VideoImage';

import defStyles from '@/styles/components/Video.module.scss';

const VideoForRating = ({ video, referrer = null, referrerKey = null }) => {
  const { id, title, thumbnail, code } = video.video;
  const { rating } = video;
  const pathname = EndpointManager.generateUrl(ENDPOINTS.CONTENTS, { videoId: id });
  const videoThumbnail = fThumbnail(thumbnail);
  const videoCode = fVideoCode(code);

  return (
    <Link
      href={{
        pathname,
        query: {
          ...(referrer && { ref: referrer }),
          ...(referrerKey && { ref_key: referrerKey }),
        },
      }}
      className={defStyles.default__video__item}
      aria-label={title}
    >
      <div className={defStyles.default__thumbnail__container}>
        <picture className={defStyles.default__thumbnail__wrapper}>
          <VideoImage thumbnail={videoThumbnail} title={title} />
        </picture>
        <div className={defStyles.default__code__wrapper}>
          <div className={defStyles.default__code}>{videoCode}</div>
        </div>
      </div>
      <div className={defStyles.default__info__container}>
        <p className={defStyles.default__title}>{title}</p>
        <div className={defStyles.default__subtitle__wrapper}>
          <div className={defStyles.default__subtitle}>
            <RatingScore rating={rating} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoForRating;
