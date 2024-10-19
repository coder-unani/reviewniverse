'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isEmpty } from 'lodash';

import { COUNTRIES_PAGE_SIZE, VIDEO_ORDER_OPTIONS, VIDEO_MODE_OPTIONS, VIDEO_BY_OPTIONS } from '@/config/constants';
import { ENDPOINTS } from '@/config/endpoints';
import { useVideos } from '@/hooks/useVideos';
import Videos from '@/components/ui/Videos';

const Countries = ({ query, enabled, referrer }) => {
  const router = useRouter();
  const [videos, setVideos] = useState({});
  const [page, setPage] = useState(2);
  const {
    data: videosData,
    error: videosError,
    isLoading: videosIsLoading,
  } = useVideos({
    page,
    size: COUNTRIES_PAGE_SIZE,
    orderBy: VIDEO_ORDER_OPTIONS.RELEASE_DESC,
    mode: VIDEO_MODE_OPTIONS.KEYWORD,
    by: VIDEO_BY_OPTIONS.COUNTRY,
    query,
    enabled, // enabled가 false인 경우 데이터 호출하지 않음
  });

  useEffect(() => {
    if (videosIsLoading || !videosData || !enabled) return;

    // API 호출 결과가 실패인 경우
    if (!videosData.status) {
      if (videosData.code === 'C001' && page > 1) {
        // 429 에러이고, 첫 페이지가 아닌 경우 이전 페이지 번호로 변경
        setPage((prev) => prev - 1);
      } else {
        // 그 외의 경우 에러 페이지로 이동
        router.push(ENDPOINTS.ERROR);
      }
      return;
    }

    setVideos((prev) => {
      const newData = videosData.data;
      // 첫 페이지인 경우
      if (!prev) return { ...newData };
      // 같은 페이지인 경우
      if (prev.page === newData.page) return prev;
      // 첫 페이지가 아닌 경우 데이터 추가
      return {
        ...prev,
        total: newData.total,
        count: newData.count,
        page: newData.page,
        data: prev.data ? [...prev.data, ...newData.data] : [...newData.data],
      };
    });
  }, [videosIsLoading, videosData, page, enabled]);

  // 페이지 변경
  const handlePage = (newPage) => {
    setPage(newPage);
  };

  // 에러 발생 시 에러 페이지로 이동
  if (videosError) {
    router.push(ENDPOINTS.ERROR);
    return null;
  }

  // 평가 데이터가 없는 경우
  if (isEmpty(videos)) return null;

  return (
    <Videos
      videos={videos}
      handlePage={handlePage}
      pageSize={COUNTRIES_PAGE_SIZE}
      referrer={referrer}
      referrerKey={query}
    />
  );
};

export default Countries;
