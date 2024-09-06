import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Virtual } from 'swiper/modules';
import { EndpointManager, ENDPOINTS } from '@/config/endpoints';
import { fMakeThumbnailUrl } from '@/utils/formatContent';
import { isEmpty } from 'lodash';
import ArrowLeftIcon from '@/resources/icons/arrow-left.svg';
import ArrowRightIcon from '@/resources/icons/arrow-right.svg';
import styles from '@/styles/components/Genres.module.scss';
import vhStyles from '@/styles/components/VideosHorizontal.module.scss';

/**
 * TODO:
 * - 정적 이미지 생성
 */

const Genres = ({ children, content }) => {
  const [genres, setGenres] = useState([]);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const swiperRef = useRef(null);
  // 장르 스와이퍼 설정
  const swiperConfig = {
    modules: [Navigation, Virtual],
    virtual: true,
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
    onSwiper: (swiper) => {
      swiperRef.current = swiper;
      setIsBeginning(swiper.isBeginning);
      setIsEnd(swiper.isEnd);
    },
    onSlideChange: (swiper) => {
      setIsBeginning(swiper.isBeginning);
      setIsEnd(swiper.isEnd);
    },
    onInit: (swiper) => {
      swiper.update(); // 초기화 시 업데이트
    },
  };

  // 장르 데이터 설정
  useEffect(() => {
    if (!content) return;
    setGenres(content);
  }, [content]);

  if (isEmpty(genres)) return null;

  return (
    <section className={vhStyles.horizontal__videos__section}>
      {children}
      <div className={vhStyles.horizontal__videos__wrapper}>
        <Swiper className={vhStyles.horizontal__videos} {...swiperConfig}>
          {genres.map((genre, index) => (
            <SwiperSlide
              className={vhStyles.horizontal__video__item}
              key={genre.id}
              virtualIndex={index}
            >
              <Link
                href={EndpointManager.generateUrl(ENDPOINTS.GENRE, {
                  genreId: genre.id,
                })}
                state={{ name: genre.name }}
                className={styles.genre__video__link}
                aria-label={genre.name}
              >
                <picture className={styles.genre__thumbnail__wrapper}>
                  <Image
                    className={styles.genre__thumbnail__image}
                    src={fMakeThumbnailUrl(genre.image)}
                    alt={genre.name}
                    sizes="(max-width: 768px) 100%, (max-width: 1200px) 100%"
                    fill
                    placeholder="blur"
                    blurDataURL={fMakeThumbnailUrl(genre.image)}
                  />
                </picture>
                <h5 className={styles.genre__video__title}>#{genre.name}</h5>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
        <button
          type="button"
          className={`${vhStyles.horizontal__prev__button} ${vhStyles.genre}`}
          onClick={() => swiperRef.current.slidePrev()}
          disabled={isBeginning}
        >
          <ArrowLeftIcon width={28} height={28} />
        </button>
        <button
          type="button"
          className={`${vhStyles.horizontal__next__button} ${vhStyles.genre}`}
          onClick={() => swiperRef.current.slideNext()}
          disabled={isEnd}
        >
          <ArrowRightIcon width={28} height={28} />
        </button>
      </div>
    </section>
  );
};

export default Genres;
