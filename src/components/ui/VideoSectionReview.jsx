'use client';

import React, { useRef } from 'react';
import VideoReviewItem from '@/components/ui/VideoReviewItem';
import ProfileImage from '@/components/ui/Button/Profile/Image';
import { showSuccessToast } from '@/components/ui/Toast';
import { useAuthContext } from '@/contexts/AuthContext';
import { useModalContext } from '@/contexts/ModalContext';
import { useVideoDetailContext } from '@/contexts/VideoDetailContext';
import { useVideoReviews } from '@/hooks/useVideoReviews';
import { useReviewDelete } from '@/hooks/useReviewDelete';
import { Tooltip } from 'react-tooltip';
import { isEmpty } from 'lodash';
import FillUpdateIcon from '@/resources/icons/fill-update.svg';
import FillTrashIcon from '@/resources/icons/fill-trash.svg';

/**
 * TODO:
 * - 클라이언트 사이드 렌더링
 */

const VideoSectionReview = () => {
  const { user } = useAuthContext();
  const { videoId, myInfo } = useVideoDetailContext();
  const {
    data: reviews,
    error: reviewsError,
    isLoading: reviewsIsLoading,
  } = useVideoReviews({ videoId, page: 1, pageSize: 8, enabled: videoId });
  const { toggleEnjoyModal, toggleReviewModal, toggleConfirmModal } =
    useModalContext();
  const { mutate: reviewDelete, isPending: isDeletePending } =
    useReviewDelete();
  const deleteButtonRef = useRef(null);

  // 리뷰 작성
  const handleReviewCreate = () => {
    if (!user) {
      toggleEnjoyModal();
      return;
    }
    toggleReviewModal();
  };

  // 리뷰 수정
  const handleReviewUpdate = () => {
    toggleReviewModal();
  };

  // 리뷰 삭제
  const handleReviewDelete = async () => {
    if (isDeletePending) {
      return;
    }

    const confirmed = await new Promise((resolve) => {
      toggleConfirmModal('리뷰를 삭제하시겠어요?', resolve);
      deleteButtonRef.current.blur();
    });

    if (confirmed) {
      await reviewDelete(
        { videoId, reviewId: myInfo.review.id, userId: user.id },
        {
          onSuccess: (res) => {
            if (res.status === 204) {
              showSuccessToast('리뷰가 삭제되었습니다.');
            }
          },
        }
      );
    }
  };

  const MyReviewWrapper = () => {
    const getMessage = () => {
      if (!myInfo) {
        return '로그인 후 리뷰를 기록할 수 있어요!';
      } else if (isEmpty(reviews.data)) {
        return (
          <>
            기록된 리뷰가 없습니다. <em>첫번째</em> 리뷰를 남겨보세요!
          </>
        );
      } else if (isEmpty(myInfo.review)) {
        return '기록된 리뷰가 없습니다. 리뷰를 남겨보세요!';
      } else {
        return '';
      }
    };

    const renderNoReivew = (message) => (
      <article className="detail-no-review-wrapper">
        <p className="no-review-text">{message}</p>
        <button
          type="button"
          className="no-review-button"
          onClick={handleReviewCreate}
        >
          리뷰 쓰기
        </button>
      </article>
    );

    const renderMyReview = () => (
      <article className="detail-my-review-wrapper">
        <div className="my-review-title-wrapper">
          <ProfileImage image={user.profile_image} size={36} />
          <p className="my-review-title" onClick={handleReviewCreate}>
            {myInfo.review.title}
          </p>
          {/* <div className="my-review-content-wrapper">
            <p className="my-review-title" onClick={handleReviewCreate}>
              {myInfo.review.title}
            </p>
            <p>{myInfo.review.created_at}</p>
          </div> */}
        </div>
        <div className="my-review-button-wrapper">
          <button
            type="button"
            data-tooltip-id="myReviewDeleteTooltip"
            data-tooltip-content="삭제"
            className="my-review-delete-button"
            onClick={handleReviewDelete}
            disabled={isDeletePending}
            ref={deleteButtonRef}
          >
            <FillTrashIcon className="my-review-button-icon" />
          </button>
          <Tooltip
            id="myReviewDeleteTooltip"
            className="my-reivew-delete-tooltip"
            place="bottom"
            effect="solid"
          />
          <button
            type="button"
            className="my-review-update-button"
            data-tooltip-id="myReviewUpdateTooltip"
            data-tooltip-content="수정"
            onClick={handleReviewUpdate}
          >
            <FillUpdateIcon className="my-review-button-icon" />
          </button>
          <Tooltip
            id="myReviewUpdateTooltip"
            className="my-reivew-update-tooltip"
            place="bottom"
            effect="solid"
          />
        </div>
      </article>
    );

    const message = getMessage();
    return message ? renderNoReivew(message) : renderMyReview();
  };

  const ReviewTotal = () => {
    if (reviews.total <= 0) return null;
    const total = reviews.total > 999 ? '999+' : reviews.total;
    return <span className="detail-review-total">{total}</span>;
  };

  const ReviewsWrapper = () => {
    if (isEmpty(reviews.data)) return null;
    return (
      <article className="detail-review-wrapper">
        {reviews.data.map((review) => (
          <VideoReviewItem key={review.id} videoId={videoId} review={review} />
        ))}
      </article>
    );
  };

  if (reviewsIsLoading) return null;
  if (reviewsError) return null;

  return (
    <section className="detail-review-section">
      <h4 className="detail-main-title">
        리뷰
        <ReviewTotal />
      </h4>
      <MyReviewWrapper />
      <ReviewsWrapper />
    </section>
  );
};

export default VideoSectionReview;
