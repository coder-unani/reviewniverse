import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';

import { EndpointManager, ENDPOINTS } from '@/config/endpoints';
import { SETTINGS } from '@/config/settings';
import { fYear } from '@/utils/format';
import { fThumbnail, fCountry, fRatingColor, fRatingText } from '@/utils/formatContent';

import styles from '@/styles/components/VideoForRank.module.scss';
import defStyles from '@/styles/components/Video.module.scss';

const ClientVideoImage = dynamic(() => import('@/components/ui/VideoImage'), { ssr: false });

/**
 * TODO:
 * - 정적 이미지 생성
 */

const VideoForRank = ({ video, index, isClient = false }) => {
  const path = EndpointManager.generateUrl(ENDPOINTS.CONTENTS, { videoId: video.id });
  const title = video.title;
  const thumbnail = fThumbnail(video.thumbnail);
  const code = video.code_string;
  const release = fYear(video.release);
  const country = fCountry(video.country);
  const ratingColor = fRatingColor(video.rating);
  const ratingText = fRatingText(video.rating);

  // 랭킹 숫자 포맷
  const fRankingNumber = (number) => {
    // 숫자 한자리씩 잘라서 배열에 저장
    const numbers = number.toString().split('');
    // 배열 반복해서 number/{}.svg 이미지 추가해서 반환
    return numbers.map((num, index) => (
      <Image
        className={styles.rank__number}
        data-number={num}
        src={`${SETTINGS.CDN_BASE_URL}/assets/images/number/${num}.svg`}
        alt={num}
        width={74}
        height={74}
        quality={100}
        key={index}
        loading="lazy"
      />
    ));
  };

  return (
    <Link href={path} className={defStyles.default__video__item} aria-label={title}>
      <div className={defStyles.default__thumbnail__container}>
        <picture className={styles.rank__thumbnail__wrapper}>
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
        <div className={styles.rank__number__wrapper}>{fRankingNumber(index + 1)}</div>
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
          <div className={defStyles.default__rating__wrapper} data-color={ratingColor}>
            <div className={defStyles.default__rating__square}></div>
            <span className={defStyles.default__rating}>{ratingText}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoForRank;
