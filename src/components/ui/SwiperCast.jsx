'use client';

import React, { useState, useRef } from 'react';
import PeopleItem from '@/components/ui/PeopleItem';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid } from 'swiper/modules';
import ArrowLeftIcon from '@/resources/icons/arrow-left.svg';
import ArrowRightIcon from '@/resources/icons/arrow-right.svg';

const SwiperCast = ({ items, target, formatCode }) => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const swiperRef = useRef(null);

  const castSwiperConfig = {
    modules: [Grid],
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

  return (
    <article className="detail-cast-wrapper" data-length={items.length}>
      <Swiper className="detail-cast" {...castSwiperConfig}>
        {items.map((item, index) => (
          <SwiperSlide key={index}>
            <PeopleItem crew={item} target={target} formatCode={formatCode} />
          </SwiperSlide>
        ))}
      </Swiper>
      <button
        type="button"
        className="cast-prev-button"
        onClick={() => swiperRef.current.slidePrev()}
        disabled={isBeginning}
      >
        <ArrowLeftIcon />
      </button>
      <button
        type="button"
        className="cast-next-button"
        onClick={() => swiperRef.current.slideNext()}
        disabled={isEnd}
      >
        <ArrowRightIcon />
      </button>
    </article>
  );
};

export default SwiperCast;
