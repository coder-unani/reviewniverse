'use client';

import React, { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';

import { useModalContext } from '@/contexts/ModalContext';
import { useContentsContext } from '@/contexts/ContentsContext';
import ReviewModal from '@/components/ui/Modal/Review';

const Contents = ({ content }) => {
  const { isReviewModal, toggleReviewModal, openInfoModal } = useModalContext();
  const { myInfo } = useContentsContext();
  const [myReview, setMyReview] = useState({
    id: 0,
    title: '',
    content: '',
    is_spoiler: false,
    is_private: false,
  });

  const handlePlatformClick = (platform) => {
    const { url } = platform.dataset;
    if (isEmpty(url)) {
      const message = () => (
        <>
          아직 준비 중이에요.
          <br />곧 만나요! 🤗
        </>
      );
      openInfoModal(message);
    } else {
      window.open(url, '_blank');
    }
  };

  // 플랫폼 버튼 클릭 이벤트
  useEffect(() => {
    const platforms = document.querySelectorAll('li.platform-item');

    const handleClick = (event) => {
      handlePlatformClick(event.currentTarget);
    };

    platforms.forEach((platform) => {
      platform.addEventListener('click', handleClick);
    });

    return () => {
      platforms.forEach((platform) => {
        platform.removeEventListener('click', handleClick);
      });
    };
  }, []);

  // myInfo review
  useEffect(() => {
    if (myInfo && myInfo.review) setMyReview({ ...myInfo.review });
  }, [myInfo]);

  if (isEmpty(myInfo)) return null;

  return <ReviewModal content={content} myReview={myReview} isOpen={isReviewModal} onClose={toggleReviewModal} />;
};

export default Contents;
