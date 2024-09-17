'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
// import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import { cLog } from '@/utils/test';
import { isEmpty } from 'lodash';
import { EndpointManager, ENDPOINTS } from '@/config/endpoints';
import { fYear } from '@/utils/format';
import { fThumbnail, fCountry, fRatingColor, fRatingText } from '@/utils/formatContent';
import styles from '@/styles/components/VideosVertical.module.scss';
import defStyles from '@/styles/components/VideoItem.module.scss';

// const VideoItem = dynamic(() => import('@/components/ui/VideoItem'), { ssr: false });

const VideosVertical = ({ children, videos, handlePage }) => {
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  useEffect(() => {
    if (videos.data && videos.total <= videos.data.length) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }
  }, [videos]);

  const lastItemRef = useCallback(
    (node) => {
      if (!hasMore) {
        cLog('마지막 페이지입니다.');
        return;
      }
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          handlePage(videos.page + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [hasMore, videos]
  );

  if (isEmpty(videos.data)) {
    return;
  }

  return (
    <section className={styles.vertical__videos__section}>
      {children}
      <div className={styles.vertical__videos__wrapper}>
        {videos.data.map((video, index) => (
          <Link
            href={EndpointManager.generateUrl(ENDPOINTS.VIDEO_DETAIL, { videoId: video.id })}
            className={defStyles.default__video__item}
            aria-label={video.title}
            key={video.id}
          >
            <div className={defStyles.default__thumbnail__container}>
              <picture className={defStyles.default__thumbnail__wrapper}>
                <Image
                  className={defStyles.default__thumbnail}
                  src={fThumbnail(video.thumbnail)}
                  alt={video.title}
                  width={254}
                  height={382}
                  quality={100}
                  priority={index < 15}
                  {...(index >= 15 && { loading: 'lazy' })}
                  // placeholder="blur"
                  // blurDataURL={base64}
                />
              </picture>
              <div className={defStyles.default__code__wrapper}>
                <div className={defStyles.default__code}>{video.code_string}</div>
              </div>
            </div>
            <div className={defStyles.default__info__container}>
              <p className={defStyles.default__title}>{video.title}</p>
              <div className={defStyles.default__subtitle__wrapper}>
                <div className={defStyles.default__subtitle}>
                  <span>{fYear(video.release)}</span>
                  {video.country && (
                    <>
                      <span>|</span>
                      <span>{fCountry(video.country)}</span>
                    </>
                  )}
                </div>
                <div className={defStyles.default__rating__wrapper} data-color={fRatingColor(video.rating)}>
                  <div className={defStyles.default__rating__square}></div>
                  <span className={defStyles.default__rating}>{fRatingText(video.rating)}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
        {hasMore && <article ref={lastItemRef}></article>}
      </div>
    </section>
  );
};

export default VideosVertical;
