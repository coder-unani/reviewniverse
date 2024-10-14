'use client';

import React, { useRef, useCallback } from 'react';
import { isEmpty } from 'lodash';

import VideoForUpcoming from '@/components/ui/VideoForUpcoming';

const VideosForUpcoming = ({ videos, handlePage, pageSize }) => {
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
        <VideoForUpcoming video={video} isClient key={video.id} />
      ))}
      {hasMore && <article ref={lastItemRef} />}
    </>
  );
};

export default VideosForUpcoming;
