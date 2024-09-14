'use client';

import React, { useState, useEffect, useRef } from 'react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import PhotoModal from '@/components/ui/Modal/Photo';

const VideoGallery = ({ uniqueId }) => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [photoModal, setPhotoModal] = useState({ isOpen: false, url: '' });
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
        slide.classList.remove('gallery-margin-right');

        slide.addEventListener('click', () => {
          togglePhotoModal(slide.dataset.url);
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

  const togglePhotoModal = (url = '') => {
    setPhotoModal({ isOpen: !photoModal.isOpen, url });
  };

  return photoModal.isOpen && <PhotoModal url={photoModal.url} onClose={togglePhotoModal} />;
};

export default VideoGallery;
