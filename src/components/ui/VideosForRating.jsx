import React, { useState, useRef, useCallback, useEffect } from 'react';
import { isEmpty } from 'lodash';

import VideoForRating from '@/components/ui/VideoForRating';

import vvStyles from '@/styles/components/Videos.module.scss';

const VideosForRating = ({ children, videos, handlePage }) => {
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
      if (!hasMore) return;
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
    <section className={vvStyles.vertical__videos__section}>
      {children}
      <div className={vvStyles.vertical__videos__wrapper}>
        {videos.data.map((video, index) => (
          <VideoForRating key={index} video={video} />
        ))}
        {hasMore && <article ref={lastItemRef}></article>}
      </div>
    </section>
  );
};

export default VideosForRating;
