'use client';

import React from 'react';
import { useAuthContext } from '@/contexts/AuthContext';
import { useModalContext } from '@/contexts/ModalContext';
import { useReviewLike } from '@/hooks/useReviewLike';
import { fNumberWithCommas } from '@/utils/format';
import { isEmpty } from 'lodash';
import FillThumbIcon from '@/resources/icons/fill-thumb.svg';
import OutlineThumbIcon from '@/resources/icons/outline-thumb.svg';

// TODO: 리뷰 좋아요 버튼 스타일은 공통 스타일로 변경

const ReviewLikeButton = ({ videoId, review, setReview = null }) => {
  const { toggleEnjoyModal } = useModalContext();
  const { user } = useAuthContext();
  const { mutate: reviewLike, isPending: isLikePending } = useReviewLike();
  const isLike =
    !isEmpty(user) && review.my_info ? review.my_info.is_like : false;

  const handleReviewLike = async () => {
    if (isEmpty(user)) {
      toggleEnjoyModal();
      return;
    }
    if (isLikePending) {
      return;
    }
    await reviewLike(
      { videoId, reviewId: review.id, userId: user.id },
      {
        onSuccess: (res) => {
          if (res.status === 200 && setReview) {
            const likeCount = res.data.data.like_count;
            const isLike = res.data.data.is_like;
            setReview((prev) => {
              return {
                ...prev,
                like_count: likeCount,
                my_info: { is_like: isLike },
              };
            });
          }
        },
      }
    );
  };

  return (
    <button
      type="button"
      className="review__like__button"
      onClick={handleReviewLike}
      disabled={isLikePending}
    >
      {isLike ? <FillThumbIcon /> : <OutlineThumbIcon />}
      <span className="review__like__count" data-like={isLike}>
        {fNumberWithCommas(review.like_count)}
      </span>
    </button>
  );
};

export default ReviewLikeButton;
