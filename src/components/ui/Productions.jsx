'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isEmpty } from 'lodash';

import { PRODUCTIONS_PAGE_SIZE, VIDEO_ORDER_OPTIONS, VIDEO_MODE_OPTIONS, VIDEO_BY_OPTIONS } from '@/config/constants';
import { ENDPOINTS } from '@/config/endpoints';
import { useVideos } from '@/hooks/useVideos';
import Videos from '@/components/ui/Videos';

const Productions = ({ productionId, enabled }) => {
  const router = useRouter();
  const [page, setPage] = useState(2);
  const [videos, setVideos] = useState({});
  const {
    data: videosData,
    error: videosError,
    isLoading: videosIsLoading,
  } = useVideos({
    page,
    size: PRODUCTIONS_PAGE_SIZE,
    orderBy: VIDEO_ORDER_OPTIONS.RELEASE_DESC,
    mode: VIDEO_MODE_OPTIONS.ID,
    by: VIDEO_BY_OPTIONS.PRODUCTION,
    query: productionId,
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

  return <Videos videos={videos} handlePage={handlePage} pageSize={PRODUCTIONS_PAGE_SIZE} />;
};

export default Productions;
