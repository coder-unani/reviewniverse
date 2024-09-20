'use client';

import React, { useState, useEffect, useRef } from 'react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';

import { fParseInt } from '@/utils/format';
import PhotoModal from '@/components/ui/Modal/Photo';

const VideoGallery = ({ uniqueId, gallery, alt }) => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [photoModal, setPhotoModal] = useState({ isOpen: false, initialIndex: 0 });
  const swiperRef = useRef(null);

  useEffect(() => {
    const gallerySwiper = document.querySelector(`.swiper[data-swiper-id="${uniqueId}"]`);
    const prevButton = document.querySelector(`.swiper-prev-button[data-swiper-id="${uniqueId}"]`);
    const nextButton = document.querySelector(`.swiper-next-button[data-swiper-id="${uniqueId}"]`);

    if (gallerySwiper) {
      // 스와이퍼 설정
      const gallerySwiperConfig = {
        modules: [Navigation],
        spaceBetween: 10,
        slidesPerView: 2,
        slidesPerGroup: 2,
        speed: 1000,
        allowTouchMove: true,
        breakpoints: {
          769: {
            spaceBetween: 12,
            slidesPerView: 3,
            slidesPerGroup: 3,
            allowTouchMove: false,
          },
          1281: {
            slidesPerView: 4,
            slidesPerGroup: 4,
            allowTouchMove: false,
          },
        },
        navigation: {
          prevEl: prevButton,
          nextEl: nextButton,
        },
        on: {
          init: (swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          },
          slideChange: (swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          },
        },
      };

      const gallerySwiperInstance = new SwiperCore(gallerySwiper, gallerySwiperConfig);
      swiperRef.current = gallerySwiperInstance;

      const gallerySwiperSlide = document.querySelectorAll(`.swiper[data-swiper-id="${uniqueId}"] .swiper-slide`);
      gallerySwiperSlide.forEach((slide) => {
        // 서버 컴포넌트 스타일을 위해 추가했던 클래스명 제거
        slide.classList.remove('gallery-margin-right');

        // 포토 모달 이벤트 추가
        slide.addEventListener('click', () => {
          const index = fParseInt(slide.dataset.index);
          togglePhotoModal(index);
        });
      });
    }
  }, [uniqueId]);

  useEffect(() => {
    const prevButton = document.querySelector(`.swiper-prev-button[data-swiper-id="${uniqueId}"]`);
    const nextButton = document.querySelector(`.swiper-next-button[data-swiper-id="${uniqueId}"]`);

    if (prevButton) {
      prevButton.disabled = isBeginning;
    }
    if (nextButton) {
      nextButton.disabled = isEnd;
    }
  }, [isBeginning, isEnd, uniqueId]);

  const togglePhotoModal = (index) => {
    setPhotoModal({ isOpen: !photoModal.isOpen, initialIndex: index });
  };

  return (
    photoModal.isOpen && (
      <PhotoModal gallery={gallery} initialIndex={photoModal.initialIndex} alt={alt} onClose={togglePhotoModal} />
    )
  );
};

export default VideoGallery;
