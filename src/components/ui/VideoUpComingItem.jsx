import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { EndpointManager, ENDPOINTS } from '@/config/endpoints';
import { fYear, fDate } from '@/utils/format';
import { fThumbnail, fCountry, fCountdown } from '@/utils/formatContent';

import styles from '@/styles/components/VideoUpComingItem.module.scss';
import defStyles from '@/styles/components/VideoItem.module.scss';

/**
 * TODO:
 * - 정적 이미지 생성
 */

const VideoUpComingItem = async ({ video }) => {
  const path = EndpointManager.generateUrl(ENDPOINTS.VIDEO_DETAIL, { videoId: video.id });
  const title = video.title;
  const thumbnail = fThumbnail(video.thumbnail);
  const code = video.code_string;
  const countdown = fCountdown(video.upcoming);
  const release = fDate(video.release);
  const country = fCountry(video.country);

  return (
    <Link href={path} className={defStyles.default__video__item} aria-label={title}>
      <div className={defStyles.default__thumbnail__container}>
        <picture className={defStyles.default__thumbnail__wrapper}>
          <Image
            className={defStyles.default__thumbnail}
            src={thumbnail}
            alt={title}
            width={254}
            height={382}
            quality={100}
            loading="lazy"
          />
        </picture>
        <div className={defStyles.default__code__wrapper}>
          <div className={defStyles.default__code}>{code}</div>
        </div>
        {countdown && (
          <div className={styles.coming__dday__wrapper}>
            <p className={styles.coming__dday}>D-{countdown}</p>
          </div>
        )}
      </div>
      <div className={defStyles.default__info__container}>
        <p className={defStyles.default__title}>{title}</p>
        <div className={defStyles.default__subtitle__wrapper}>
          <div className={defStyles.default__subtitle}>
            <span>{release}</span>
            {country && (
              <>
                <span>|</span>
                <span>{country}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoUpComingItem;
