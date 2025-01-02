import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { EndpointManager, ENDPOINTS } from '@/config/endpoints';
import { fYear } from '@/utils/format';
import { fThumbnail, fCountry, fRatingColor, fRatingText } from '@/utils/formatContent';
import ClientVideoImage from '@/components/ui/VideoImage';

import StarIcon from '@/resources/icons/fill-star.svg';
import ReviewIcon from '@/resources/icons/fill-comment.svg';
import styles from '@/styles/components/Video.module.scss';

const Video = ({ video, isClient = false, isContent = false }) => {
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
        <picture className={styles.default__thumbnail__wrapper}>
          {/* isClient 플래그 값에 따라 서버/클라이언트 컴포넌트 이미지 렌더링 */}
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
      </div>
      <div className={styles.default__info__container}>
        <p className={styles.default__title}>{title}</p>
        <div className={styles.default__subtitle}>
          <span>{videoRelease}</span>
          {videoCountry && (
            <>
              <span>|</span>
              <span>{videoCountry}</span>
            </>
          )}
        </div>
        {/* isContent 플래그 값에 따라 평점 및 리뷰 표시 */}
        {!isContent && (
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
        )}
      </div>
    </Link>
  );
};

export default Video;
