'use client';

import React, { useRef } from 'react';

import { DEFAULT_IMAGES } from '@/config/constants';
import { setStorageHidePopupBanner } from '@/utils/formatStorage';
import Modal from '@/components/ui/Modal';
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

const PopupBanner = React.memo(({ onClose }) => {
  const modalRef = useRef();

  const handleModalClose = (e) => {
    if (e.target === modalRef.current) onClose();
  };

  // 팝업 배너 오늘 그만 보기 체크 후 닫기하면 쿠키에 저장
  const handleHidePopupBanner = (e) => {
    const isChecked = e.target.checked;
    setStorageHidePopupBanner(isChecked);
  };

  return (
    <Modal>
      <div className={styles.popup__modal__wrapper} ref={modalRef}>
        <main className={styles.popup__modal}>
          <section className={styles.popup__section}>
            <CloseButton onClose={onClose} />
            <div className={styles.popup__image__wrapper}>
              <img className={styles.popup__image} src={DEFAULT_IMAGES.popup} alt="팝업 이미지" />
              <p className={styles.popup__content}>🤪 팝업 광고 입니다 🤪</p>
            </div>
            <section className={styles.popup__footer}>
              <input type="checkbox" id="popupHideCheck" onChange={(e) => handleHidePopupBanner(e)} />
              <label htmlFor="popupHideCheck">오늘 하루 그만 보기</label>
            </section>
          </section>
        </main>
      </div>
    </Modal>
  );
});

export default PopupBanner;
