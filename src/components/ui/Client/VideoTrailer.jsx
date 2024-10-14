'use client';

import React, { useState, useEffect, useRef } from 'react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';

import { fParseInt } from '@/utils/format';
import TrailerModal from '@/components/ui/Modal/Trailer';

const VideoTrailer = ({ uniqueId, trailer, alt }) => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [trailerModal, setTrailerModal] = useState({ isOpen: false, initialIndex: 0 });
  const swiperRef = useRef(null);

  const toggleTrailerModal = (index) => {
    setTrailerModal({ isOpen: !trailerModal.isOpen, initialIndex: index });
  };

  useEffect(() => {
    const trailerSwiper = document.querySelector(`.swiper[data-swiper-id="${uniqueId}"]`);
    const prevButton = document.querySelector(`.swiper-prev-button[data-swiper-id="${uniqueId}"]`);
    const nextButton = document.querySelector(`.swiper-next-button[data-swiper-id="${uniqueId}"]`);

    if (trailerSwiper) {
      // 스와이퍼 설정
      const trailerSwiperConfig = {
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

      const trailerSwiperInstance = new SwiperCore(trailerSwiper, trailerSwiperConfig);
      swiperRef.current = trailerSwiperInstance;

      const trailerSwiperSlide = document.querySelectorAll(`.swiper[data-swiper-id="${uniqueId}"] .swiper-slide`);
      trailerSwiperSlide.forEach((slide) => {
        // 서버 컴포넌트 스타일을 위해 추가했던 클래스명 제거
        slide.classList.remove('gallery-margin-right');

        // 포토 모달 이벤트 추가
        slide.addEventListener('click', () => {
          const index = fParseInt(slide.dataset.index);
          toggleTrailerModal(index);
        });
      });
    }
  }, [uniqueId]);

  useEffect(() => {
    const prevButton = document.querySelector(`.swiper-prev-button[data-swiper-id="${uniqueId}"]`);
    const nextButton = document.querySelector(`.swiper-next-button[data-swiper-id="${uniqueId}"]`);

    if (prevButton) prevButton.disabled = isBeginning;
    if (nextButton) nextButton.disabled = isEnd;
  }, [isBeginning, isEnd, uniqueId]);

  return (
    <TrailerModal
      trailer={trailer}
      initialIndex={trailerModal.initialIndex}
      alt={alt}
      isOpen={trailerModal.isOpen}
      onClose={toggleTrailerModal}
    />
  );
};

export default VideoTrailer;
