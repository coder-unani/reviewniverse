import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import RatingReview from '@/components/ui/RatingReview';
import { EndpointManager, ENDPOINTS } from '@/config/endpoints';
import { fVideoCode, fThumbnail } from '@/utils/formatContent';
import defStyles from '@/styles/components/VideoItem.module.scss';

const VideoRatingItem = ({ video }) => {
  const path = EndpointManager.generateUrl(ENDPOINTS.VIDEO_DETAIL, {
    videoId: video.video.id,
  });

  return (
    <Link href={path} className={defStyles.default__video__item} aria-label={video.video.title}>
      <div className={defStyles.default__thumbnail__container}>
        <picture className={defStyles.default__thumbnail__wrapper}>
          <Image
            className={defStyles.default__thumbnail}
            src={fThumbnail(video.video.thumbnail)}
            alt="썸네일"
            fill
            placeholder="blur"
            blurDataURL={fThumbnail(video.video.thumbnail)}
          />
        </picture>
        <div className={defStyles.default__code__wrapper}>
          <div className={defStyles.default__code}>{fVideoCode(video.code)}</div>
        </div>
      </div>
      <div className={defStyles.default__info__container}>
        <p className={defStyles.default__title}>{video.video.title}</p>
        <div className={defStyles.default__subtitle__wrapper}>
          <div className={defStyles.default__subtitle}>
            <RatingReview rating={video.rating} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoRatingItem;
