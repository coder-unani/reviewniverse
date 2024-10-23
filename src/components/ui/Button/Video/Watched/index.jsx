'use client';

import React from 'react';
import { isEmpty } from 'lodash';

import { useAuthContext } from '@/contexts/AuthContext';
import { useContentsContext } from '@/contexts/ContentsContext';
import { useModalContext } from '@/contexts/ModalContext';
import { useVideoWatched } from '@/hooks/useVideoWatched';
import { showSuccessToast } from '@/components/ui/Toast';

import FillWatchedIcon from '@/resources/icons/fill-watched.svg';
import OutlineWatchedIcon from '@/resources/icons/outline-watched.svg';
import styles from '@/styles/components/ControlButton.module.scss';

const VideoWatchedbutton = ({ videoId }) => {
  const { user } = useAuthContext();
  const { myInfo } = useContentsContext();
  const { toggleEnjoyModal } = useModalContext();
  const { mutate: videoWatched, isPending: isWatchedPending } = useVideoWatched();

  const handleWatchedButton = () => {
    // 유저가 없을 경우 Enjoy 모달 띄우기
    if (isEmpty(user)) {
      toggleEnjoyModal();
      return;
    }
    // API 호출 중일 경우 리턴
    if (isWatchedPending) return;
    videoWatched(
      { videoId, userId: user.id },
      {
        onSuccess: (res) => {
          if (res.status === 200) {
            const { result } = res.data.data;
            if (result) {
              showSuccessToast('봤어요 리스트에 추가되었습니다.');
            } else {
              showSuccessToast('봤어요 리스트에서 제외되었습니다.');
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
      aria-label="봤어요"
      onClick={handleWatchedButton}
      disabled={isWatchedPending}
    >
      {myInfo && myInfo.watched ? (
        <FillWatchedIcon className={`${styles.detail__control__icon} ${styles.active}`} width={30} height={30} />
      ) : (
        <OutlineWatchedIcon className={styles.detail__control__icon} width={30} height={30} />
      )}
      <span className={styles.detail__control__text}>봤어요</span>
    </button>
  );
};

export default VideoWatchedbutton;
