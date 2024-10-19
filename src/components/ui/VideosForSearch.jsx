'use client';

import React, { useRef, useCallback } from 'react';
import { isEmpty } from 'lodash';

import Video from '@/components/ui/Video';

import styles from '@/styles/components/Videos.module.scss';

const VideosForSearch = ({ videos, handlePage, pageSize, referrer = null, referrerKey = null }) => {
  const hasMore = videos.count === pageSize;
  const observer = useRef();

  const lastItemRef = useCallback(
    (node) => {
      if (!hasMore) {
        if (observer.current) observer.current.disconnect(); // 관찰 중지
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
    [hasMore, videos, handlePage]
  );

  if (isEmpty(videos.data)) return null;

  return (
    <section className={styles.vertical__videos__section}>
      <div className={styles.vertical__videos__wrapper}>
        {videos.data.map((video) => (
          <Video video={video} isClient referrer={referrer} referrerKey={referrerKey} key={video.id} />
        ))}
        {hasMore && <article ref={lastItemRef} />}
      </div>
    </section>
  );
};

export default VideosForSearch;
