'use client';

import React, { useEffect, useRef, useState } from 'react';
import Modal from 'react-modal';

import { fMakeImageUrl } from '@/utils/formatContent';
import { useThemeContext } from '@/contexts/ThemeContext';
import CloseButton from '@/components/ui/Button/Close';

import ArrowLeftIcon from '@/resources/icons/arrow-left.svg';
import ArrowRightIcon from '@/resources/icons/arrow-right.svg';
import styles from '@/styles/components/PhotoModal.module.scss';

const PhotoModal = React.memo(({ gallery, initialIndex = 0, alt, isOpen, onClose }) => {
  const { isMobile } = useThemeContext();
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const modalRef = useRef();

  // 모달창 클릭 이벤트
  const handleModalClose = (e) => {
    if (e.target === modalRef.current) onClose();
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

  // 전역 키보드 이벤트 등록
  useEffect(() => {
    const handleKeydown = (e) => {
      switch (e.key) {
        case 'ArrowLeft':
          handlePrevButton(); // 왼쪽 화살표 키 동작
          break;
        case 'ArrowRight':
          handleNextButton(); // 오른쪽 화살표 키 동작
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown); // 이벤트 해제
    };
  }, [currentIndex, gallery, onClose]);

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
      className={styles.photo__modal__wrapper}
      overlayClassName={styles.photo__modal__overlay}
    >
      <div className={styles.photo__modal} ref={modalRef} onClick={handleModalClose}>
        {isMobile && <CloseButton onClose={onClose} />}
        {/* 이미지 스타일 때문에 next Image 컴포넌트를 사용하지 않음 */}
        <img className={styles.photo__image} src={fMakeImageUrl(gallery[currentIndex])} alt={alt} loading="lazy" />
        <button
          type="button"
          className={styles.photo__prev__button}
          onClick={handlePrevButton}
          disabled={currentIndex === 0}
        >
          <ArrowLeftIcon width={28} height={28} />
        </button>
        <button
          type="button"
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
