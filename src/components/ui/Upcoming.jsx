'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isEmpty } from 'lodash';

import { UPCOMING_PAGE_SIZE } from '@/config/constants';
import { ENDPOINTS } from '@/config/endpoints';
import { useUpcomingVideos } from '@/hooks/useUpcomingVideos';
import VideosForUpcoming from '@/components/ui/VideosForUpcoming';

const Upcoming = ({ enabled }) => {
  const router = useRouter();
  const [page, setPage] = useState(2);
  const [videos, setVideos] = useState({});
  const {
    data: videosData,
    error: videosError,
    isLoading: videosIsLoading,
  } = useUpcomingVideos({
    page,
    size: UPCOMING_PAGE_SIZE,
    enabled: enabled, // enabled가 false인 경우 데이터 호출하지 않음
  });

  useEffect(() => {
    if (videosIsLoading || !videosData || !enabled) {
      return;
    }

    if (!videosData.status) {
      if (videosData.code === 'C001') {
        // TODO: 고도화 필요
        if (page === 1) {
          return router.push(ENDPOINTS.ERROR);
        } else {
          setPage((prev) => prev - 1);
          return;
        }
      } else {
        return router.push(ENDPOINTS.ERROR);
      }
    } else {
      setVideos((prev) => {
        if (!prev) setVideos({ ...videosData.data });
        if (prev.page === videosData.data.page) return prev;
        return {
          ...prev,
          total: videosData.data.total,
          count: videosData.data.count,
          page: videosData.data.page,
          data: prev.data ? [...prev.data, ...videosData.data.data] : [...videosData.data.data],
        };
      });
    }
  }, [videosIsLoading, videosData, page, enabled]);

  const handlePage = (newPage) => {
    setPage(newPage);
  };

  if (videosError) {
    return router.push(ENDPOINTS.ERROR);
  }

  if (isEmpty(videos)) {
    return;
  }

  return <VideosForUpcoming videos={videos} handlePage={handlePage} pageSize={UPCOMING_PAGE_SIZE} />;
};

export default Upcoming;
