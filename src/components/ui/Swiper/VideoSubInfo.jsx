'use client';

import React, { useEffect, useRef } from 'react';
import SwiperCore from 'swiper';

const VideoSubInfo = ({ uniqueId }) => {
  const swiperRef = useRef(null);

  useEffect(() => {
    const subInfoSwiper = document.querySelector(`.swiper[data-swiper-id="${uniqueId}"]`);

    if (subInfoSwiper) {
      // 스와이퍼 설정
      const subInfoSwiperConfig = {
        // spaceBetween: 10,
        slidesPerView: 'auto',
        slidesPerGroup: 2,
        speed: 1000,
        allowTouchMove: true,
        // breakpoints: {
        //   769: {
        //     spaceBetween: 12,
        //   },
        // },
      };

      const subInfoSwiperInstance = new SwiperCore(subInfoSwiper, subInfoSwiperConfig);
      swiperRef.current = subInfoSwiperInstance;

      // const subInfoSwiperSlide = document.querySelectorAll(`.swiper[data-swiper-id="${uniqueId}"] .swiper-slide`);
      // subInfoSwiperSlide.forEach((slide) => {
      //   slide.classList.remove('sub-margin-right');
      // });
    }
  }, [uniqueId]);

  return null;
};

export default VideoSubInfo;
