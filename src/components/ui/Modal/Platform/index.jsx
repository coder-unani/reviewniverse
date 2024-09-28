'use client';

import React, { useEffect, useRef } from 'react';
import Modal from 'react-modal';

import styles from '@/styles/components/PlatformModal.module.scss';

const PlatformModal = React.memo(({ isOpen, onClose }) => {
  const modalRef = useRef();

  // 클라이언트 사이드에서만 Modal.setAppElement 설정
  useEffect(() => {
    // window 객체가 존재할 때만 실행
    if (typeof window !== 'undefined') {
      // Next.js에서는 #__next가 최상위 요소, #__next 인식하지 못해 대신 wrapper로 변경
      // Modal.setAppElement(document.getElementById('__next'));
      Modal.setAppElement(document.getElementById('wrapper'));
    }
  }, []);

  // 모달창 닫기
  const handleModalClose = (e) => {
    if (e.target === modalRef.current) {
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      bodyOpenClassName="modal__open"
      className={styles.platform__modal__wrapper}
      overlayClassName={styles.platform__modal__overlay}
    >
      <main className={styles.platform__modal} ref={modalRef} onClick={handleModalClose}>
        <section className={styles.platform__header}>
          <h4 className={styles.platform__header__title}>알림</h4>
        </section>
        <section className={styles.platform__body}>
          <p className={styles.platform__body__content}>
            아직 OTT에서 준비 중이예요.
            <br />곧 만나요! 🤗
          </p>
        </section>
        <section className={styles.platform__footer}>
          <button type="button" className={styles.platform__button} onClick={onClose}>
            확인
          </button>
        </section>
      </main>
    </Modal>
  );
});

export default PlatformModal;
