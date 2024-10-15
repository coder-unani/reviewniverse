import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';

import { EndpointManager, ENDPOINTS } from '@/config/endpoints';
import { SETTINGS } from '@/config/settings';
import { fYear } from '@/utils/format';
import { fThumbnail, fCountry, fRatingColor, fRatingText } from '@/utils/formatContent';

import StarIcon from '@/resources/icons/fill-star.svg';
import ReviewIcon from '@/resources/icons/fill-comment.svg';
import styles from '@/styles/components/VideoForRank.module.scss';
import defStyles from '@/styles/components/Video.module.scss';

const ClientVideoImage = dynamic(() => import('@/components/ui/VideoImage'), { ssr: false });

/**
 * TODO:
 * - 정적 이미지 생성
 */

// 랭킹 숫자 포맷
const RankingNumber = ({ number }) => {
  // 숫자 한자리씩 잘라서 배열에 저장
  const numbers = number.toString().split('');
  // 배열 반복해서 number/{}.svg 이미지 추가해서 반환
  return numbers.map((num, i) => (
    <Image
      className={styles.rank__number}
      data-number={num}
      src={`${SETTINGS.CDN_BASE_URL}/assets/images/number/${num}.svg`}
      alt={num}
      width={74}
      height={74}
      quality={100}
      key={i}
      loading="lazy"
    />
  ));
};

const VideoForRank = ({ video, index, isClient = false }) => {
  const { id, title, release, thumbnail, code_string: code, country, rating, review_count: reviewCount } = video;
  const path = EndpointManager.generateUrl(ENDPOINTS.CONTENTS, { videoId: id });
  const videoThumbnail = fThumbnail(thumbnail);
  const videoRelease = fYear(release);
  const videoCountry = fCountry(country);
  const ratingColor = fRatingColor(rating);
  const ratingText = fRatingText(rating);

  return (
    <Link href={path} className={defStyles.default__video__item} aria-label={title}>
      <div className={defStyles.default__thumbnail__container}>
        <picture className={styles.rank__thumbnail__wrapper}>
          {isClient ? (
            <ClientVideoImage thumbnail={videoThumbnail} title={title} />
          ) : (
            <Image
              className={defStyles.default__thumbnail}
              src={videoThumbnail}
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
        <div className={styles.rank__number__wrapper}>
          <RankingNumber number={index + 1} />
        </div>
      </div>
      <div className={defStyles.default__info__container}>
        <p className={defStyles.default__title}>{title}</p>
        {/* <div className={defStyles.default__subtitle__wrapper}> */}
        <div className={defStyles.default__subtitle}>
          <span>{videoRelease}</span>
          {videoCountry && (
            <>
              <span>|</span>
              <span>{videoCountry}</span>
            </>
          )}
        </div>
        {/* </div> */}
        <div className={defStyles.default__more__wrapper}>
          <div className={defStyles.default__rating__wrapper} data-color={ratingColor}>
            <StarIcon className={defStyles.default__rating__icon} width={16} height={16} />
            <span className={defStyles.default__rating}>{ratingText}</span>
          </div>
          {reviewCount > 0 && (
            <div className={defStyles.default__review__wrapper}>
              <ReviewIcon className={defStyles.default__review__icon} width={14} height={14} />
              <span className={defStyles.default__review}>{reviewCount}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default VideoForRank;
