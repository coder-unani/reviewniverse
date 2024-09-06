'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useVideos } from '@/hooks/useVideos';
import VideosVertical from '@/components/ui/VideosVertical';
import { showErrorToast } from '@/components/ui/Toast';
import { DEFAULT_IMAGES } from '@/config/constants';
import { ENDPOINTS } from '@/config/endpoints';
import { MESSAGES } from '@/config/messages';
import { isEmpty } from 'lodash';
import styles from '@/styles/pages/Search.module.scss';

/**
 * TODO:
 * - loading 상태 추가
 * - videos skeleton ui 추가
 */

export default function page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('query');
  const [page, setPage] = useState(1);
  const [videos, setVideos] = useState(null);
  const {
    data: videosData,
    error: videosError,
    isLoading: videosIsLoading,
  } = useVideos({
    query,
    page,
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
    <main className={styles.search__main}>
      <section className={styles.search__section}>
        {isEmpty(videos) || isEmpty(videos.data) ? (
          <div className={styles.no__search__content}>
            <Image
              className={styles.no__search__image}
              src={DEFAULT_IMAGES.searchNotFound}
              alt="검색 결과 없음"
              width={320}
              height={320}
              priority
            />
            <p className={styles.no__search__title}>
              "<em>{query}</em>"에 대한 검색 결과가 없어요.
            </p>
            <p className={styles.no__search__subtitle}>
              입력한 검색어를 다시 한번 확인해주세요.
            </p>
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
    </main>
  );
}
