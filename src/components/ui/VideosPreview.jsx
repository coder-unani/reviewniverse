import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useThemeContext } from '@/contexts/ThemeContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs, Autoplay, Parallax, EffectFade } from 'swiper/modules';
import { EndpointManager, ENDPOINTS } from '@/config/endpoints';
import { fDate } from '@/utils/format';
import {
  fThumbnail,
  fPreviewThumbnail,
  fBackgroundImage,
  fReleaseText,
} from '@/utils/formatContent';
import { isEmpty } from 'lodash';
import styles from '@/styles/components/VideosPreview.module.scss';

/**
 * TODO:
 * - 정적 이미지 생성
 * - 페이지네이션 표시?
 */

const VideosPreview = React.memo(({ videos }) => {
  const router = useRouter();
  const { isMobile } = useThemeContext();
  const [previewVideo, setPreviewVideo] = useState('');
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeThumbIndex, setActiveThumbIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // 메인 슬라이더 설정
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

  // 썸네일 슬라이더 설정
  const thumbSwiperConfig = {
    modules: [Thumbs],
    onSwiper: setThumbsSwiper, // 썸네일 슬라이더 인스턴스를 상태로 설정
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

  // 프리뷰 비디오 데이터 설정
  useEffect(() => {
    if (!videos) {
      return;
    }
    setPreviewVideo(videos.content.list);
  }, [videos]);

  // 썸네일 클릭 시 해당 슬라이드로 이동 후 다시 클릭 시 페이지 이동
  const handleLinkClick = (e, videoId, index) => {
    e.preventDefault();
    if (!isDragging && index === activeThumbIndex) {
      const path = EndpointManager.generateUrl(ENDPOINTS.VIDEO_DETAIL, {
        videoId,
      });
      router.push(path);
    }
  };

  // 썸네일 클릭 시 해당 슬라이드로 이동 후 다시 클릭 시 페이지 이동
  // 모바일에서는 클릭 이벤트가 발생하지 않아 터치 이벤트로 대체
  const handleLinkTouch = (e, videoId, index) => {
    e.preventDefault();
    if (!isDragging && index === activeThumbIndex) {
      const path = EndpointManager.generateUrl(ENDPOINTS.VIDEO_DETAIL, {
        videoId,
      });
      router.push(path);
    }
  };

  if (isEmpty(previewVideo)) {
    return null;
  }

  return (
    <>
      <Swiper className={styles.preview__videos} {...mainSwiperConfig}>
        {previewVideo.map((video) => (
          <SwiperSlide key={video.id}>
            <picture className={styles.preview__background__wrapper}>
              <div
                className={styles.preview__background__image}
                style={{
                  backgroundImage: `url(${
                    isMobile
                      ? fThumbnail(video.thumbnail, false)
                      : fPreviewThumbnail(video.thumbnail)
                  })`,
                }}
              />
            </picture>

            <section className={styles.preview__info__section}>
              <div className={styles.preview__info__wrapper}>
                <div className={styles.preview__title__wrapper}>
                  <div>
                    <p
                      className={styles.preview__title__og}
                      data-swiper-parallax="-150"
                    >
                      {video.title_og || video.title}
                    </p>
                    <h2
                      className={styles.preview__title__kr}
                      data-swiper-parallax="-250"
                    >
                      {video.title}
                    </h2>
                  </div>
                </div>
                <div className={styles.preview__release__wrapper}>
                  <div
                    className={styles.preview__release}
                    data-swiper-parallax="-200"
                  >
                    <span>{fReleaseText(video.code)}</span>
                    <span>|</span>
                    <span>{fDate(video.release)}</span>
                  </div>
                </div>
              </div>
            </section>
          </SwiperSlide>
        ))}
      </Swiper>

      <section className={styles.preview__thumbnails__section}>
        <div className={styles.preview__thumbnails__wrapper}>
          <Swiper className={styles.preview__thumbnails} {...thumbSwiperConfig}>
            {previewVideo.map((video, index) => (
              <SwiperSlide
                className={styles.preview__thumbnail__item}
                key={video.id}
              >
                <Link
                  href={EndpointManager.generateUrl(ENDPOINTS.VIDEO_DETAIL, {
                    videoId: video.id,
                  })}
                  className={styles.preview__thumbnail__link}
                  aria-label={video.title}
                  onClick={(e) => handleLinkClick(e, video.id, index)}
                  onTouchEnd={(e) => handleLinkTouch(e, video.id, index)}
                >
                  <picture className={styles.preview__thumbnail__wrapper}>
                    <Image
                      className={styles.preview__thumbnail}
                      src={fBackgroundImage(video.thumbnail, true)}
                      alt={video.title}
                      sizes="(max-width: 768px) 100%, (max-width: 1200px) 100%"
                      fill
                      priority
                    />
                  </picture>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  );
});

export default VideosPreview;
