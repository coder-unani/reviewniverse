'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import SwiperCore from 'swiper';
import { Thumbs, Autoplay, Parallax, EffectFade } from 'swiper/modules';

import { fParseInt } from '@/utils/format';
import { fThumbnail } from '@/utils/formatContent';
import { useThemeContext } from '@/contexts/ThemeContext';

// TODO: 스와이퍼 클릭 이동 오류 수정

const VideosPreview = () => {
  const router = useRouter();
  const { isMobile } = useThemeContext();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const isDraggingRef = useRef(false);
  const activeThumbIndexRef = useRef(0);

  useEffect(() => {
    // 썸네일 슬라이더 설정
    const thumbSwiperElement = document.querySelector('.thumb-swiper');
    if (thumbSwiperElement) {
      const thumbSwiperConfig = {
        modules: [Thumbs],
        slidesPerView: 'auto',
        speed: 1500,
        loop: true,
        watchSlidesProgress: true,
        allowTouchMove: true,
        grabCursor: true,
      };

      const thumbSwiperInstance = new SwiperCore(thumbSwiperElement, thumbSwiperConfig);
      setThumbsSwiper(thumbSwiperInstance);

      thumbSwiperInstance.on('touchMove', () => {
        isDraggingRef.current = true;
      });

      thumbSwiperInstance.on('touchEnd', () => {
        isDraggingRef.current = false;
      });
    }

    // 모바일시 배경 이미지 포스터로 변경
    const previewBackgroundImage = document.querySelectorAll('.preview-background-image');
    previewBackgroundImage.forEach((image) => {
      if (!isMobile) return;
      const imageUrl = image.dataset.url;
      image.style.backgroundImage = `url(${fThumbnail(imageUrl, false)})`;
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
      };

      const mainSwiperInstance = new SwiperCore(mainSwiperElement, mainSwiperConfig);

      mainSwiperInstance.on('slideChange', (swiper) => {
        activeThumbIndexRef.current = swiper.realIndex;

        // 모바일에서 활성화된 슬라이드가 썸네일 슬라이더의 맨 앞으로 오도록 설정
        if (!thumbsSwiper || !isMobile) {
          return;
        }
        thumbsSwiper.slideToLoop(swiper.realIndex, 1000, false);
      });
    }
  }, [thumbsSwiper, isMobile]);

  useEffect(() => {
    const handleLink = (e) => {
      e.preventDefault();

      const target = e.currentTarget;
      const path = target.getAttribute('href');
      const index = fParseInt(target.dataset.index);

      // 스크롤 중이 아니고 활성화된 썸네일 클릭 시 페이지 이동
      if (!isDraggingRef.current && index === activeThumbIndexRef.current) {
        router.push(path);
      }
    };

    // .thumb-swiper 안의 .swiper-slide a 요소에 onClick, onTouchEnd 이벤트 추가
    const thumbSlidesLink = document.querySelectorAll('.thumb-swiper .swiper-slide a[href]');
    thumbSlidesLink.forEach((slide) => {
      // 썸네일 클릭 시 해당 슬라이드로 이동 후 다시 클릭 시 페이지 이동
      slide.addEventListener('click', handleLink);

      // 썸네일 클릭 시 해당 슬라이드로 이동 후 다시 클릭 시 페이지 이동
      // 모바일에서는 클릭 이벤트가 발생하지 않아 터치 이벤트로 대체
      slide.addEventListener('touchend', handleLink);
    });

    return () => {
      thumbSlidesLink.forEach((slide) => {
        slide.removeEventListener('click', handleLink);
        slide.removeEventListener('touchend', handleLink);
      });
    };
  }, []);

  return null;
};

export default VideosPreview;
