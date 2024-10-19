'use client';

import React, { useRef, useCallback } from 'react';
import { isEmpty } from 'lodash';

import Video from '@/components/ui/Video';

const Videos = ({ videos, handlePage, pageSize, referrer = null, referrerKey = null }) => {
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
    <>
      {videos.data.map((video) => (
        <Video video={video} isClient referrer={referrer} referrerKey={referrerKey} key={video.id} />
      ))}
      {hasMore && <article ref={lastItemRef} />}
    </>
  );
};

export default Videos;
