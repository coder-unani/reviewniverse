'use client';

import React, { useEffect, useRef } from 'react';
import Modal from 'react-modal';

import { showSuccessToast } from '@/components/ui/Toast';
import CloseButton from '@/components/ui/Button/Close';
import KakaoShareButton from '@/components/ui/Button/Share/Kakao';
// import FacebookShareButton from '@/components/ui/Button/Share/Facebook';
// import XShareButton from '@/components/ui/Button/Share/X';

import styles from '@/styles/components/ShareModal.module.scss';

const ShareModal = React.memo(({ title, desc, image, isOpen, onClose }) => {
  const modalRef = useRef();
  const currentUrl = window.location.href;

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

  // 링크 복사
  const handleCopyLink = () => {
    showSuccessToast('링크가 복사되었습니다.');
    navigator.clipboard.writeText(window.location.href);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      bodyOpenClassName="modal__open"
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.56)',
          zIndex: 998,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        content: {
          position: 'absolute',
          top: 'auto',
          left: 'auto',
          right: 'auto',
          bottom: 'auto',
          width: 450,
          height: 'auto',
          padding: '0',
          border: 'none',
          background: 'transparent',
          overflow: 'visible',
          zIndex: 999,
        },
      }}
    >
      <main className={styles.share__modal} ref={modalRef} onClick={handleModalClose}>
        <section className={styles.share__header}>
          <h4 className={styles.share__header__title}>공유</h4>
          <CloseButton onClose={onClose} />
        </section>
        <section className={styles.share__body}>
          <div className={styles.share__button__wrapper}>
            <KakaoShareButton title={title} desc={desc} image={image} />
            {/* <FacebookShareButton title={title} desc={desc} image={image} />
            <XShareButton title={title} desc={desc} image={image} /> */}
          </div>
          <div className={styles.share__link__wrapper}>
            <input type="text" className={styles.share__link} value={currentUrl} readOnly />
            <button type="button" className={styles.share__link__button} onClick={handleCopyLink}>
              복사
            </button>
          </div>
        </section>
        {/* <section className={styles.share__footer}></section> */}
      </main>
    </Modal>
  );
});

export default ShareModal;
