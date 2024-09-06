import React, { useState, useRef, useCallback, useEffect } from 'react';
import VideoItem from '@/components/ui/VideoItem';
import { cLog } from '@/utils/test';
import { isEmpty } from 'lodash';
import styles from '@/styles/components/VideosVertical.module.scss';

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
          <VideoItem key={index} video={video} />
        ))}
        {hasMore && <article ref={lastItemRef}></article>}
      </div>
    </section>
  );
};

export default VideosVertical;
