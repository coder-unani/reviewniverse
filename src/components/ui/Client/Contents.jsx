'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useModalContext } from '@/contexts/ModalContext';
import { useContentsContext } from '@/contexts/ContentsContext';

const ReviewModal = dynamic(() => import('@/components/ui/Modal/Review'), { ssr: false });

const Contents = ({ content }) => {
  const { isReviewModal } = useModalContext();
  const { myInfo } = useContentsContext();

  return isReviewModal && <ReviewModal content={content} myReview={myInfo.review} />;
};

export default Contents;
