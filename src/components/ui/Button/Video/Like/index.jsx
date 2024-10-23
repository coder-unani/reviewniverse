'use client';

import React from 'react';
import { isEmpty } from 'lodash';

import { useAuthContext } from '@/contexts/AuthContext';
import { useContentsContext } from '@/contexts/ContentsContext';
import { useModalContext } from '@/contexts/ModalContext';
import { useVideoLike } from '@/hooks/useVideoLike';
import { showSuccessToast } from '@/components/ui/Toast';

import FillLikeIcon from '@/resources/icons/fill-like.svg';
import OutlineLikeIcon from '@/resources/icons/outline-like.svg';
import styles from '@/styles/components/ControlButton.module.scss';

const VideoLikeButton = ({ videoId }) => {
  const { user } = useAuthContext();
  const { myInfo } = useContentsContext();
  const { toggleEnjoyModal } = useModalContext();
  const { mutate: videoLike, isPending: isLikePending } = useVideoLike();

  const handleLikeButton = () => {
    // 유저가 없을 경우 Enjoy 모달 띄우기
    if (isEmpty(user)) {
      toggleEnjoyModal();
      return;
    }
    // API 호출 중일 경우 리턴
    if (isLikePending) return;
    videoLike(
      { videoId, userId: user.id },
      {
        onSuccess: (res) => {
          if (res.status === 200) {
            const { result } = res.data.data;
            if (result) {
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
      className={styles.detail__control}
      aria-label="좋아요"
      onClick={handleLikeButton}
      disabled={isLikePending}
    >
      {myInfo && myInfo.like ? (
        <FillLikeIcon className={`${styles.detail__control__icon} ${styles.active}`} width={30} height={30} />
      ) : (
        <OutlineLikeIcon className={styles.detail__control__icon} width={30} height={30} />
      )}
      <span className={styles.detail__control__text}>좋아요</span>
    </button>
  );
};

export default VideoLikeButton;
