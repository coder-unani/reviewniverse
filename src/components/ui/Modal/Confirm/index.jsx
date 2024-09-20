'use client';

import React, { useEffect, useRef } from 'react';
import Modal from 'react-modal';

import styles from '@/styles/components/ConfirmModal.module.scss';

const ConfirmModal = React.memo(({ children, onClose, onConfirm }) => {
  const modalRef = useRef();

  // 클라이언트 사이드에서만 Modal.setAppElement 설정
  useEffect(() => {
    // window 객체가 존재할 때만 실행
    if (typeof window !== 'undefined') {
      // Next.js에서는 #__next가 최상위 요소
      Modal.setAppElement(document.getElementById('__next'));
    }
  }, []);

  // 모달창 닫기
  const handleModalClose = (e) => {
    if (e.target === modalRef.current) {
      onClose();
    }
  };

  // 확인 버튼 클릭
  const handleConfirmClick = () => {
    onConfirm();
  };

  // 취소 버튼 클릭
  const handleCancelClick = () => {
    onClose();
  };

  return (
    <Modal
      isOpen={true}
      onRequestClose={onClose}
      ariaHideApp={false}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.56)',
          zIndex: 998,
        },
        content: {
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 300,
          height: 150,
          padding: '0',
          border: 'none',
          background: 'transparent',
          overflow: 'visible',
          zIndex: 999,
        },
      }}
    >
      <main className={styles.confirm__modal} ref={modalRef} onClick={handleModalClose}>
        <section className={styles.confirm__header}>
          <h4 className={styles.confirm__header__title}>알림</h4>
        </section>
        <section className={styles.confirm__body}>
          <p className={styles.confirm__body__content}>{children}</p>
        </section>
        <section className={styles.confirm__footer}>
          <button type="button" className={styles.cancel__button} onClick={handleCancelClick}>
            취소
          </button>
          |
          <button type="button" className={styles.confirm__button} onClick={handleConfirmClick}>
            확인
          </button>
        </section>
      </main>
    </Modal>
  );
});

export default ConfirmModal;
