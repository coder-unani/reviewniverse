'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Modal from '@/components/ui/Modal';
import CloseButton from '@/components/ui/Button/Close';
import { DEFAULT_IMAGES } from '@/config/constants';
import { ENDPOINTS } from '@/config/endpoints';
import styles from '@/styles/components/EnjoyModal.module.scss';

const EnjoyModal = React.memo(({ onClose }) => {
  const router = useRouter();
  const modalRef = useRef();

  // 모달창 바깥 클릭 시 닫기
  const handleModalClose = (e) => {
    if (e.target === modalRef.current) onClose();
  };

  // 로그인 버튼 클릭
  const handleLoginButton = () => {
    router.push(ENDPOINTS.USER_LOGIN);
  };

  return (
    <Modal>
      <div className={styles.enjoy__modal__wrapper} ref={modalRef} onClick={handleModalClose}>
        <main className={styles.enjoy__modal}>
          <section className={styles.enjoy__section}>
            <CloseButton onClose={onClose} />
            <div className={styles.enjoy__image__wrapper}>
              <img className={styles.enjoy__image} src={DEFAULT_IMAGES.userLogin} alt="회원 환영 이미지" />
              <p className={styles.enjoy__content}>로그인 후 이용할 수 있어요!</p>
            </div>
            <div className={styles.enjoy__button__wrapper}>
              <button className={styles.login__button} onClick={handleLoginButton}>
                로그인
              </button>
            </div>
          </section>
        </main>
      </div>
    </Modal>
  );
});

export default EnjoyModal;
