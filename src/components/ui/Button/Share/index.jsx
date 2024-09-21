'use client';

import React, { useState } from 'react';

import ShareModal from '@/components/ui/Modal/Share';

import styles from '@/styles/components/ControlButton.module.scss';

const ShareButton = ({ title, desc, image }) => {
  const [isShareModal, setIsShareModal] = useState(false);

  // 공유 모달창 토글
  const toggleShareModal = () => {
    setIsShareModal((prev) => !prev);
  };

  return (
    <>
      <button
        type="button"
        className={`${styles.detail__control} ${styles.share}`}
        aria-label="공유하기"
        onClick={toggleShareModal}
      >
        <span className={styles.detail__control__icon}></span>
      </button>

      <ShareModal title={title} desc={desc} image={image} isOpen={isShareModal} onClose={toggleShareModal} />
    </>
  );
};

export default ShareButton;
