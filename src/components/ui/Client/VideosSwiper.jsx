'use client';

import { useState, useEffect, useRef } from 'react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';

const VideosSwiper = ({ uniqueId }) => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const swiperRef = useRef(null);

  useEffect(() => {
    const horizontalSwiper = document.querySelector(`.swiper[data-swiper-id="${uniqueId}"]`);
    const prevButton = document.querySelector(`.swiper-prev-button[data-swiper-id="${uniqueId}"]`);
    const nextButton = document.querySelector(`.swiper-next-button[data-swiper-id="${uniqueId}"]`);

    if (horizontalSwiper) {
      // 스와이퍼 설정
      const horizontalSwiperConfig = {
        modules: [Navigation],
        spaceBetween: 8,
        slidesPerView: 3,
        slidesPerGroup: 3,
        speed: 1000,
        allowTouchMove: true, // 모바일시 터치 이동 허용
        breakpoints: {
          577: {
            spaceBetween: 8,
            slidesPerView: 3,
            slidesPerGroup: 3,
            allowTouchMove: false,
          },
          769: {
            spaceBetween: 10,
            slidesPerView: 4,
            slidesPerGroup: 4,
            allowTouchMove: false,
          },
          1025: {
            spaceBetween: 12,
            slidesPerView: 5,
            slidesPerGroup: 5,
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

      const horizontalSwiperInstance = new SwiperCore(horizontalSwiper, horizontalSwiperConfig);
      swiperRef.current = horizontalSwiperInstance;

      const horizontalSwiperSlide = document.querySelectorAll(`.swiper[data-swiper-id="${uniqueId}"] .swiper-slide`);
      horizontalSwiperSlide.forEach((slide) => {
        slide.classList.remove('horizontal-margin-right');
      });
    }
  }, [uniqueId]);

  useEffect(() => {
    const prevButton = document.querySelector(`.swiper-prev-button[data-swiper-id="${uniqueId}"]`);
    const nextButton = document.querySelector(`.swiper-next-button[data-swiper-id="${uniqueId}"]`);

    if (prevButton) prevButton.disabled = isBeginning;
    if (nextButton) nextButton.disabled = isEnd;
  }, [isBeginning, isEnd, uniqueId]);

  return null;
};

export default VideosSwiper;
