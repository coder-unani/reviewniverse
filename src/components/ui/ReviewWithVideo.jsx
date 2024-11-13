'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { EndpointManager, ENDPOINTS } from '@/config/endpoints';
import { fYear, fDiffDate } from '@/utils/format';
import { fVideoCode, fThumbnail } from '@/utils/formatContent';
import ProfileImage from '@/components/ui/Button/Profile/Image';
import RatingScore from '@/components/ui/RatingScore';
import ReviewLikeButton from '@/components/ui/Button/ReviewLike';

// import FillMoreIcon from '@/resources/icons/fill-more.svg';
import styles from '@/styles/components/Review.module.scss';

/**
 * TODO:
 * 1. 리뷰 스포일러 기능
 * 2. 리뷰 클릭시 리뷰 모달 열기
 */

const ReviewWithVideo = ({ user, review, isDate = true, isShort = false, referrer = null, referrerKey = null }) => {
  const [data, setData] = useState(review);
  const [isSpoiler, setIsSpoiler] = useState(review.is_spoiler);
  // TODO: data.video.id로 videoId를 받아오는 방법 찾기
  const videoPath = EndpointManager.generateUrl(ENDPOINTS.CONTENTS, { videoId: review.video.id });
  const userPath = EndpointManager.generateUrl(ENDPOINTS.USER, { userId: user.id });

  // 스포일러 처리
  const handleSpoiler = () => {
    if (!isSpoiler) return;
    setIsSpoiler((prev) => !prev);
  };

  return (
    <div className={`${styles.review__item}${isShort ? ` ${styles.all}` : ''}`}>
      <div className={styles.review__profile__wrapper}>
        <Link href={userPath} className={styles.review__profile__link}>
          <ProfileImage image={user.profile_image} size={36} />
          <div className={styles.review__profile__info__wrapper}>
            <div className={styles.review__nickname__wrapper}>
              <span className={styles.review__nickname}>{user.nickname}</span>
              {data.rating && <RatingScore rating={data.rating} />}
            </div>
            {isDate && <span className={styles.review__date}>{fDiffDate(data.created_at)}</span>}
          </div>
        </Link>
        {/* <button className={styles.review__more__button}>
          <FillMoreIcon />
        </button> */}
      </div>
      <div className={styles.review__video__wrapper}>
        <Link
          href={{
            pathname: videoPath,
            query: {
              ...(referrer && { ref: referrer }),
              ...(referrerKey && { ref_key: referrerKey }),
            },
          }}
          className={styles.review__video__link}
        >
          <picture className={styles.review__thumbnail__wrapper}>
            <LazyLoadImage
              className={styles.review__thumbnail}
              src={fThumbnail(data.video.thumbnail)}
              srcSet={fThumbnail(data.video.thumbnail)}
              alt={data.video.title}
              effect="blur"
            />
          </picture>
        </Link>
        <div className={styles.review__wrapper}>
          <div className={styles.review__content__wrapper}>
            <div className={styles.review__video__info__wrapper}>
              <span className={styles.review__video__title}>{data.video.title}</span>
              <span className={styles.review__video__release}>
                <span>{fVideoCode(data.video.code)}</span>
                <span>|</span>
                <span>{fYear(data.video.release)}</span>
              </span>
            </div>
            <div className={styles.review__comment__wrapper}>
              {isSpoiler ? (
                <p className={styles.review__comment__spoiler}>
                  스포일러가 포함되어 있어요!
                  <button type="button" className={styles.review__spoiler__button} onClick={handleSpoiler}>
                    보기
                  </button>
                </p>
              ) : (
                <p className={styles.review__comment} data-short={isShort}>
                  {data.title}
                </p>
              )}
            </div>
          </div>
          {!isShort && (
            <div className={styles.review__more__wrapper}>
              <ReviewLikeButton videoId={data.video.id} review={data} setReview={setData} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewWithVideo;
