'use client';

import React, { useEffect, useRef } from 'react';
import Modal from 'react-modal';

import { DEFAULT_IMAGES } from '@/config/constants';
import { setStorageHidePopupBanner } from '@/utils/formatStorage';
import CloseButton from '@/components/ui/Button/Close';

import styles from '@/styles/components/PopupBanner.module.scss';

/**
 * TODO:
 * - 오늘 그만 보기 or 일주일간 보지 않기 체크박스 클릭시 쿠키에 저장하여 다시 띄우지 않기
 * - 쿠키 키값: HIDE_POPUP_BANNER
 * - 쿠키 값: true
 * - 쿠키 만료일: 오늘 그만 보기 클릭시 만료일은 오늘 날짜로 설정
 * - 쿠키 만료일: 일주일간 보지 않기 클릭시 만료일은 오늘 날짜 + 7일로 설정
 */

const PopupBanner = React.memo(({ isOpen, onClose }) => {
  const modalRef = useRef();

  const handleModalClose = (e) => {
    if (e.target === modalRef.current) onClose();
  };

  // 팝업 배너 오늘 그만 보기 체크 후 닫기하면 쿠키에 저장
  const handleHidePopupBanner = (e) => {
    const isChecked = e.target.checked;
    setStorageHidePopupBanner(isChecked);
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
      className={styles.popup__modal__wrapper}
      overlayClassName={styles.popup__modal__overlay}
      ariaHideApp={false}
    >
      <div className={styles.popup__modal} ref={modalRef} onClick={handleModalClose}>
        <section className={styles.popup__section}>
          <section className={styles.popup__header}>
            <CloseButton onClose={onClose} />
          </section>
          <section className={styles.popup__body}>
            <div className={styles.popup__image__wrapper}>
              <img className={styles.popup__image} src={DEFAULT_IMAGES.popup} alt="팝업 이미지" />
              <p className={styles.popup__content}>🤪 팝업 광고 입니다 🤪</p>
            </div>
          </section>
          <section className={styles.popup__footer}>
            <label htmlFor="popupHideCheck">
              <input type="checkbox" id="popupHideCheck" onChange={(e) => handleHidePopupBanner(e)} />
              오늘 하루 그만 보기
            </label>
          </section>
        </section>
      </div>
    </Modal>
  );
});

export default PopupBanner;
