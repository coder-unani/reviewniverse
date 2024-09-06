import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ProfileImage from '@/components/ui/Button/Profile/Image';
import RatingReview from '@/components/ui/RatingReview';
import ReviewLikeButton from '@/components/ui/Button/ReviewLike';
import { fDiffDate } from '@/utils/format';
import { DEFAULT_IMAGES } from '@/config/constants';
import { EndpointManager, ENDPOINTS } from '@/config/endpoints';
import { isEmpty } from 'lodash';

/**
 * TODO:
 * 1. 리뷰 스포일러 기능
 * 2. 리뷰 클릭시 리뷰 모달 열기
 */

const VideoReviewItem = ({ videoId, review }) => {
  const [active, setActive] = useState(review.is_spoiler);
  const profilePath = review.user
    ? EndpointManager.generateUrl(ENDPOINTS.USER, { userId: review.user.id })
    : '';
  const profileImage = review.user
    ? review.user.profile_image
    : DEFAULT_IMAGES.noActor;
  const profileNickname = review.user
    ? review.user.nickname
    : '탈퇴한 회원 입니다.';

  useEffect(() => {
    setActive(review.is_spoiler);
  }, [review]);

  // 스포일러 리뷰 클릭 시 스포일러 내용 보이기/숨기기
  const handleSpoiler = () => {
    if (!active) return;
    setActive((prev) => !prev);
  };

  return (
    <article className="detail-review-item">
      <div className="detail-review-profile-wrapper">
        <Link
          href={profilePath}
          className="detail-review-profile-link"
          data-active={!isEmpty(review.user)}
        >
          <ProfileImage image={profileImage} size={36} />
        </Link>
      </div>
      <div className="detail-review-content-wrapper">
        <div className="detail-review-header">
          <Link
            href={profilePath}
            className="detail-review-nickname-link"
            data-active={!isEmpty(review.user)}
          >
            <p className="detail-review-nickname">{profileNickname}</p>
          </Link>
          {review.rating && <RatingReview rating={review.rating} />}
        </div>
        <div className="detail-review-body" data-spoiler={review.is_spoiler}>
          {review.is_spoiler ? (
            <p
              className="detail-review-content"
              data-active={active}
              onClick={handleSpoiler}
            >
              {review.title}
            </p>
          ) : (
            <p className="detail-review-content">{review.title}</p>
          )}
        </div>
        <div className="detail-review-footer">
          <span className="detail-review-date">
            {fDiffDate(review.created_at)}
          </span>
          <ReviewLikeButton videoId={videoId} review={review} />
        </div>
      </div>
    </article>
  );
};

export default VideoReviewItem;
