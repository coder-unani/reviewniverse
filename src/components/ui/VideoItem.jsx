import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { EndpointManager, ENDPOINTS } from '@/config/endpoints';
import { fYear } from '@/utils/format';
import { fThumbnail, fCountry, fRatingColor, fRatingText } from '@/utils/formatContent';
// import { getImagePlaceholder } from '@/utils/getImagePlaceholder';
import styles from '@/styles/components/VideoItem.module.scss';

const VideoItem = async ({ video }) => {
  const path = EndpointManager.generateUrl(ENDPOINTS.VIDEO_DETAIL, { videoId: video.id });
  const title = video.title;
  const thumbnail = fThumbnail(video.thumbnail);
  // blurDataURL을 생성하는 함수
  // const base64 = await getImagePlaceholder(thumbnail);
  const code = video.code_string;
  const release = fYear(video.release);
  const country = fCountry(video.country);
  const ratingColor = fRatingColor(video.rating);
  const ratingText = fRatingText(video.rating);

  return (
    <Link href={path} className={styles.default__video__item} aria-label={title}>
      <div className={styles.default__thumbnail__container}>
        <picture className={styles.default__thumbnail__wrapper}>
          <Image
            className={styles.default__thumbnail}
            src={thumbnail}
            alt={title}
            width={254}
            height={382}
            quality={100}
            loading="lazy"
            // placeholder="blur"
            // blurDataURL={base64}
          />
        </picture>
        <div className={styles.default__code__wrapper}>
          <div className={styles.default__code}>{code}</div>
        </div>
      </div>
      <div className={styles.default__info__container}>
        <p className={styles.default__title}>{title}</p>
        <div className={styles.default__subtitle__wrapper}>
          <div className={styles.default__subtitle}>
            <span>{release}</span>
            {country && (
              <>
                <span>|</span>
                <span>{country}</span>
              </>
            )}
          </div>
          <div className={styles.default__rating__wrapper} data-color={ratingColor}>
            <div className={styles.default__rating__square}></div>
            <span className={styles.default__rating}>{ratingText}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoItem;
