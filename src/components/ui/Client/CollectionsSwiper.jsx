'use client';

import { useState, useEffect, useRef } from 'react';
import SwiperCore from 'swiper';
import { Grid, Navigation } from 'swiper/modules';

const CollectionsSwiper = ({ uniqueId }) => {
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
        modules: [Grid, Navigation],
        spaceBetween: 16,
        slidesPerView: 1.1,
        slidesPerGroup: 1,
        speed: 1000,
        grid: { rows: 2, fill: 'column' },
        allowTouchMove: true, // 모바일시 터치 이동 허용
        breakpoints: {
          577: {
            spaceBetween: 16,
            slidesPerView: 1.1,
            slidesPerGroup: 1,
            grid: { rows: 2, fill: 'column' },
            allowTouchMove: false,
          },
          769: {
            spaceBetween: 18,
            slidesPerView: 3,
            slidesPerGroup: 3,
            grid: { rows: 2, fill: 'column' },
            allowTouchMove: false,
          },
          1025: {
            spaceBetween: 20,
            slidesPerView: 4,
            slidesPerGroup: 4,
            grid: { rows: 2, fill: 'column' },
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

      const collectionSwiperWrapper = document.querySelector(`.swiper[data-swiper-id="${uniqueId}"] .swiper-wrapper`);
      collectionSwiperWrapper.classList.remove('collection-template');
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

export default CollectionsSwiper;
