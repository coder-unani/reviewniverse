'use client';

import React, { useEffect } from 'react';
import { isEmpty } from 'lodash';

import { cLog } from '@/utils/test';
import { useModalContext } from '@/contexts/ModalContext';
import { useContentsContext } from '@/contexts/ContentsContext';
import ReviewModal from '@/components/ui/Modal/Review';

const Contents = ({ content }) => {
  const { isReviewModal, openPlatformModal } = useModalContext();
  const { myInfo } = useContentsContext();

  // 플랫폼 버튼 클릭 이벤트
  useEffect(() => {
    const platforms = document.querySelectorAll('li.platform-item');
    platforms.forEach((platform) => {
      platform.addEventListener('click', () => handlePlatformClick(platform));
    });
  }, []);

  const handlePlatformClick = (platform) => {
    const url = platform.dataset.url;
    if (isEmpty(url)) {
      openPlatformModal();
    } else {
      window.open(url, '_blank');
    }
  };

  return isReviewModal && <ReviewModal content={content} myReview={myInfo.review} />;
};

export default Contents;
