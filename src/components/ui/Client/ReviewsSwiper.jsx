'use client';

import { useState, useEffect, useRef } from 'react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';

import { fReplaceImageOnError } from '@/utils/formatContent';

const ReviewsSwiper = ({ uniqueId }) => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const swiperRef = useRef(null);

  useEffect(() => {
    const reviewSwiper = document.querySelector(`.swiper[data-swiper-id="${uniqueId}"]`);
    const prevButton = document.querySelector(`.swiper-prev-button[data-swiper-id="${uniqueId}"]`);
    const nextButton = document.querySelector(`.swiper-next-button[data-swiper-id="${uniqueId}"]`);

    let reviewSwiperInstance;
    let cleanUpImage;

    if (reviewSwiper) {
      // 스와이퍼 설정
      const reviewSwiperConfig = {
        modules: [Navigation],
        spaceBetween: 8,
        slidesPerView: 1.2,
        slidesPerGroup: 1,
        speed: 1000,
        allowTouchMove: true,
        breakpoints: {
          577: {
            spaceBetween: 8,
            slidesPerView: 1.2,
            slidesPerGroup: 1,
            allowTouchMove: false,
          },
          769: {
            spaceBetween: 10,
            slidesPerView: 2,
            slidesPerGroup: 2,
            allowTouchMove: false,
          },
          1025: {
            spaceBetween: 12,
            slidesPerView: 3,
            slidesPerGroup: 3,
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

      reviewSwiperInstance = new SwiperCore(reviewSwiper, reviewSwiperConfig);
      swiperRef.current = reviewSwiperInstance;

      const genreSwiperSlide = document.querySelectorAll(`.swiper[data-swiper-id="${uniqueId}"] .swiper-slide`);
      genreSwiperSlide.forEach((slide) => {
        slide.classList.remove('genre-margin-right');
      });

      // 이미지에 대한 onError 처리
      cleanUpImage = fReplaceImageOnError(`.swiper[data-swiper-id="${uniqueId}"] img`);
    }

    // clean up
    return () => {
      reviewSwiperInstance?.destroy();
      cleanUpImage?.();
    };
  }, [uniqueId]);

  useEffect(() => {
    const prevButton = document.querySelector(`.swiper-prev-button[data-swiper-id="${uniqueId}"]`);
    const nextButton = document.querySelector(`.swiper-next-button[data-swiper-id="${uniqueId}"]`);

    if (prevButton) prevButton.disabled = isBeginning;
    if (nextButton) nextButton.disabled = isEnd;
  }, [isBeginning, isEnd, uniqueId]);

  return null;
};

export default ReviewsSwiper;
