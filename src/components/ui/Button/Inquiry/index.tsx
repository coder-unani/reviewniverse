'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import { ENDPOINTS } from '@/config/endpoints';
import { IInquiryProps } from '@/types/inquiry';

import InfoIcon from '@/resources/icons/outline-info.svg';
import styles from '@/styles/components/InquiryButton.module.scss';

const InquiryButton = ({ videoId = null }: IInquiryProps) => {
  const router = useRouter();

  const handleInquiryClick = () => {
    // videoId가 있으면 search query로 전달
    router.push(`${ENDPOINTS.INQUIRY}${videoId ? `?v=${videoId}` : ''}`);
  };

  return (
    <button type="button" className={styles.inquiry__button} onClick={handleInquiryClick}>
      <InfoIcon width={20} height={20} />
      제보하기
    </button>
  );
};

export default InquiryButton;
