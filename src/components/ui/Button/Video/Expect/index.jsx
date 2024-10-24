'use client';

import React from 'react';
import { isEmpty } from 'lodash';

import { VIDEO_EXPECT_CODE } from '@/config/codes';
import { useAuthContext } from '@/contexts/AuthContext';
import { useContentsContext } from '@/contexts/ContentsContext';
import { useModalContext } from '@/contexts/ModalContext';
import { useVideoExpect } from '@/hooks/useVideoExpect';
import { showSuccessToast } from '@/components/ui/Toast';

import FillExpectIcon from '@/resources/icons/fill-expect.svg';
import OutlineExpectIcon from '@/resources/icons/outline-expect.svg';
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
            const { status } = res.data.data;
            if (status === VIDEO_EXPECT_CODE) {
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
      className={styles.detail__control}
      aria-label="기대돼요"
      onClick={handleExpectButton}
      disabled={isExpectPending}
    >
      {myInfo && myInfo.expect ? (
        <FillExpectIcon className={`${styles.detail__control__icon} ${styles.active}`} width={30} height={30} />
      ) : (
        <OutlineExpectIcon className={styles.detail__control__icon} width={30} height={30} />
      )}
      <span className={styles.detail__control__text}>기대돼요</span>
    </button>
  );
};

export default VideoExpectButton;
