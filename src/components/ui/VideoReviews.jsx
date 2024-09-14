'use client';

import React, { useRef } from 'react';
import VideoReviewItem from '@/components/ui/VideoReviewItem';
import ProfileImage from '@/components/ui/Button/Profile/Image';
import { showSuccessToast } from '@/components/ui/Toast';
import { useAuthContext } from '@/contexts/AuthContext';
import { useContentsContext } from '@/contexts/ContentsContext';
import { useModalContext } from '@/contexts/ModalContext';
import { useVideoReviews } from '@/hooks/useVideoReviews';
import { useReviewDelete } from '@/hooks/useReviewDelete';
import { Tooltip } from 'react-tooltip';
import { isEmpty } from 'lodash';
import FillUpdateIcon from '@/resources/icons/fill-update.svg';
import FillTrashIcon from '@/resources/icons/fill-trash.svg';
import styles from '@/styles/pages/Contents.module.scss';

/**
 * TODO:
 * - 리뷰 무한 스크롤 (스와이퍼 삭제)
 * - 리뷰 자세히 보기 (리뷰 모달?)
 */

const VideoReviews = ({ videoId }) => {
  const { user } = useAuthContext();
  const { myInfo } = useContentsContext();
  const {
    data: reviews,
    error: reviewsError,
    isLoading: reviewsIsLoading,
  } = useVideoReviews({ videoId, page: 1, pageSize: 8, enabled: videoId });
  const { toggleEnjoyModal, toggleReviewModal, toggleConfirmModal } = useModalContext();
  const { mutate: reviewDelete, isPending: isDeletePending } = useReviewDelete();
  const deleteButtonRef = useRef(null);

  // 리뷰 작성
  const handleReviewCreate = () => {
    if (isEmpty(user)) {
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

  const ReviewTotal = () => {
    if (reviews.total <= 0) return null;
    const total = reviews.total > 999 ? '999+' : reviews.total;
    return <span className={styles.detail__review__total}>{total}</span>;
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
      <article className={styles.detail__no__review__wrapper}>
        <p className={styles.no__review__text}>{message}</p>
        <button type="button" className={styles.no__review__button} onClick={handleReviewCreate}>
          리뷰 쓰기
        </button>
      </article>
    );

    const renderMyReview = () => (
      <article className={styles.detail__my__review__wrapper}>
        <div className={styles.my__review__title__wrapper}>
          <ProfileImage image={user.profile_image} size={36} />
          <p className={styles.my__review__title} onClick={handleReviewCreate}>
            {myInfo.review.title}
          </p>
          {/* <div className={styles.my__review__content__wrapper}>
            <p className={styles.my__review__title} onClick={handleReviewCreate}>
              {myInfo.review.title}
            </p>
            <p>{myInfo.review.created_at}</p>
          </div> */}
        </div>
        <div className={styles.my__review__button__wrapper}>
          <button
            type="button"
            data-tooltip-id="myReviewDeleteTooltip"
            data-tooltip-content="삭제"
            className={styles.my__review__delete__button}
            onClick={handleReviewDelete}
            disabled={isDeletePending}
            ref={deleteButtonRef}
          >
            <FillTrashIcon className={styles.my__review__button__icon} width={18} height={18} />
          </button>
          <Tooltip
            id="myReviewDeleteTooltip"
            className={styles.my__review__delete__tooltip}
            place="bottom"
            effect="solid"
          />
          <button
            type="button"
            className={styles.my__review__update__button}
            data-tooltip-id="myReviewUpdateTooltip"
            data-tooltip-content="수정"
            onClick={handleReviewUpdate}
          >
            <FillUpdateIcon className={styles.my__review__button__icon} width={18} height={18} />
          </button>
          <Tooltip
            id="myReviewUpdateTooltip"
            className={styles.my__review__update__tooltip}
            place="bottom"
            effect="solid"
          />
        </div>
      </article>
    );

    const message = getMessage();
    return message ? renderNoReivew(message) : renderMyReview();
  };

  const ReviewsWrapper = () => {
    if (isEmpty(reviews.data)) return null;
    return (
      <article className={styles.detail__review__wrapper}>
        {reviews.data.map((review) => (
          <VideoReviewItem key={review.id} videoId={videoId} review={review} />
        ))}
      </article>
    );
  };

  if (reviewsIsLoading) return null;
  if (reviewsError) return null;

  return (
    <section className={styles.detail__review__section}>
      <h4 className={styles.detail__main__title}>
        리뷰
        <ReviewTotal />
      </h4>
      <MyReviewWrapper />
      <ReviewsWrapper />
    </section>
  );
};

export default VideoReviews;
