'use client';

import React, { useState, useEffect, useRef } from 'react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';

import { fParseInt } from '@/utils/format';
import { fReplaceImageOnError } from '@/utils/formatContent';
import PhotoModal from '@/components/ui/Modal/Photo';

const VideoGallery = ({ uniqueId, gallery, alt }) => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [photoModal, setPhotoModal] = useState({ isOpen: false, initialIndex: 0 });
  const swiperRef = useRef(null);

  const togglePhotoModal = (index) => {
    setPhotoModal({ isOpen: !photoModal.isOpen, initialIndex: index });
  };

  useEffect(() => {
    const gallerySwiper = document.querySelector(`.swiper[data-swiper-id="${uniqueId}"]`);
    const prevButton = document.querySelector(`.swiper-prev-button[data-swiper-id="${uniqueId}"]`);
    const nextButton = document.querySelector(`.swiper-next-button[data-swiper-id="${uniqueId}"]`);

    let gallerySwiperInstance;
    let cleanUpImage;

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

      gallerySwiperInstance = new SwiperCore(gallerySwiper, gallerySwiperConfig);
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

      // 이미지에 대한 onError 처리
      cleanUpImage = fReplaceImageOnError(`.swiper[data-swiper-id="${uniqueId}"] img`);
    }

    // clean up
    return () => {
      gallerySwiperInstance?.destroy();
      cleanUpImage?.();
    };
  }, [uniqueId]);

  useEffect(() => {
    const prevButton = document.querySelector(`.swiper-prev-button[data-swiper-id="${uniqueId}"]`);
    const nextButton = document.querySelector(`.swiper-next-button[data-swiper-id="${uniqueId}"]`);

    if (prevButton) prevButton.disabled = isBeginning;
    if (nextButton) nextButton.disabled = isEnd;
  }, [isBeginning, isEnd, uniqueId]);

  return (
    <PhotoModal
      gallery={gallery}
      initialIndex={photoModal.initialIndex}
      alt={alt}
      isOpen={photoModal.isOpen}
      onClose={togglePhotoModal}
    />
  );
};

export default VideoGallery;
