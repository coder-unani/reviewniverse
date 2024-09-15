'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useVideos } from '@/hooks/useVideos';
import VideosVertical from '@/components/ui/VideosVertical';
import { showErrorToast } from '@/components/ui/Toast';
import { DEFAULT_IMAGES, VIDEO_MODE_OPTIONS } from '@/config/constants';
import { ENDPOINTS } from '@/config/endpoints';
import { MESSAGES } from '@/config/messages';
import { isEmpty } from 'lodash';
import styles from '@/styles/pages/Search.module.scss';

/**
 * TODO:
 * - loading 상태 추가
 * - videos skeleton ui 추가
 */

const SearchResults = ({ query }) => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [videos, setVideos] = useState(null);
  const {
    data: videosData,
    error: videosError,
    isLoading: videosIsLoading,
  } = useVideos({
    query,
    page,
    size: 20,
    mode: VIDEO_MODE_OPTIONS.KEYWORD,
    enabled: query,
  });

  useEffect(() => {
    if (!query) {
      return;
    }
    setPage(1);
    setVideos(null);
  }, [query]);

  useEffect(() => {
    if (videosIsLoading || !videosData) {
      return;
    }
    if (!videosData.status) {
      if (videosData.code === 'C001') {
        // TODO: 고도화 필요
        if (page === 1) {
          return router.push(ENDPOINTS.ERROR);
        } else {
          // showErrorToast(MESSAGES["C001"]);
          setPage((prev) => prev - 1);
          return;
        }
      } else {
        return router.push(ENDPOINTS.ERROR);
      }
    }
    if (page === 1) {
      setVideos({ ...videosData.data });
    } else {
      setVideos((prev) => {
        if (prev.page === videosData.data.page) return prev;
        return {
          ...prev,
          count: videosData.data.count,
          page: videosData.data.page,
          data: prev.data ? [...prev.data, ...videosData.data.data] : [],
        };
      });
    }
  }, [videosIsLoading, videosData, page]);

  const handlePage = (newPage) => {
    setPage(newPage);
  };

  if (videosError) {
    return router.push(ENDPOINTS.ERROR);
  }

  // if (isEmpty(videos)) {
  //   return;
  // }

  return (
    <section className={styles.search__section}>
      {isEmpty(videos) || isEmpty(videos.data) ? (
        <div className={styles.no__search__content}>
          <img className={styles.no__search__image} src={DEFAULT_IMAGES.searchNotFound} alt="검색 결과 없음" />
          <p className={styles.no__search__title}>
            "<em>{query}</em>"에 대한 검색 결과가 없어요.
          </p>
          <p className={styles.no__search__subtitle}>입력한 검색어를 다시 한번 확인해주세요.</p>
        </div>
      ) : (
        <>
          <strong className={styles.search__title}>
            "<em>{query}</em>"의 검색 결과가 {videos.total} 개 있어요
          </strong>
          <VideosVertical videos={videos} handlePage={handlePage} />
        </>
      )}
    </section>
  );
};

export default SearchResults;
