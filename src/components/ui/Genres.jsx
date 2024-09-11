'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useVideos } from '@/hooks/useVideos';
import { showErrorToast } from '@/components/ui/Toast';
import { MESSAGES } from '@/config/messages';
import { EndpointManager, ENDPOINTS } from '@/config/endpoints';
import { fParseInt } from '@/utils/format';
import { isEmpty } from 'lodash';
import styles from '@/styles/pages/Genres.module.scss';

/**
 * TODO:
 * - location.state 말고 다른 방법으로 name을 받아오는 방법 찾기
 * - React.lazy -> next/dynamic으로 변경
 * - 메타 태그 설정은 서버 컴포넌트에서만 가능
 */
const VideosVertical = dynamic(() => import('@/components/ui/VideosVertical'), { ssr: false });

const Genres = ({ children, id }) => {
  // const location = useLocation();
  const router = useRouter();
  const genreId = fParseInt(id);
  // const name = location.state?.name;
  const [page, setPage] = useState(1);
  const [videos, setVideos] = useState(null);
  const {
    data: videosData,
    error: videosError,
    isLoading: videosIsLoading,
  } = useVideos({
    query: genreId,
    page,
    mode: 'id',
    target: 'genre',
    orderBy: 'release_desc',
    enabled: genreId,
    // enabled: genreId || !isEmpty(name),
  });

  /*
  // genreId가 숫자형이 아닐 경우, location state에 name이 없을 경우
  useEffect(() => {
    if (genreId === 0 || isEmpty(name)) {
      notFound();
    }
  }, [genreId, name]);
  */

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
    <>
      <section className={styles.genre__section}>
        <div className={styles.genre__title__wrapper}>
          <h1 className={styles.genre__title}>#{name}</h1>
        </div>
      </section>
      {children}
      <VideosVertical videos={videos} handlePage={handlePage} />
    </>
  );
};

export default Genres;
