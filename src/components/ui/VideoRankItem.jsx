import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { fYear } from '@/utils/format';
import { fThumbnail, fCountry, fRatingColor, fRatingText } from '@/utils/formatContent';
// import { getImagePlaceholder } from '@/utils/getImagePlaceholder';
import { SETTINGS } from '@/config/settings';
import { EndpointManager, ENDPOINTS } from '@/config/endpoints';
import styles from '@/styles/components/VideoRankItem.module.scss';
import defStyles from '@/styles/components/VideoItem.module.scss';

/**
 * TODO:
 * - 정적 이미지 생성
 */

const VideoRankItem = async ({ video, index }) => {
  const path = EndpointManager.generateUrl(ENDPOINTS.VIDEO_DETAIL, {
    videoId: video.id,
  });

  // blurDataURL을 생성하는 함수
  const thumbnail = fThumbnail(video.thumbnail);
  // const base64 = await getImagePlaceholder(thumbnail);

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
      />
    ));
  };

  return (
    <Link href={path} className={defStyles.default__video__item} aria-label={video.title}>
      <div className={defStyles.default__thumbnail__container}>
        <picture className={styles.rank__thumbnail__wrapper}>
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
        <div className={styles.rank__number__wrapper}>{fRankingNumber(index + 1)}</div>
      </div>
      <div className={styles.rank__info__container}>
        <p className={defStyles.default__title}>{video.title}</p>
        <div className={defStyles.default__subtitle__wrapper}>
          <div className={defStyles.default__subtitle}>
            <span>{fYear(video.release)}</span>
            {video.country && (
              <>
                <span>|</span>
                <span>{fCountry(video.country)}</span>
              </>
            )}
          </div>
          <div className={defStyles.default__rating__wrapper} data-color={fRatingColor(video.rating)}>
            <div className={defStyles.default__rating__square}></div>
            <span className={defStyles.default__rating}>{fRatingText(video.rating)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoRankItem;
