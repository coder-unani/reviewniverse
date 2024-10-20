import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { isEmpty } from 'lodash';

import { EndpointManager, ENDPOINTS } from '@/config/endpoints';
import { fDate } from '@/utils/format';
import { fPlatformNameByCode, fThumbnail } from '@/utils/formatContent';

import styles from '@/styles/components/VideoForUpcoming.module.scss';
import defStyles from '@/styles/components/Video.module.scss';

const ClientVideoImage = dynamic(() => import('@/components/ui/VideoImage'), { ssr: false });

/**
 * TODO:
 * - 정적 이미지 생성
 */

const VideoForUpcoming = ({ video, isClient = false, referrer = null, referrerKey = null }) => {
  const pathname = EndpointManager.generateUrl(ENDPOINTS.CONTENTS, { videoId: video.id });
  const { title } = video;
  const thumbnail = fThumbnail(video.thumbnail);
  const code = video.code_string;
  let upcoming = {};
  if (isEmpty(video.upcoming)) {
    upcoming = {
      countdown: 0,
      platform: '',
      release: video.release,
      url: '',
    };
  } else {
    upcoming = { ...video.upcoming[0] };
  }
  const { countdown } = upcoming;
  const release = fDate(upcoming.release);
  const platform = fPlatformNameByCode(upcoming.platform) || '공개 예정';

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
          {isClient ? (
            <ClientVideoImage thumbnail={thumbnail} title={title} />
          ) : (
            <Image
              className={defStyles.default__thumbnail}
              src={thumbnail}
              alt={title}
              width={254}
              height={382}
              quality={100}
              loading="lazy"
            />
          )}
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
