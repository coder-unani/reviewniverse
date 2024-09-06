import React, { useState, useEffect, useRef } from 'react';
import VideoItem from '@/components/ui/VideoItem';
import VideoRankItem from '@/components/ui/VideoRankItem';
import VideoComingItem from '@/components/ui/VideoComingItem';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Virtual } from 'swiper/modules';
import { isEmpty } from 'lodash';
import ArrowLeftIcon from '@/resources/icons/arrow-left.svg';
import ArrowRightIcon from '@/resources/icons/arrow-right.svg';
import styles from '@/styles/components/VideosHorizontal.module.scss';

const VideosHorizontal = ({ children, content, template = 'default' }) => {
  const [videos, setVideos] = useState([]);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const swiperRef = useRef(null);
  // 스와이퍼 설정
  const swiperConfig = {
    modules: [Navigation, Virtual],
    virtual: true, // 성능 최적화를 위한 가상 슬라이드
    spaceBetween: 8,
    slidesPerView: 3,
    slidesPerGroup: 3,
    speed: 1000,
    allowTouchMove: true, // 모바일시 터치 이동 허용
    breakpoints: {
      577: {
        slidesPerView: 3,
        allowTouchMove: false,
      },
      769: {
        spaceBetween: 10,
        slidesPerView: 4,
        slidesPerGroup: 4,
        allowTouchMove: false,
      },
      1025: {
        spaceBetween: 12,
        slidesPerView: 5,
        slidesPerGroup: 5,
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

  // 비디오 데이터 설정
  useEffect(() => {
    if (!content) return;
    setVideos(content);
  }, [content]);

  // 비디오 리스트 렌더링
  const renderVideos = () => {
    if (isEmpty(videos)) return null;

    // 스와이퍼 이전 버튼 클릭
    const handlePrevClick = () => {
      swiperRef.current.slidePrev();
    };

    // 스와이퍼 다음 버튼 클릭
    const handleNextClick = () => {
      swiperRef.current.slideNext();
    };

    // 기본 비디오 아이템 렌더링
    const renderDefaultItem = () => {
      return videos.map((video, index) => (
        <SwiperSlide
          className={styles.horizontal__video__item}
          key={video.id}
          virtualIndex={index}
        >
          <VideoItem video={video} index={index} />
        </SwiperSlide>
      ));
    };

    // 랭킹 비디오 아이템 렌더링
    const renderRankItem = () => {
      return videos.map((video, index) => (
        <SwiperSlide
          className={styles.horizontal__video__item}
          key={video.id}
          virtualIndex={index}
        >
          <VideoRankItem video={video} index={index} />
        </SwiperSlide>
      ));
    };

    // 커밍순 아이템 렌더링
    const renderComingItem = () => {
      return videos.map((video, index) => (
        <SwiperSlide
          className={styles.horizontal__video__item}
          key={video.id}
          virtualIndex={index}
        >
          <VideoComingItem video={video} index={index} />
        </SwiperSlide>
      ));
    };

    // 템플릿에 따른 비디오 아이템 렌더링
    const switchTemplate = () => {
      switch (template) {
        case 'default':
          return renderDefaultItem();
        case 'rank':
          return renderRankItem();
        case 'coming':
          return renderComingItem();
        default:
          return renderDefaultItem();
      }
    };

    return (
      <section className={styles.horizontal__videos__section}>
        {children}
        <div className={`${styles.horizontal__videos__wrapper} ${template}`}>
          <Swiper className={styles.horizontal__videos} {...swiperConfig}>
            {switchTemplate()}
          </Swiper>
          <button
            type="button"
            className={styles.horizontal__prev__button}
            onClick={handlePrevClick}
            disabled={isBeginning}
          >
            <ArrowLeftIcon width={28} height={28} />
          </button>
          <button
            type="button"
            className={styles.horizontal__next__button}
            onClick={handleNextClick}
            disabled={isEnd}
          >
            <ArrowRightIcon width={28} height={28} />
          </button>
        </div>
      </section>
    );
  };

  return renderVideos();
};

export default VideosHorizontal;
