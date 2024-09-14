import React from 'react';
import { fMakeThumbnailUrl, fMakeImageUrl } from '@/utils/formatContent';
import { isEmpty } from 'lodash';
import ArrowLeftIcon from '@/resources/icons/arrow-left.svg';
import ArrowRightIcon from '@/resources/icons/arrow-right.svg';
import styles from '@/styles/pages/Contents.module.scss';

const VideoSectionGallery = React.memo(({ gallery, title }) => {
  if (isEmpty(gallery)) {
    return null;
  }

  return (
    <section className={styles.detail__gallery__section}>
      <h4 className={styles.detail__main__title}>{title}</h4>
      <article className={styles.detail__gallery__wrapper}>
        <div className={`swiper ${styles.detail__gallery}`}>
          <div className="swiper-wrapper">
            {gallery.map((image, index) => (
              <div
                className={`swiper-slide ${styles.detail__gallery__item}`}
                key={index}
                // onClick={() => togglePhotoModal(image)}
              >
                <picture className={styles.detail__photo__wrapper}>
                  <img
                    className={styles.detail__photo}
                    src={fMakeThumbnailUrl(image)}
                    srcSet={fMakeThumbnailUrl(image)}
                    alt="갤러리 이미지"
                  />
                </picture>
              </div>
            ))}
          </div>
        </div>
        <button
          type="button"
          className={styles.gallery__prev__button}
          // onClick={() => swiperRef.current.slidePrev()}
          // disabled={isBeginning}
        >
          <ArrowLeftIcon width={28} height={28} />
        </button>
        <button
          type="button"
          className={styles.gallery__next__button}
          // onClick={() => swiperRef.current.slideNext()}
          // disabled={isEnd}
        >
          <ArrowRightIcon width={28} height={28} />
        </button>
      </article>
    </section>
  );
});

export default VideoSectionGallery;
