'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import { ENDPOINTS } from '@/config/endpoints';

import styles from '@/styles/components/InquiryButton.module.scss';

const InquiryButton = ({ children, videoId = null }) => {
  const router = useRouter();

  const handleInquiryClick = () => {
    // videoId가 있으면 search query로 전달
    router.push(`${ENDPOINTS.INQUIRY}${videoId ? `?v=${videoId}` : ''}`);
  };

  return (
    <button type="button" className={styles.inquiry__button} onClick={handleInquiryClick}>
      {children}
    </button>
  );
};

export default InquiryButton;
