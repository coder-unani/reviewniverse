'use client';

import React, { useRef, useCallback } from 'react';
import { isEmpty } from 'lodash';

import { cLog } from '@/utils/test';
import VideoForUpcoming from '@/components/ui/VideoForUpcoming';

const VideosForUpcoming = ({ videos, handlePage, pageSize }) => {
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
    <>
      {videos.data.map((video) => (
        <VideoForUpcoming video={video} isClient={true} key={video.id} />
      ))}
      {hasMore && <article ref={lastItemRef}></article>}
    </>
  );
};

export default VideosForUpcoming;
