'use client';

import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';

import { useModalContext } from '@/contexts/ModalContext';
import { useContentsContext } from '@/contexts/ContentsContext';

const ReviewModal = dynamic(() => import('@/components/ui/Modal/Review'), { ssr: false });

const Contents = ({ content }) => {
  const { isReviewModal } = useModalContext();
  const { myInfo } = useContentsContext();

  // 플랫폼 버튼 클릭 이벤트
  useEffect(() => {
    const platforms = document.querySelectorAll('li.platform-item');
    platforms.forEach((platform) => {
      platform.addEventListener('click', () => {
        const url = platform.dataset.url;
        window.open(url, '_blank');
      });
    });
  }, []);

  return isReviewModal && <ReviewModal content={content} myReview={myInfo.review} />;
};

export default Contents;
