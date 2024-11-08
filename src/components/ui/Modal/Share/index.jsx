'use client';

import React, { useEffect, useRef, useState } from 'react';
import Modal from 'react-modal';

import { showSuccessToast } from '@/components/ui/Toast';
import CloseButton from '@/components/ui/Button/Close';
import KakaoShareButton from '@/components/ui/Button/Share/Kakao';
import FacebookShareButton from '@/components/ui/Button/Share/Facebook';
import XShareButton from '@/components/ui/Button/Share/X';

import styles from '@/styles/components/ShareModal.module.scss';

const ShareModal = React.memo(({ title, desc, image, isOpen, onClose }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const modalRef = useRef();
  const shareLinkUrl = window.location.href;

  // 모달창 클릭 이벤트
  const handleModalClose = (e) => {
    if (e.target === modalRef.current) onClose();
  };

  // 링크 복사
  const handleCopyLink = () => {
    showSuccessToast('링크가 복사되었습니다.');
    navigator.clipboard.writeText(window.location.href);
  };

  // 클라이언트 사이드에서만 Modal.setAppElement 설정
  useEffect(() => {
    // window 객체가 존재할 때만 실행
    if (typeof window !== 'undefined') {
      // Next.js에서는 #__next가 최상위 요소, #__next 인식하지 못해 대신 wrapper로 변경
      // Modal.setAppElement(document.getElementById('__next'));
      Modal.setAppElement(document.getElementById('wrapper'));
    }

    if (isOpen) {
      // 모달이 열릴 때 애니메이션을 적용하기 위해 딜레이를 주어 클래스를 설정
      setTimeout(() => {
        setIsAnimating(true);
      }, 10);
    } else {
      // 모달이 닫힐 때는 애니메이션을 바로 해제
      setIsAnimating(false);
    }
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      bodyOpenClassName="modal__open"
      className={`${styles.share__modal__wrapper} ${isAnimating ? styles.open : styles.close}`}
      overlayClassName={styles.share__modal__overlay}
      closeTimeoutMS={300} // 애니메이션 지속 시간과 일치시켜 닫기 애니메이션 추가
    >
      <div className={styles.share__modal} ref={modalRef} onClick={handleModalClose}>
        <section className={styles.share__header}>
          <CloseButton onClose={onClose} />
          <h4 className={styles.share__header__title}>공유</h4>
        </section>
        <section className={styles.share__body}>
          <div className={styles.share__button__wrapper}>
            <KakaoShareButton title={title} desc={desc} image={image} />
            <FacebookShareButton title={title} desc={desc} image={image} />
            <XShareButton title={title} desc={desc} image={image} />
          </div>
          <div className={styles.share__link__wrapper}>
            <input type="text" className={styles.share__link} value={shareLinkUrl} readOnly />
            <button type="button" className={styles.share__link__button} onClick={handleCopyLink}>
              복사
            </button>
          </div>
        </section>
      </div>
    </Modal>
  );
});

export default ShareModal;
