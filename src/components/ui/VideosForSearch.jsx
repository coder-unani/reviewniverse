'use client';

import React, { useRef, useCallback } from 'react';
import { isEmpty } from 'lodash';

import { cLog } from '@/utils/test';
import Video from '@/components/ui/Video';

import styles from '@/styles/components/Videos.module.scss';

const VideosForSearch = ({ videos, handlePage, pageSize }) => {
  const hasMore = videos.count === pageSize;
  const observer = useRef();

  const lastItemRef = useCallback(
    (node) => {
      if (!hasMore) {
        cLog('마지막 페이지입니다.');
        if (observer.current) observer.current.disconnect(); // 관찰 중지
        return;
      }
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            handlePage(videos.page + 1);
          }
        },
        { threshold: 0.5 } // 요소가 절반 이상 보일 때만 실행
      );

      if (node) observer.current.observe(node);
    },
    [hasMore, videos]
  );

  if (isEmpty(videos.data)) {
    return;
  }

  return (
    <section className={styles.vertical__videos__section}>
      <div className={styles.vertical__videos__wrapper}>
        {videos.data.map((video) => (
          <Video video={video} isClient={true} key={video.id} />
        ))}
        {hasMore && <article ref={lastItemRef}></article>}
      </div>
    </section>
  );
};

export default VideosForSearch;
