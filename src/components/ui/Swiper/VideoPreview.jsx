'use client';

import React, { useState, useEffect } from 'react';
import { useThemeContext } from '@/contexts/ThemeContext';
import SwiperCore from 'swiper';
import { Thumbs, Autoplay, Parallax, EffectFade } from 'swiper/modules';
import 'swiper/css';

export default function ClientSideSwiper() {
  const { isMobile } = useThemeContext();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeThumbIndex, setActiveThumbIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    // 썸네일 슬라이더 설정
    const thumbSwiperElement = document.querySelector('.thumb-swiper');
    if (thumbSwiperElement) {
      const thumbSwiperConfig = {
        modules: [Thumbs],
        spaceBetween: 10,
        slidesPerView: 'auto',
        speed: 1500,
        loop: true,
        watchSlidesProgress: true,
        allowTouchMove: true,
        grabCursor: true,
        breakpoints: {
          577: {
            spaceBetween: 12,
          },
          769: {
            spaceBetween: 18,
          },
          1281: {
            spaceBetween: 24,
          },
        },
        onTouchMove: () => {
          setIsDragging(true);
        },
        onTouchEnd: () => {
          setIsDragging(false);
        },
      };
      // Swiper 인스턴스를 직접 state로 설정
      const thumbSwiperInstance = new SwiperCore(thumbSwiperElement, thumbSwiperConfig);
      setThumbsSwiper(thumbSwiperInstance);
    }

    const thumbSwiperSlide = document.querySelectorAll('.thumb-swiper .swiper-slide');
    thumbSwiperSlide.forEach((slide, index) => {
      slide.classList.remove('preview-margin-right');
    });
  }, []);

  useEffect(() => {
    if (!thumbsSwiper) {
      return;
    }
    // 메인 슬라이더 설정
    const mainSwiperElement = document.querySelector('.main-swiper');
    if (mainSwiperElement) {
      const mainSwiperConfig = {
        modules: [Thumbs, Autoplay, Parallax, EffectFade],
        thumbs: { swiper: thumbsSwiper }, // 썸네일 슬라이더와 연결
        slidesPerView: 'auto',
        speed: 1000,
        autoplay: {
          delay: 6000,
          disableOnInteraction: false,
        },
        effect: 'fade',
        parallax: true,
        loop: true,
        onSlideChange: (swiper) => {
          setActiveThumbIndex(swiper.realIndex);

          // 모바일에서 활성화된 슬라이드가 썸네일 슬라이더의 맨 앞으로 오도록 설정
          if (!thumbsSwiper || !isMobile) {
            return;
          }
          thumbsSwiper.slideToLoop(swiper.realIndex, 1000, false);
        },
      };
      new SwiperCore(mainSwiperElement, mainSwiperConfig);
    }
  }, [thumbsSwiper, isMobile]);

  return null;
}
