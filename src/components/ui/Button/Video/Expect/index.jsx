'use client';

import React from 'react';
import { isEmpty } from 'lodash';

import { useAuthContext } from '@/contexts/AuthContext';
import { useContentsContext } from '@/contexts/ContentsContext';
import { useModalContext } from '@/contexts/ModalContext';
import { useVideoExpect } from '@/hooks/useVideoExpect';
import { showSuccessToast } from '@/components/ui/Toast';

import styles from '@/styles/components/ControlButton.module.scss';

const VideoExpectButton = ({ videoId }) => {
  const { user } = useAuthContext();
  const { myInfo } = useContentsContext();
  const { toggleEnjoyModal } = useModalContext();
  const { mutate: videoExpect, isPending: isExpectPending } = useVideoExpect();

  const handleExpectButton = () => {
    // 유저가 없을 경우 Enjoy 모달 띄우기
    if (isEmpty(user)) {
      toggleEnjoyModal();
      return;
    }
    // API 호출 중일 경우 리턴
    if (isExpectPending) return;
    videoExpect(
      { videoId, userId: user.id },
      {
        onSuccess: (res) => {
          if (res.status === 200) {
            const { result } = res.data.data;
            if (result) {
              showSuccessToast('기대돼요 리스트에 추가되었습니다.');
            } else {
              showSuccessToast('기대돼요 리스트에서 제외되었습니다.');
            }
          }
        },
      }
    );
  };

  return (
    <button
      type="button"
      className={`${styles.detail__control} ${styles.expect}`}
      aria-label="기대돼요"
      onClick={handleExpectButton}
      disabled={isExpectPending}
    >
      {/* TODO: is_like -> is_watched 로 변경 */}
      <span className={`${styles.detail__control__icon} ${myInfo && myInfo.is_like ? styles.active : ''}`} />
    </button>
  );
};

export default VideoExpectButton;
