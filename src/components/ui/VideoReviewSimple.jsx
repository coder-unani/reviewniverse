'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Tooltip } from 'react-tooltip';
import { isEmpty } from 'lodash';

import { EndpointManager, ENDPOINTS } from '@/config/endpoints';
import { useAuthContext } from '@/contexts/AuthContext';
import { useContentsContext } from '@/contexts/ContentsContext';
import { useModalContext } from '@/contexts/ModalContext';
import { useVideoReviews } from '@/hooks/useVideoReviews';
import { useReviewDelete } from '@/hooks/useReviewDelete';
import { showSuccessToast } from '@/components/ui/Toast';
import ReviewForVideo from '@/components/ui/ReviewForVideo';
import ProfileImage from '@/components/ui/Button/Profile/Image';

import ArrowRightIcon from '@/resources/icons/arrow-right.svg';
import FillUpdateIcon from '@/resources/icons/fill-update.svg';
import FillTrashIcon from '@/resources/icons/fill-trash.svg';
import styles from '@/styles/pages/Contents.module.scss';

/**
 * TODO:
 * - 리뷰 무한 스크롤 (스와이퍼 삭제)
 * - 리뷰 자세히 보기 (리뷰 모달?)
 */

const VideoReviewSimple = ({ videoId }) => {
  const { user } = useAuthContext();
  const { toggleEnjoyModal, toggleReviewModal, toggleConfirmModal } = useModalContext();
  const { myInfo } = useContentsContext();
  const [reviews, setReviews] = useState(null);
  const page = 1;
  const pageSize = 5;
  const {
    data: reviewsData,
    error: reviewsError,
    isLoading: reviewsIsLoading,
  } = useVideoReviews({ videoId, page, pageSize, enabled: videoId });
  const { mutate: reviewDelete, isPending: isDeletePending } = useReviewDelete();
  const deleteButtonRef = useRef(null);
  const reviewsPath = EndpointManager.generateUrl(ENDPOINTS.CONTENTS_REVIEWS, { videoId });

  useEffect(() => {
    if (reviewsIsLoading || !reviewsData) {
      return;
    }

    if (reviewsData.status) {
      setReviews(reviewsData.data);
    }
  }, [reviewsIsLoading, reviewsData]);

  // TODO: 고도화 필요
  if (isEmpty(reviews)) return null;

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
            기록된 리뷰가 없습니다.
            <br />
            <em>첫번째</em> 리뷰를 남겨보세요!
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

  return (
    <section className={styles.detail__review__section}>
      <div className={styles.detail__main__title__wrapper}>
        <h2 className={styles.detail__main__title}>
          리뷰
          <ReviewTotal />
        </h2>
        {/* 더보기 */}
        {reviews.total > 0 && (
          <Link className={styles.detail__review__more__button} href={reviewsPath}>
            <span className={styles.detail__review__more__text}>더보기</span>
            <ArrowRightIcon className={styles.detail__review__more__icon} width={24} height={24} />
          </Link>
        )}
      </div>

      {/* 내 리뷰 */}
      <MyReviewWrapper />

      {/* 비디오 리뷰 리스트 */}
      {!isEmpty(reviews.data) && (
        <article className={styles.detail__review__wrapper}>
          {reviews.data.map((review) => (
            <ReviewForVideo key={review.id} videoId={videoId} review={review} />
          ))}
        </article>
      )}
    </section>
  );
};

export default VideoReviewSimple;
