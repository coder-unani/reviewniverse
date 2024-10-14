'use client';

import React, { useEffect, useRef, useState } from 'react';
import Modal from 'react-modal';
import ReactPlayer from 'react-player/lazy';

import { fTrailerCode } from '@/utils/formatContent';
import { useThemeContext } from '@/contexts/ThemeContext';
import CloseButton from '@/components/ui/Button/Close';

import ArrowLeftIcon from '@/resources/icons/arrow-left.svg';
import ArrowRightIcon from '@/resources/icons/arrow-right.svg';
import styles from '@/styles/components/TrailerModal.module.scss';

const TrailerModal = React.memo(({ trailer, initialIndex = 0, alt, isOpen, onClose }) => {
  const { isMobile } = useThemeContext();
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const modalRef = useRef();

  // 모달 클릭 이벤트
  const handleModalClose = (e) => {
    if (e.target === modalRef.current) onClose();
  };

  // 슬라이드 변경
  const handlePrevButton = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  const handleNextButton = () => {
    setCurrentIndex((prevIndex) => (prevIndex < trailer.length - 1 ? prevIndex + 1 : prevIndex));
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
  }, [currentIndex, trailer, onClose]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      bodyOpenClassName="modal__open"
      className={styles.trailer__modal__wrapper}
      overlayClassName={styles.trailer__modal__overlay}
    >
      <div className={styles.trailer__modal} ref={modalRef} onClick={handleModalClose}>
        {isMobile && <CloseButton onClose={onClose} />}
        {trailer && trailer[currentIndex] && (
          <ReactPlayer
            className={styles.trailer__player}
            url={`${trailer[currentIndex].url}?rel=0`}
            playing // autoplay 활성화
            controls // 플레이어 제어 버튼 표시
            muted // 음소거 해제
            width="100%"
            height="auto"
            aria-label={`${alt} ${fTrailerCode(trailer[currentIndex].code)}`}
          />
        )}
        <button
          type="button"
          className={styles.trailer__prev__button}
          onClick={handlePrevButton}
          disabled={currentIndex === 0}
        >
          <ArrowLeftIcon width={28} height={28} />
        </button>
        <button
          type="button"
          className={styles.trailer__next__button}
          onClick={handleNextButton}
          disabled={currentIndex === trailer.length - 1}
        >
          <ArrowRightIcon width={28} height={28} />
        </button>
      </div>
    </Modal>
  );
});

export default TrailerModal;
