'use client';

import React from 'react';
import { isEmpty } from 'lodash';

import { fNumberWithCommas } from '@/utils/format';
import { useAuthContext } from '@/contexts/AuthContext';
import { useModalContext } from '@/contexts/ModalContext';
import { useReviewLike } from '@/hooks/useReviewLike';

import FillThumbIcon from '@/resources/icons/fill-thumb.svg';
import OutlineThumbIcon from '@/resources/icons/outline-thumb.svg';

const ReviewLikeButton = ({ videoId, review, setReview = null }) => {
  const { toggleEnjoyModal } = useModalContext();
  const { user } = useAuthContext();
  const { mutate: reviewLike, isPending: isLikePending } = useReviewLike();
  const isLike = !isEmpty(user) && review.my_info ? review.my_info.is_like : false;

  const handleReviewLike = () => {
    // 유저가 없을 경우 Enjoy 모달 띄우기
    if (isEmpty(user)) {
      toggleEnjoyModal();
      return;
    }
    // API 호출 중일 경우 리턴
    if (isLikePending) return;
    reviewLike(
      { videoId, reviewId: review.id, userId: user.id },
      {
        onSuccess: (res) => {
          if (res.status === 200 && setReview) {
            const { like_count: resLikeCount, is_like: resIsLike } = res.data.data;
            setReview((prev) => {
              return {
                ...prev,
                like_count: resLikeCount,
                my_info: { is_like: resIsLike },
              };
            });
          }
        },
      }
    );
  };

  return (
    <button type="button" className="review__like__button" onClick={handleReviewLike} disabled={isLikePending}>
      {isLike ? <FillThumbIcon /> : <OutlineThumbIcon />}
      <span className="review__like__count" data-like={isLike}>
        {fNumberWithCommas(review.like_count)}
      </span>
    </button>
  );
};

export default ReviewLikeButton;
