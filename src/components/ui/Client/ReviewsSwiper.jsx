'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';

import { EndpointManager, ENDPOINTS } from '@/config/endpoints';
import { fReplaceImageOnError } from '@/utils/formatContent';

const ReviewsSwiper = ({ uniqueId }) => {
  const router = useRouter();
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const swiperRef = useRef(null);

  useEffect(() => {
    const reviewSwiper = document.querySelector(`.swiper[data-swiper-id="${uniqueId}"]`);
    const prevButton = document.querySelector(`.swiper-prev-button[data-swiper-id="${uniqueId}"]`);
    const nextButton = document.querySelector(`.swiper-next-button[data-swiper-id="${uniqueId}"]`);

    if (!reviewSwiper) return undefined;

    // 스와이퍼 설정
    const reviewSwiperConfig = {
      modules: [Navigation],
      spaceBetween: 8,
      slidesPerView: 1.1,
      slidesPerGroup: 1,
      speed: 1000,
      allowTouchMove: true,
      breakpoints: {
        577: {
          spaceBetween: 8,
          slidesPerView: 1.1,
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

    const reviewSwiperInstance = new SwiperCore(reviewSwiper, reviewSwiperConfig);
    swiperRef.current = reviewSwiperInstance;

    // 슬라이드 클릭 이벤트
    const handleClick = (e) => {
      const target = e.target.closest('.swiper-slide');
      const { vId } = target.dataset;
      const path = EndpointManager.generateUrl(ENDPOINTS.CONTENTS_REVIEWS, { videoId: vId });
      router.push(path);
    };

    // 슬라이드 클릭 이벤트 등록
    const reviewSwiperSlide = document.querySelectorAll(`.swiper[data-swiper-id="${uniqueId}"] .swiper-slide`);
    reviewSwiperSlide.forEach((slide) => {
      slide.classList.remove('review-margin-right');
      slide.addEventListener('click', handleClick);
    });

    // 이미지에 대한 onError 처리
    const cleanUpImage = fReplaceImageOnError(`.swiper[data-swiper-id="${uniqueId}"] img`);

    // clean up
    return () => {
      reviewSwiperInstance?.destroy();
      cleanUpImage?.();
      reviewSwiperSlide.forEach((slide) => {
        slide.removeEventListener('click', handleClick);
      });
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
