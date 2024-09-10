import React, { useState, useRef } from 'react';
import PhotoModal from '@/components/ui/Modal/Photo';
import { Swiper, SwiperSlide } from 'swiper/react';
import { fMakeThumbnailUrl, fMakeImageUrl } from '@/utils/formatContent';
import ArrowLeftIcon from '@/resources/icons/arrow-left.svg';
import ArrowRightIcon from '@/resources/icons/arrow-right.svg';
import styles from '@/styles/pages/Contents.module.scss';

const GalleryVertical = ({ content }) => {
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
      <article className={styles.detail__gallery__wrapper}>
        <Swiper className={styles.detail__gallery} {...gallerySwiperConfig}>
          {items.map((image, index) => (
            <SwiperSlide className={styles.detail__gallery__item} key={index} onClick={() => togglePhotoModal(image)}>
              <picture className={styles.detail__photo__wrapper}>
                <img
                  className={styles.detail__photo}
                  src={fMakeThumbnailUrl(image)}
                  srcSet={fMakeThumbnailUrl(image)}
                  alt="갤러리 이미지"
                />
              </picture>
            </SwiperSlide>
          ))}
        </Swiper>
        <button
          type="button"
          className={styles.gallery__prev__button}
          onClick={() => swiperRef.current.slidePrev()}
          disabled={isBeginning}
        >
          <ArrowLeftIcon width={28} height={28} />
        </button>
        <button
          type="button"
          className={styles.gallery__next__button}
          onClick={() => swiperRef.current.slideNext()}
          disabled={isEnd}
        >
          <ArrowRightIcon width={28} height={28} />
        </button>
      </article>

      {photoModal.isOpen && <PhotoModal url={fMakeImageUrl(photoModal.url)} onClose={togglePhotoModal} />}
    </>
  );
};

export default GalleryVertical;
