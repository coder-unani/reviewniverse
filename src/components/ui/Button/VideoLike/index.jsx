'use client';

import React from 'react';
import { useAuthContext } from '@/contexts/AuthContext';
import { useContentsContext } from '@/contexts/ContentsContext';
import { useModalContext } from '@/contexts/ModalContext';
import { useVideoLike } from '@/hooks/useVideoLike';
import { showSuccessToast } from '@/components/ui/Toast';
import { isEmpty } from 'lodash';
import styles from '@/styles/components/ControlButton.module.scss';

const VideoLikeButton = ({ videoId }) => {
  const { user } = useAuthContext();
  const { myInfo } = useContentsContext();
  const { toggleEnjoyModal } = useModalContext();
  const { mutate: videoLike, isPending: isLikePending } = useVideoLike();

  const handleLikeButton = async () => {
    if (isEmpty(user)) {
      toggleEnjoyModal();
      return;
    }
    if (isLikePending) {
      return;
    }
    await videoLike(
      { videoId, userId: user.id },
      {
        onSuccess: (res) => {
          if (res.status === 200) {
            const isLike = res.data.data.is_like;
            if (isLike) {
              showSuccessToast('좋아요 리스트에 추가되었습니다.');
            } else {
              showSuccessToast('좋아요 리스트에서 제외되었습니다.');
            }
          }
        },
      }
    );
  };

  return (
    <button
      type="button"
      className={`${styles.detail__control} ${styles.like}`}
      aria-label="좋아요"
      onClick={handleLikeButton}
      disabled={isLikePending}
    >
      <span className={`${styles.detail__control__icon} ${myInfo && myInfo.is_like ? styles.active : ''}`}></span>
    </button>
  );
};

export default VideoLikeButton;
