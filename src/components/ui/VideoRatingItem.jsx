import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import RatingReview from '@/components/ui/RatingReview';
import { EndpointManager, ENDPOINTS } from '@/config/endpoints';
import { fVideoCode, fThumbnail } from '@/utils/formatContent';

const VideoRatingItem = ({ video }) => {
  const path = EndpointManager.generateUrl(ENDPOINTS.VIDEO_DETAIL, {
    videoId: video.video.id,
  });

  return (
    <Link
      href={path}
      className="default-video-item"
      aria-label={video.video.title}
    >
      <div className="default-thumbnail-container">
        <picture className="default-thumbnail-wrapper">
          <Image
            className="default-thumbnail"
            src={fThumbnail(video.video.thumbnail)}
            alt="썸네일"
            fill
            placeholder="blur"
            // effect="blur"
          />
        </picture>
        <div className="default-code-wrapper">
          <div className="default-code">{fVideoCode(video.code)}</div>
        </div>
      </div>
      <div className="default-info-container">
        <p className="default-title">{video.video.title}</p>
        <div className="default-subtitle-wrapper">
          <div className="default-subtitle">
            <RatingReview rating={video.rating} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoRatingItem;
