'use client';

import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Modal from 'react-modal';

import { DEFAULT_IMAGES } from '@/config/constants';
import { ENDPOINTS } from '@/config/endpoints';
import CloseButton from '@/components/ui/Button/Close';

import styles from '@/styles/components/EnjoyModal.module.scss';

const EnjoyModal = React.memo(({ isOpen, onClose }) => {
  const router = useRouter();
  const modalRef = useRef();

  // 모달창 클릭 이벤트
  const handleModalClose = (e) => {
    if (e.target === modalRef.current) onClose();
  };

  // 로그인 버튼 클릭
  const handleLoginButton = () => {
    router.push(ENDPOINTS.USER_LOGIN);
  };

  // 클라이언트 사이드에서만 Modal.setAppElement 설정
  useEffect(() => {
    // window 객체가 존재할 때만 실행
    if (typeof window !== 'undefined') {
      // Next.js에서는 #__next가 최상위 요소, #__next 인식하지 못해 대신 wrapper로 변경
      // Modal.setAppElement(document.getElementById('__next'));
      Modal.setAppElement(document.getElementById('wrapper'));
    }
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      bodyOpenClassName="modal__open"
      className={styles.enjoy__modal__wrapper}
      overlayClassName={styles.enjoy__modal__overlay}
    >
      <div className={styles.enjoy__modal} ref={modalRef} onClick={handleModalClose}>
        <section className={styles.enjoy__header}>
          <CloseButton onClose={onClose} />
        </section>
        <section className={styles.enjoy__body}>
          <div className={styles.enjoy__image__wrapper}>
            {/* 이미지 스타일 때문에 next Image 컴포넌트를 사용하지 않음 */}
            <img className={styles.enjoy__image} src={DEFAULT_IMAGES.userLogin} alt="회원 환영 이미지" loading="lazy" />
            <p className={styles.enjoy__content}>로그인 후 이용할 수 있어요!</p>
          </div>
        </section>
        <section className={styles.enjoy__footer}>
          <button type="button" className={styles.enjoy__button} onClick={handleLoginButton}>
            로그인
          </button>
        </section>
      </div>
    </Modal>
  );
});

export default EnjoyModal;
