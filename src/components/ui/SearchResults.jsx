'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { isEmpty } from 'lodash';

import { SEARCH_PAGE_SIZE, VIDEO_MODE_OPTIONS, DEFAULT_IMAGES } from '@/config/constants';
import { ENDPOINTS } from '@/config/endpoints';
import { useVideos } from '@/hooks/useVideos';
import RequestButton from '@/components/ui/Button/Request';
import VideosForSearch from '@/components/ui/VideosForSearch';

import styles from '@/styles/pages/Search.module.scss';

/**
 * TODO:
 * - loading 상태 추가
 * - videos skeleton ui 추가
 */

const SearchResults = ({ query }) => {
  const router = useRouter();
  // URI 인코딩된 한글 쿼리를 디코딩
  const decodeQuery = decodeURIComponent(query);
  const [page, setPage] = useState(1);
  const [videos, setVideos] = useState(null);
  const {
    data: videosData,
    error: videosError,
    isLoading: videosIsLoading,
  } = useVideos({
    page,
    size: SEARCH_PAGE_SIZE,
    mode: VIDEO_MODE_OPTIONS.KEYWORD,
    query: decodeQuery,
    enabled: decodeQuery,
  });

  useEffect(() => {
    if (!decodeQuery) {
      return;
    }
    setPage(1);
    setVideos(null);
  }, [decodeQuery]);

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
          total: videosData.data.total,
          count: videosData.data.count,
          page: videosData.data.page,
          data: prev.data ? [...prev.data, ...videosData.data.data] : [...videosData.data.data],
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

  if (isEmpty(videos)) {
    return;
  }

  return (
    <section className={styles.search__section}>
      {isEmpty(videos.data) ? (
        <div className={styles.no__search__content}>
          <Image
            className={styles.no__search__image}
            src={DEFAULT_IMAGES.searchNotFound}
            alt="검색 결과 없음"
            width={240}
            height={240}
            priority
          />
          <p className={styles.no__search__title}>
            "<em>{decodeQuery}</em>"에 대한 검색 결과가 없어요.
          </p>
          <p className={styles.no__search__subtitle}>입력한 검색어를 다시 한번 확인해주세요.</p>
          <RequestButton query={query} total={videos.total} />
        </div>
      ) : (
        <>
          <strong className={styles.search__title}>
            "<em>{decodeQuery}</em>"의 검색 결과가 {videos.total} 개 있어요
          </strong>
          <VideosForSearch videos={videos} handlePage={handlePage} pageSize={SEARCH_PAGE_SIZE} />
        </>
      )}
    </section>
  );
};

export default SearchResults;
