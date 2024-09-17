'use client';

import React from 'react';
import { useAuthContext } from '@/contexts/AuthContext';
import { useModalContext } from '@/contexts/ModalContext';
import { isEmpty } from 'lodash';
import styles from '@/styles/components/ControlButton.module.scss';

const ReviewButton = () => {
  const { user } = useAuthContext();
  const { toggleEnjoyModal, toggleReviewModal } = useModalContext();

  const handleReviewCreate = () => {
    if (isEmpty(user)) {
      toggleEnjoyModal();
      return;
    }
    toggleReviewModal();
  };

  return (
    <button
      type="button"
      className={`${styles.detail__control} ${styles.review}`}
      aria-label="리뷰 작성하기"
      onClick={handleReviewCreate}
    >
      <span className={styles.detail__control__icon}></span>
    </button>
  );
};

export default ReviewButton;
