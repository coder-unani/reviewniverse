'use client';

import React, { useRef, useCallback } from 'react';
import { isEmpty } from 'lodash';

import Video from '@/components/ui/Video';
import VideoForLike from '@/components/ui/VideoForLike';
import VideoForRating from '@/components/ui/VideoForRating';
import VideoForUpcoming from '@/components/ui/VideoForUpcoming';

// 템플릿에 따른 비디오 아이템 렌더링
const RenderVideoItems = ({ video, template }) => {
  switch (template) {
    case 'like':
      // 좋아요 비디오 아이템 렌더링
      return <VideoForLike video={video} />;
    case 'rating':
      // 평가 비디오 아이템 렌더링
      return <VideoForRating video={video} />;
    case 'upcoming':
      // 커밍순 아이템 렌더링
      return <VideoForUpcoming video={video} isClient />;
    case 'default':
      // 기본 비디오 아이템 렌더링
      return <Video video={video} isClient />;
    default:
      // 기본 비디오 아이템 렌더링
      return <Video video={video} isClient />;
  }
};

const InfiniteVideos = ({ videos, template = 'default', pageSize, handlePage }) => {
  const hasMore = videos.total > pageSize * videos.page;
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
        <RenderVideoItems video={video} template={template} key={video.id} />
      ))}
      {hasMore && <article ref={lastItemRef} />}
    </>
  );
};

export default InfiniteVideos;
