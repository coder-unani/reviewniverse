'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { isEmpty } from 'lodash';

import { DEFAULT_IMAGES } from '@/config/constants';
import { EndpointManager, ENDPOINTS } from '@/config/endpoints';
import { fDiffDate } from '@/utils/format';
import { fUserWatchType } from '@/utils/formatContent';
import ProfileImage from '@/components/ui/Button/Profile/Image';
import RatingScore from '@/components/ui/RatingScore';
import ReviewLikeButton from '@/components/ui/Button/ReviewLike';

import defStyles from '@/styles/components/Review.module.scss';
import styles from '@/styles/components/ReviewForVideo.module.scss';

/**
 * TODO:
 * 1. 리뷰 스포일러 기능
 * 2. 리뷰 클릭시 리뷰 모달 열기
 */

const ReviewForVideo = ({ videoId, review }) => {
  const [active, setActive] = useState(review.is_spoiler);
  const profilePath = review.user ? EndpointManager.generateUrl(ENDPOINTS.USER, { userId: review.user.id }) : '';
  const profileImage = review.user ? review.user.profile_image : DEFAULT_IMAGES.noActor;
  const profileNickname = review.user ? review.user.nickname : '탈퇴한 회원 입니다.';
  const profileWatchType = review.user ? review.user.watch_type : null;

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

          {/* 시청타입 */}
          {!isEmpty(profileWatchType) && (
            <div className={styles.detail__review__watchtype__wrapper}>
              {profileWatchType.map((code, index) => (
                <span key={index} data-code={code} className={styles.detail__review__watchtype}>
                  {fUserWatchType(code).abbr}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className={styles.detail__review__body} data-spoiler={review.is_spoiler}>
          {review.is_spoiler ? (
            <button
              type="button"
              className={defStyles.review__comment__spoiler}
              data-active={active}
              onClick={handleSpoiler}
            >
              <p className={styles.detail__review__content}>{review.title}</p>
            </button>
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

export default ReviewForVideo;
