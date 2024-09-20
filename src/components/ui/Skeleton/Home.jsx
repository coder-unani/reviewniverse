'use client';

import React, { useState, useEffect } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import styles from '@/styles/components/SkeletonHome.module.scss';
import homeStyles from '@/styles/pages/Home.module.scss';
import vpStyles from '@/styles/components/VideosPreview.module.scss';
import vvStyles from '@/styles/components/VideosVertical.module.scss';

/**
 * TODO:
 * - next.js loading.js 사용하기
 */

const SkeletonHome = () => {
  const [previewCount, setPreviewCount] = useState(4);
  const [videoCount, setVideoCount] = useState(20);

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
      setPreviewCount(2);
      setVideoCount(6);
    } else if (width < 1024) {
      setVideoCount(8);
    } else if (width < 1281) {
      setPreviewCount(3);
      setVideoCount(10);
    } else {
      setPreviewCount(4);
    }
  };

  return (
    <SkeletonTheme baseColor="#12222b" highlightColor="#263d4b">
      <main className={homeStyles.home__main}>
        <section className={homeStyles.home__preview__section}>
          <section className={vpStyles.preview__info__section}>
            <div className={styles.preview__info__wrapper}>
              <div className={styles.preview__title__wrapper}>
                <div>
                  <Skeleton className={styles.preview__title__og} />
                  <Skeleton className={styles.preview__title__kr} />
                </div>
              </div>
            </div>
          </section>
          <section className={vpStyles.preview__thumbnails__section}>
            <div className={styles.preview__thumbnails__wrapper}>
              <div className={styles.preview__thumbnails}>
                {new Array(previewCount).fill(0).map((_, index) => (
                  <div className={vpStyles.preview__thumbnail__item} key={index}>
                    <div className={vpStyles.preview__thumbnail__link}>
                      <Skeleton className={styles.preview__thumbnail} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </section>
        <section className={homeStyles.home__main__section}>
          <section className={vvStyles.vertical__videos__section}>
            <div className={styles.vertical__title__wrapper}>
              <Skeleton className={styles.vertical__title} />
            </div>
            <div className={vvStyles.vertical__videos__wrapper}>
              {new Array(videoCount).fill(0).map((_, index) => (
                <article key={index} className={styles.default__video__item}>
                  <div className={styles.default__thumbnail__container}>
                    <Skeleton className={styles.default__thumbnail} />
                  </div>
                  <div className={styles.default__info__container}>
                    <Skeleton className={styles.default__title} />
                    <div className={styles.default__subtitle__wrapper}>
                      <Skeleton className={styles.default__subtitle} />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </section>
      </main>
    </SkeletonTheme>
  );
};

export default SkeletonHome;
