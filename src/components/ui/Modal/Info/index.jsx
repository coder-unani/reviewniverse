'use client';

import React, { useEffect, useRef } from 'react';
import Modal from 'react-modal';

import styles from '@/styles/components/InfoModal.module.scss';

const InfoMoal = React.memo(({ children, isOpen, onClose }) => {
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
      className={styles.info__modal__wrapper}
      overlayClassName={styles.info__modal__overlay}
    >
      <main className={styles.info__modal} ref={modalRef} onClick={handleModalClose}>
        <section className={styles.info__header}>
          <h4 className={styles.info__header__title}>알림</h4>
        </section>
        <section className={styles.info__body}>
          <p className={styles.info__body__content}>{children}</p>
        </section>
        <section className={styles.info__footer}>
          <button type="button" className={styles.info__button} onClick={onClose}>
            확인
          </button>
        </section>
      </main>
    </Modal>
  );
});

export default InfoMoal;
