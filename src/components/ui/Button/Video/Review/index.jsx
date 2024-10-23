'use client';

import React from 'react';
import { isEmpty } from 'lodash';

import { useAuthContext } from '@/contexts/AuthContext';
import { useModalContext } from '@/contexts/ModalContext';

import OutlinePenIcon from '@/resources/icons/outline-pen.svg';
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
    <button type="button" className={styles.detail__control} aria-label="리뷰 작성하기" onClick={handleReviewCreate}>
      <OutlinePenIcon className={styles.detail__control__icon} width={30} height={30} />
      <span className={styles.detail__control__text}>리뷰쓰기</span>
    </button>
  );
};

export default ReviewButton;
