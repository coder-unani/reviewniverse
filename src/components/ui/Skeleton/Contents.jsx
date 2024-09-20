'use client';

import React, { useState, useEffect } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import styles from '@/styles/components/SkeletonContents.module.scss';
import conStyles from '@/styles/pages/Contents.module.scss';

const SkeletonVideoDetail = () => {
  const [peopleCount, setPeopleCount] = useState(4);
  const [galleryCount, setGalleryCount] = useState(4);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleResize = () => {
    const width = window.innerWidth;

    if (width < 769) {
      setPeopleCount(2);
      setGalleryCount(2);
    } else if (width < 1024) {
      setPeopleCount(2);
      setGalleryCount(3);
    } else if (width < 1281) {
      setPeopleCount(3);
      setGalleryCount(3);
    } else {
      setPeopleCount(4);
      setGalleryCount(4);
    }
  };

  return (
    <SkeletonTheme baseColor="#12222b" highlightColor="#263d4b">
      <main className={conStyles.detail__main}>
        <section className={conStyles.detail__main__section}>
          <div className={conStyles.detail__main__info__container}>
            <div className={conStyles.detail__main__info__wrapper}>
              <article className={styles.detail__title__container}>
                <article className={conStyles.detail__title__wrapper}>
                  <Skeleton className={styles.detail__title__og} />
                  <Skeleton className={styles.detail__title__kr} />
                </article>
                <div className={conStyles.detail__genre__wrapper}>
                  {new Array(4).fill(0).map((_, index) => (
                    <Skeleton className={styles.detail__genre__link} key={index} />
                  ))}
                </div>
              </article>
            </div>
          </div>

          <div className={conStyles.detail__sub__info__container}>
            <div className={conStyles.detail__sub__info__wrapper}>
              {new Array(6).fill(0).map((_, index) => (
                <Skeleton className={styles.detail__sub__info__item} key={index} />
              ))}
            </div>
          </div>
        </section>

        <div className={conStyles.detail__sub__wrapper}>
          <section className={conStyles.detail__sub__section}>
            <section className={conStyles.detail__poster__section}>
              <div className={styles.detail__poster__wrapper}>
                <Skeleton className={styles.detail__poster} />
              </div>
            </section>

            <section className={conStyles.detail__synopsis__section}>
              <Skeleton className={styles.detail__main__title} />
              <div className={styles.detail__synopsis__wrapper}>
                {new Array(3).fill(0).map((_, index) => (
                  <Skeleton className={styles.detail__synopsis} key={index} />
                ))}
              </div>
            </section>

            <div className={conStyles.detail__more__wrapper}>
              <section className={conStyles.detail__my__rating__section}>
                <Skeleton className={styles.detail__main__title} />
                <Skeleton className={styles.rating__video} />
              </section>

              <section className={conStyles.detail__platform__section}>
                <Skeleton className={styles.detail__main__title} />
                <div className={conStyles.detail__platform__wrapper}>
                  {new Array(3).fill(0).map((_, index) => (
                    <Skeleton className={styles.detail__platform} key={index} />
                  ))}
                </div>
              </section>
            </div>
          </section>

          <section className={styles.detail__people__section}>
            <Skeleton className={styles.detail__main__title} />
            <article className={conStyles.detail__people__wrapper}>
              <div className={styles.detail__people}>
                {new Array(peopleCount).fill(0).map((_, index) => (
                  <div className={styles.detail__people__link} key={index}>
                    <div className="people__image__wrapper">
                      <Skeleton className={styles.people__image} />
                    </div>
                    <div className={styles.detail__people__info__wrapper}>
                      <Skeleton className={styles.detail__people__name} />
                      <Skeleton className={styles.detail__people__role} />
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </section>

          <section className={styles.detail__people__section}>
            <Skeleton className={styles.detail__main__title} />
            <article className={conStyles.detail__people__wrapper}>
              <div className={styles.detail__people}>
                {new Array(peopleCount).fill(0).map((_, index) => (
                  <div className={styles.detail__people__link} key={index}>
                    <div className="people__image__wrapper">
                      <Skeleton className={styles.people__image} />
                    </div>
                    <div className={styles.detail__people__info__wrapper}>
                      <Skeleton className={styles.detail__people__name} />
                      <Skeleton className={styles.detail__people__role} />
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </section>

          <section className={styles.detail__gallery__section}>
            <Skeleton className={styles.detail__main__title} />
            <article className={styles.detail__gallery__wrapper}>
              {new Array(galleryCount).fill(0).map((_, index) => (
                <div className={styles.detail__gallery__item} key={index}>
                  <Skeleton className={styles.detail__photo} />
                </div>
              ))}
            </article>
          </section>
        </div>
      </main>
    </SkeletonTheme>
  );
};

export default SkeletonVideoDetail;
