'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { isEmpty } from 'lodash';

import { EndpointManager, ENDPOINTS } from '@/config/endpoints';
import { fDiffDate } from '@/utils/format';
import { fUserWatchtype } from '@/utils/formatContent';
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

const Review = ({ videoId, review }) => {
  const [data, setData] = useState(review);
  const [isSpoiler, setIsSpoiler] = useState(review.is_spoiler);
  const userPath = EndpointManager.generateUrl(ENDPOINTS.USER, { userId: data.user.id });

  // 스포일러 리뷰 클릭 시 스포일러 내용 보이기/숨기기
  const handleSpoiler = () => {
    if (!isSpoiler) return;
    setIsSpoiler((prev) => !prev);
  };

  return (
    <div className={styles.review__item} data-id={review.id}>
      <div className={styles.review__profile__wrapper}>
        <Link href={userPath} className={styles.review__profile__link}>
          <ProfileImage image={data.user.profile_image} size={36} />

          <div className={styles.review__profile__info__wrapper}>
            <div className={styles.review__nickname__wrapper}>
              <span className={styles.review__nickname}>{data.user.nickname}</span>

              {data.rating && <RatingScore rating={data.rating} />}

              {/* 시청타입 */}
              {!isEmpty(data.user.watch_type) && (
                <div className={styles.review__watchtype__wrapper}>
                  {data.user.watch_type.map((code) => (
                    <span key={code} data-code={code} className={styles.review__watchtype}>
                      {fUserWatchtype(code).abbr}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <span className={styles.review__date}>{fDiffDate(data.created_at)}</span>
          </div>
        </Link>

        {/* <button className={styles.review__more__button}>
          <FillMoreIcon />
        </button> */}
      </div>

      <div className={styles.review__video__wrapper}>
        <div className={styles.review__wrapper}>
          <div className={styles.review__content__wrapper}>
            <div className={styles.review__comment__wrapper}>
              {isSpoiler ? (
                <p className={styles.review__comment__spoiler}>
                  스포일러가 포함되어 있어요!
                  <button type="button" className={styles.review__spoiler__button} onClick={handleSpoiler}>
                    보기
                  </button>
                </p>
              ) : (
                <p className={styles.review__comment}>{data.title}</p>
              )}
            </div>
          </div>

          <div className={styles.review__more__wrapper}>
            <ReviewLikeButton videoId={videoId} review={data} setReview={setData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
