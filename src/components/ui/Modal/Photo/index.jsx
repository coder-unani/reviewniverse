'use client';

import React, { useEffect, useRef, useState } from 'react';

import { fMakeImageUrl } from '@/utils/formatContent';
import { useThemeContext } from '@/contexts/ThemeContext';
import Modal from '@/components/ui/Modal';
import CloseButton from '@/components/ui/Button/Close';

import ArrowLeftIcon from '@/resources/icons/arrow-left.svg';
import ArrowRightIcon from '@/resources/icons/arrow-right.svg';
import styles from '@/styles/components/PhotoModal.module.scss';

const PhotoModal = React.memo(({ gallery, initialIndex = 0, alt, onClose }) => {
  const { isMobile } = useThemeContext();
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const modalRef = useRef();

  // 모달 닫기
  const handleModalClose = (e) => {
    if (e.target === modalRef.current) {
      onClose();
    }
  };

  // 슬라이드 변경
  const handlePrevButton = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  const handleNextButton = () => {
    setCurrentIndex((prevIndex) => (prevIndex < gallery.length - 1 ? prevIndex + 1 : prevIndex));
  };

  useEffect(() => {
    // 클릭된 이미지로 초기 인덱스 설정
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  return (
    <Modal>
      <div className={styles.photo__modal} ref={modalRef} onClick={handleModalClose}>
        {isMobile && <CloseButton onClose={onClose} />}
        <img className={styles.photo__image} src={fMakeImageUrl(gallery[currentIndex])} alt={alt} loading="lazy" />
        <button className={styles.photo__prev__button} onClick={handlePrevButton} disabled={currentIndex === 0}>
          <ArrowLeftIcon width={28} height={28} />
        </button>
        <button
          className={styles.photo__next__button}
          onClick={handleNextButton}
          disabled={currentIndex === gallery.length - 1}
        >
          <ArrowRightIcon width={28} height={28} />
        </button>
      </div>
    </Modal>
  );
});

export default PhotoModal;
