'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuthContext } from '@/contexts/AuthContext';
import { useUserDelete } from '@/hooks/useUserDelete';
import { showSuccessToast, showErrorToast } from '@/components/ui/Toast';
import { DEFAULT_IMAGES } from '@/config/constants';
import { ENDPOINTS } from '@/config/endpoints';
import { Tooltip } from 'react-tooltip';
import { isEmpty } from 'lodash';
import styles from '@/styles/pages/UsersDelete.module.scss';

export default function page() {
  const router = useRouter();
  const { user, handleRemoveUser } = useAuthContext();
  const { mutate: userDelete, isPending: isDeletePending } = useUserDelete();

  useEffect(() => {
    if (isEmpty(user)) {
      router.push(ENDPOINTS.HOME);
    }
  }, []);

  // 회원탈퇴 취소
  const handleCancel = () => {
    router.back();
  };

  // 회원탈퇴 확인
  const handleDelete = async () => {
    if (isDeletePending) {
      return;
    }
    await userDelete(
      { userId: user.id },
      {
        onSuccess: (res) => {
          if (res.status === 204) {
            handleRemoveUser();
            router.push(ENDPOINTS.HOME);
            showSuccessToast('회원탈퇴가 완료되었습니다.');
          } else {
            showErrorToast('회원탈퇴를 완료하지 못했습니다.');
          }
        },
      },
      {
        onError: () => {
          showErrorToast('회원탈퇴를 완료하지 못했습니다.');
        },
      }
    );
  };

  return (
    <main className={styles.delete__main}>
      <section className={styles.delete__section}>
        <div className={styles.delete__wrapper}>
          <p className={styles.delete__title}>정말 탈퇴하시겠어요? 🥺</p>
          <p className={styles.delete__sub__title}>
            삭제된 계정은 복구할 수 없습니다.
            <br />
            삭제하시려면 아래의 버튼을 눌러주세요.
          </p>
          <Image
            className={styles.delete__image}
            src={DEFAULT_IMAGES.userDelete}
            alt="회원 탈퇴 이미지"
            width={320}
            height={320}
            priority
          />
          <div className={styles.delete__button__wrapper}>
            <button
              type="button"
              id="cancelButton"
              className={styles.delete__cancel}
              onClick={handleCancel}
            >
              안할래요!
            </button>
            <Tooltip
              className={styles.delete__cancel__tooltip}
              anchorSelect="#cancelButton"
              content="💜"
              place="bottom"
            />
            <button
              type="button"
              id="deleteButton"
              className={styles.delete__confirm}
              onClick={handleDelete}
              disabled={isDeletePending}
            >
              탈퇴하기
            </button>
            <Tooltip
              className={styles.delete__confirm__tooltip}
              anchorSelect="#deleteButton"
              content="가지마세요 😭"
              place="bottom"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
