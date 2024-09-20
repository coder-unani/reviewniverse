import React from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { nanoid } from 'nanoid';
import { isEmpty } from 'lodash';

import { fMakeThumbnailUrl, fMakeImageUrl } from '@/utils/formatContent';

import ArrowLeftIcon from '@/resources/icons/arrow-left.svg';
import ArrowRightIcon from '@/resources/icons/arrow-right.svg';
import styles from '@/styles/pages/Contents.module.scss';

const VideoGallerySwiper = dynamic(() => import('@/components/ui/Swiper/VideoGallery'), { ssr: false });

const VideoGallery = React.memo(({ gallery, title, alt }) => {
  if (isEmpty(gallery)) {
    return null;
  }

  const uniqueId = nanoid();

  return (
    <>
      <section className={styles.detail__gallery__section}>
        <h4 className={styles.detail__main__title}>{title}</h4>
        <article className={styles.detail__gallery__wrapper}>
          <div className={`swiper ${styles.detail__gallery}`} data-swiper-id={uniqueId}>
            <div className="swiper-wrapper">
              {gallery.map((image, index) => (
                <div
                  className={`swiper-slide gallery-margin-right ${styles.detail__gallery__item}`}
                  data-url={fMakeImageUrl(image)}
                  data-index={index}
                  key={index}
                >
                  <picture className={styles.detail__photo__wrapper}>
                    <Image
                      className={styles.detail__photo}
                      src={fMakeThumbnailUrl(image)}
                      alt={alt}
                      width={323}
                      height={181}
                      loading="lazy"
                    />
                  </picture>
                </div>
              ))}
            </div>
          </div>
          <button
            type="button"
            className={`swiper-prev-button ${styles.gallery__prev__button}`}
            data-swiper-id={uniqueId}
            disabled // 초기 비활성화
          >
            <ArrowLeftIcon width={28} height={28} />
          </button>
          <button
            type="button"
            className={`swiper-next-button ${styles.gallery__next__button}`}
            data-swiper-id={uniqueId}
          >
            <ArrowRightIcon width={28} height={28} />
          </button>
        </article>
      </section>

      <VideoGallerySwiper uniqueId={uniqueId} gallery={gallery} alt={alt} />
    </>
  );
});

export default VideoGallery;
