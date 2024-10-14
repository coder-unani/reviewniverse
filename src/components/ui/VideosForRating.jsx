import React, { useRef, useCallback } from 'react';
import { isEmpty } from 'lodash';

import VideoForRating from '@/components/ui/VideoForRating';

import vvStyles from '@/styles/components/Videos.module.scss';

const VideosForRating = ({ children, videos, handlePage }) => {
  const hasMore = videos.data && videos.total > videos.data.length;
  const observer = useRef();

  const lastItemRef = useCallback(
    (node) => {
      if (!hasMore) {
        if (observer.current) observer.current.disconnect();
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
    <section className={vvStyles.vertical__videos__section}>
      {children}
      <div className={vvStyles.vertical__videos__wrapper}>
        {videos.data.map((video) => (
          <VideoForRating video={video} key={video.id} />
        ))}
        {hasMore && <article ref={lastItemRef} />}
      </div>
    </section>
  );
};

export default VideosForRating;
