'use client';

import React, { useState, useEffect, useRef } from 'react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';

import { DEFAULT_IMAGES } from '@/config/constants';

const GenresVertical = ({ uniqueId }) => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const swiperRef = useRef(null);

  useEffect(() => {
    const genreSwiper = document.querySelector(`.swiper[data-swiper-id="${uniqueId}"]`);
    const prevButton = document.querySelector(`.swiper-prev-button[data-swiper-id="${uniqueId}"]`);
    const nextButton = document.querySelector(`.swiper-next-button[data-swiper-id="${uniqueId}"]`);

    if (genreSwiper) {
      // 스와이퍼 설정
      const genreSwiperConfig = {
        modules: [Navigation],
        spaceBetween: 8,
        slidesPerView: 3.5,
        slidesPerGroup: 3,
        speed: 1000,
        allowTouchMove: true,
        breakpoints: {
          577: {
            slidesPerView: 4,
            slidesPerGroup: 4,
            allowTouchMove: false,
          },
          769: {
            spaceBetween: 10,
            slidesPerView: 5,
            slidesPerGroup: 5,
            allowTouchMove: false,
          },
          1025: {
            spaceBetween: 12,
            slidesPerView: 6,
            slidesPerGroup: 6,
            allowTouchMove: false,
          },
          1281: {
            spaceBetween: 12,
            slidesPerView: 7,
            slidesPerGroup: 7,
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

      const genreSwiperInstance = new SwiperCore(genreSwiper, genreSwiperConfig);
      swiperRef.current = genreSwiperInstance;

      const genreSwiperSlide = document.querySelectorAll(`.swiper[data-swiper-id="${uniqueId}"] .swiper-slide`);
      genreSwiperSlide.forEach((slide) => {
        slide.classList.remove('genre-margin-right');
      });

      // 이미지에 대한 onError 처리
      const images = document.querySelectorAll(`.swiper[data-swiper-id="${uniqueId}"] img`);
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            const testImage = new Image();
            testImage.src = img.src;

            testImage.onerror = () => {
              img.src = DEFAULT_IMAGES.noImage; // 대체 이미지로 변경
            };

            observer.unobserve(img); // 감지 후 감시 중단
          }
        });
      });

      images.forEach((img) => observer.observe(img));

      return () => {
        images.forEach((img) => observer.unobserve(img)); // 컴포넌트 언마운트 시 관찰 해제
      };
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

  return null;
};

export default GenresVertical;
