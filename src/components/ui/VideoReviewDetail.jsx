'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { isEmpty } from 'lodash';

import { DEFAULT_IMAGES } from '@/config/constants';
import { EndpointManager, ENDPOINTS } from '@/config/endpoints';
import { fDiffDate } from '@/utils/format';
import ProfileImage from '@/components/ui/Button/Profile/Image';
import RatingScore from '@/components/ui/RatingScore';
import ReviewLikeButton from '@/components/ui/Button/ReviewLike';

import styles from '@/styles/components/VideoReviewDetail.module.scss';

/**
 * TODO:
 * 1. 리뷰 스포일러 기능
 * 2. 리뷰 클릭시 리뷰 모달 열기
 */

const VideoReviewDetail = ({ videoId, review }) => {
  const [active, setActive] = useState(review.is_spoiler);
  const profilePath = review.user ? EndpointManager.generateUrl(ENDPOINTS.USER, { userId: review.user.id }) : '';
  const profileImage = review.user ? review.user.profile_image : DEFAULT_IMAGES.noActor;
  const profileNickname = review.user ? review.user.nickname : '탈퇴한 회원 입니다.';

  useEffect(() => {
    setActive(review.is_spoiler);
  }, [review]);

  // 스포일러 리뷰 클릭 시 스포일러 내용 보이기/숨기기
  const handleSpoiler = () => {
    if (!active) return;
    setActive((prev) => !prev);
  };

  return (
    <article className={styles.detail__review__item}>
      <div className={styles.detail__review__profile__wrapper}>
        <Link href={profilePath} className={styles.detail__review__profile__link} data-active={!isEmpty(review.user)}>
          <ProfileImage image={profileImage} size={36} />
        </Link>
      </div>
      <div className={styles.detail__review__content__wrapper}>
        <div className={styles.detail__review__header}>
          <Link
            href={profilePath}
            className={styles.detail__review__nickname__link}
            data-active={!isEmpty(review.user)}
          >
            <p className={styles.detail__review__nickname}>{profileNickname}</p>
          </Link>
          {review.rating && <RatingScore rating={review.rating} />}
        </div>
        <div className={styles.detail__review__body} data-spoiler={review.is_spoiler}>
          {review.is_spoiler ? (
            <p className={styles.detail__review__content} data-active={active} onClick={handleSpoiler}>
              {review.title}
            </p>
          ) : (
            <p className={styles.detail__review__content}>{review.title}</p>
          )}
        </div>
        <div className={styles.detail__review__footer}>
          <span className={styles.detail__review__date}>{fDiffDate(review.created_at)}</span>
          <ReviewLikeButton videoId={videoId} review={review} />
        </div>
      </div>
    </article>
  );
};

export default VideoReviewDetail;
