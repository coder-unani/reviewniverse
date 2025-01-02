import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { EndpointManager, ENDPOINTS } from '@/config/endpoints';
import { SETTINGS } from '@/config/settings';
import { fYear } from '@/utils/format';
import { fThumbnail, fCountry, fRatingColor, fRatingText } from '@/utils/formatContent';
import ClientVideoImage from '@/components/ui/VideoImage';

import StarIcon from '@/resources/icons/fill-star.svg';
import ReviewIcon from '@/resources/icons/fill-comment.svg';
import styles from '@/styles/components/Video.module.scss';
import rankStyles from '@/styles/components/VideoForRank.module.scss';

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
      className={rankStyles.rank__number}
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
  const pathname = EndpointManager.generateUrl(ENDPOINTS.CONTENTS, { videoId: id });
  const videoThumbnail = fThumbnail(thumbnail);
  const videoRelease = fYear(release);
  const videoCountry = fCountry(country);
  const ratingColor = fRatingColor(rating);
  const ratingText = fRatingText(rating);

  return (
    <Link href={pathname} className={styles.default__video__item} aria-label={title}>
      <div className={styles.default__thumbnail__container}>
        <picture className={rankStyles.rank__thumbnail__wrapper}>
          {isClient ? (
            <ClientVideoImage thumbnail={videoThumbnail} title={title} />
          ) : (
            <Image
              className={styles.default__thumbnail}
              src={videoThumbnail}
              alt={title}
              width={254}
              height={382}
              quality={100}
              loading="lazy"
            />
          )}
        </picture>
        <div className={styles.default__code__wrapper}>
          <div className={styles.default__code}>{code}</div>
        </div>
        <div className={rankStyles.rank__number__wrapper}>
          <RankingNumber number={index + 1} />
        </div>
      </div>
      <div className={styles.default__info__container}>
        <p className={styles.default__title}>{title}</p>
        {/* <div className={styles.default__subtitle__wrapper}> */}
        <div className={styles.default__subtitle}>
          <span>{videoRelease}</span>
          {videoCountry && (
            <>
              <span>|</span>
              <span>{videoCountry}</span>
            </>
          )}
        </div>
        {/* </div> */}
        <div className={styles.default__more__wrapper}>
          <div className={styles.default__rating__wrapper} data-color={ratingColor}>
            <StarIcon className={styles.default__rating__icon} width={16} height={16} />
            <span className={styles.default__rating}>{ratingText}</span>
          </div>
          {reviewCount > 0 && (
            <div className={styles.default__review__wrapper}>
              <ReviewIcon className={styles.default__review__icon} width={14} height={14} />
              <span className={styles.default__review}>{reviewCount}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default VideoForRank;
