'use client';

import React, { useState, Suspense } from 'react';
import dynamic from 'next/dynamic';

import OutlineShareIcon from '@/resources/icons/outline-share.svg';
import styles from '@/styles/components/ControlButton.module.scss';

const ShareModal = dynamic(() => import('@/components/ui/Modal/Share'), { ssr: false });

const ShareButton = ({ title, desc, image }) => {
  const [isShareModal, setIsShareModal] = useState(false);

  // 공유 모달창 토글
  const toggleShareModal = () => {
    setIsShareModal((prev) => !prev);
  };

  return (
    <>
      <button type="button" className={styles.detail__control} aria-label="공유하기" onClick={toggleShareModal}>
        <OutlineShareIcon className={styles.detail__control__icon} width={30} height={30} />
        <span className={styles.detail__control__text}>공유하기</span>
      </button>

      <Suspense fallback="">
        <ShareModal title={title} desc={desc} image={image} isOpen={isShareModal} onClose={toggleShareModal} />
      </Suspense>
    </>
  );
};

export default ShareButton;
