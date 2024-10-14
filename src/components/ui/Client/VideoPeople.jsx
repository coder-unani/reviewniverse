'use client';

import { useState, useEffect, useRef } from 'react';
import SwiperCore from 'swiper';
import { Grid, Navigation } from 'swiper/modules';

const VideoPeople = ({ uniqueId }) => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const swiperRef = useRef(null);

  useEffect(() => {
    const peopleSwiper = document.querySelector(`.swiper[data-swiper-id="${uniqueId}"]`);
    const prevButton = document.querySelector(`.swiper-prev-button[data-swiper-id="${uniqueId}"]`);
    const nextButton = document.querySelector(`.swiper-next-button[data-swiper-id="${uniqueId}"]`);

    if (peopleSwiper) {
      // 스와이퍼 설정
      const peopleSwiperConfig = {
        modules: [Grid, Navigation],
        slidesPerView: 1,
        slidesPerGroup: 1,
        speed: 1000,
        grid: { rows: 2, fill: 'column' },
        allowTouchMove: true,
        breakpoints: {
          577: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            grid: { rows: 2, fill: 'column' },
            allowTouchMove: false,
          },
          1025: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            grid: { rows: 2, fill: 'column' },
            allowTouchMove: false,
          },
          1281: {
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

      const peopleSwiperInstance = new SwiperCore(peopleSwiper, peopleSwiperConfig);
      swiperRef.current = peopleSwiperInstance;

      const peopleSwiperWrapper = document.querySelector(`.swiper[data-swiper-id="${uniqueId}"] .swiper-wrapper`);
      peopleSwiperWrapper.classList.remove('people-template');
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

export default VideoPeople;
