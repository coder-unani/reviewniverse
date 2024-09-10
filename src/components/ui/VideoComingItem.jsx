import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { EndpointManager, ENDPOINTS } from '@/config/endpoints';
import { fYear, fDate } from '@/utils/format';
import { fThumbnail, fCountry } from '@/utils/formatContent';
// import { getImagePlaceholder } from '@/utils/getImagePlaceholder';
import styles from '@/styles/components/VideoComingItem.module.scss';
import defStyles from '@/styles/components/VideoItem.module.scss';

/**
 * TODO:
 * - 정적 이미지 생성
 */

const VideoComingItem = async ({ video }) => {
  const path = EndpointManager.generateUrl(ENDPOINTS.VIDEO_DETAIL, {
    videoId: video.id,
  });

  // blurDataURL을 생성하는 함수
  const thumbnail = fThumbnail(video.thumbnail);
  // const base64 = await getImagePlaceholder(thumbnail);

  return (
    <Link href={path} className={defStyles.default__video__item} aria-label={video.title}>
      <div className={defStyles.default__thumbnail__container}>
        <picture className={defStyles.default__thumbnail__wrapper}>
          <Image
            className={defStyles.default__thumbnail}
            src={thumbnail}
            alt={video.title}
            width={254}
            height={382}
            quality={100}
            // placeholder="blur"
            // blurDataURL={base64}
          />
        </picture>
        <div className={defStyles.default__code__wrapper}>
          <div className={defStyles.default__code}>{video.code_string}</div>
        </div>
        <div className={styles.coming__dday__wrapper}>
          <p className={styles.coming__dday}>D-{video.d_day}</p>
        </div>
      </div>
      <div className={defStyles.default__info__container}>
        <p className={defStyles.default__title}>{video.title}</p>
        <div className={defStyles.default__subtitle__wrapper}>
          <div className={defStyles.default__subtitle}>
            <span>{fDate(video.release)}</span>
            {video.country && (
              <>
                <span>|</span>
                <span>{fCountry(video.country)}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoComingItem;
