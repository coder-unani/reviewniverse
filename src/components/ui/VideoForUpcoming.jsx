import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { isEmpty } from 'lodash';

import { EndpointManager, ENDPOINTS } from '@/config/endpoints';
import { fYear, fDate } from '@/utils/format';
import { fPlatformNameByCode, fThumbnail } from '@/utils/formatContent';
import { cLog } from '@/utils/test';

import styles from '@/styles/components/VideoForUpcoming.module.scss';
import defStyles from '@/styles/components/Video.module.scss';

/**
 * TODO:
 * - 정적 이미지 생성
 */

const VideoForUpcoming = async ({ video }) => {
  const path = EndpointManager.generateUrl(ENDPOINTS.CONTENTS, { videoId: video.id });
  const title = video.title;
  const thumbnail = fThumbnail(video.thumbnail);
  const code = video.code_string;
  let upComing = {};
  if (isEmpty(video.upcoming)) {
    upComing = {
      platform: '',
      url: '',
      release: video.release,
      countdown: 0,
    };
  } else {
    upComing = video.upcoming[0];
  }
  const countdown = upComing.countdown;
  const release = fDate(upComing.release);
  const platform = fPlatformNameByCode(upComing.platform) || '공개 예정';

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
        <div className={styles.coming__dday__wrapper}>
          <p className={styles.coming__dday}>{countdown > 0 ? `D-${countdown}` : '오늘 공개'}</p>
        </div>
      </div>
      <div className={defStyles.default__info__container}>
        <p className={defStyles.default__title}>{title}</p>
        <div className={defStyles.default__subtitle__wrapper}>
          <div className={defStyles.default__subtitle}>
            <span>{release}</span>
            {platform && (
              <>
                <span>|</span>
                <span className={styles.coming__platform}>{platform}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoForUpcoming;
