'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import { EndpointManager, ENDPOINTS } from '@/config/endpoints';
import { fYear, fDiffDate } from '@/utils/format';
import ProfileImage from '@/components/ui/Button/Profile/Image';
import RatingScore from '@/components/ui/RatingScore';
import ReviewLikeButton from '@/components/ui/Button/ReviewLike';

import MoreIcon from '@/resources/icons/more.svg';
import styles from '@/styles/components/Review.module.scss';

/**
 * TODO:
 * 1. 리뷰 스포일러 기능
 * 2. 리뷰 클릭시 리뷰 모달 열기
 */

const Review = ({ videoId, review }) => {
  const [data, setData] = useState(review);
  const [active, setActive] = useState(review.is_spoiler);
  const userPath = EndpointManager.generateUrl(ENDPOINTS.USER, { userId: data.user.id });

  useEffect(() => {
    setData(review);
    setActive(review.is_spoiler);
  }, [review]);

  const handleSpoiler = () => {
    if (!active) return;
    setActive((prev) => !prev);
  };

  return (
    <div className={styles.review__item}>
      <div className={styles.review__profile__wrapper}>
        <Link href={userPath} className={styles.review__profile__link}>
          <ProfileImage image={data.user.profile_image} size={36} />
          <div className={styles.review__profile__info__wrapper}>
            <div className={styles.review__nickname__wrapper}>
              <span className={styles.review__nickname}>{data.user.nickname}</span>
              {data.rating && <RatingScore rating={data.rating} />}
            </div>
            <span className={styles.review__date}>{fDiffDate(data.created_at)}</span>
          </div>
        </Link>
        {/* <button className={styles.review__more__button}>
          <MoreIcon />
        </button> */}
      </div>
      <div className={styles.review__video__wrapper}>
        <div className={styles.review__wrapper}>
          <div className={styles.review__content__wrapper}>
            <div className={styles.review__comment__wrapper} data-spoiler={data.is_spoiler}>
              {data.is_spoiler ? (
                <p className={styles.review__comment} data-active={active} onClick={handleSpoiler}>
                  {data.title}
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
