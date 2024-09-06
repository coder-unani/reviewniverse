'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import PhotoModal from '@/components/ui/Modal/Photo';
import { useVideoDetailContext } from '@/contexts/VideoDetailContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { fMakeThumbnailUrl, fMakeImageUrl } from '@/utils/formatContent';
import ArrowLeftIcon from '@/resources/icons/arrow-left.svg';
import ArrowRightIcon from '@/resources/icons/arrow-right.svg';

const SwiperGallery = () => {
  const { content } = useVideoDetailContext();
  const items = content.data.thumbnail;
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [photoModal, setPhotoModal] = useState({ isOpen: false, url: '' });
  const swiperRef = useRef(null);

  const gallerySwiperConfig = {
    spaceBetween: 10,
    slidesPerView: 2.01,
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
    onSwiper: (swiper) => {
      swiperRef.current = swiper;
      setIsBeginning(swiper.isBeginning);
      setIsEnd(swiper.isEnd);
    },
    onSlideChange: (swiper) => {
      setIsBeginning(swiper.isBeginning);
      setIsEnd(swiper.isEnd);
    },
  };

  const togglePhotoModal = (url = '') => {
    setPhotoModal({ isOpen: !photoModal.isOpen, url });
  };

  return (
    <>
      <article className="detail-gallery-wrapper">
        <Swiper className="detail-gallery" {...gallerySwiperConfig}>
          {items.map((image, index) => (
            <SwiperSlide
              className="detail-gallery-item"
              key={index}
              onClick={() => togglePhotoModal(image)}
            >
              <picture className="detail-photo-wrapper">
                <Image
                  className="detail-photo"
                  src={fMakeThumbnailUrl(image)}
                  alt="갤러리 이미지"
                  fill
                  placeholder="blur"
                  // effect="blur"
                />
              </picture>
            </SwiperSlide>
          ))}
        </Swiper>
        <button
          type="button"
          className="gallery-prev-button"
          onClick={() => swiperRef.current.slidePrev()}
          disabled={isBeginning}
        >
          <ArrowLeftIcon />
        </button>
        <button
          type="button"
          className="gallery-next-button"
          onClick={() => swiperRef.current.slideNext()}
          disabled={isEnd}
        >
          <ArrowRightIcon />
        </button>
      </article>

      {photoModal.isOpen && (
        <PhotoModal
          url={fMakeImageUrl(photoModal.url)}
          onClose={togglePhotoModal}
        />
      )}
    </>
  );
};

export default SwiperGallery;
