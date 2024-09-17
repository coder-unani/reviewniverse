'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, notFound } from 'next/navigation';
import VideosVertical from '@/components/ui/VideosVertical';
import { useVideos } from '@/hooks/useVideos';
import { showErrorToast } from '@/components/ui/Toast';
import { MESSAGES } from '@/config/messages';
import { VIDEO_ORDER_OPTIONS, VIDEO_MODE_OPTIONS, VIDEO_BY_OPTIONS } from '@/config/constants';
import { EndpointManager, ENDPOINTS } from '@/config/endpoints';
import { fParseInt } from '@/utils/format';
import { isEmpty } from 'lodash';
import styles from '@/styles/pages/Genres.module.scss';

const Genres = ({ children, id }) => {
  const router = useRouter();
  const genreId = fParseInt(id);
  const [page, setPage] = useState(1);
  const [videos, setVideos] = useState(null);
  const {
    data: videosData,
    error: videosError,
    isLoading: videosIsLoading,
  } = useVideos({
    page,
    size: 20,
    orderBy: VIDEO_ORDER_OPTIONS.RELEASE_DESC,
    mode: VIDEO_MODE_OPTIONS.ID,
    by: VIDEO_BY_OPTIONS.GENRE,
    query: genreId,
    enabled: genreId,
  });

  // genreId가 숫자형이 아닐 경우 notFound 페이지로 이동
  useEffect(() => {
    if (genreId === 0) {
      notFound();
    }
  }, [genreId]);

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

  // TODO: 고도화 필요
  const genreSubtitle = '장르';
  const genreName = videos.metadata.genre.name;
  const genreImage = videos.metadata.genre.background;

  return (
    <>
      <section className={styles.genre__section}>
        <div className={styles.genre__title__wrapper}>
          <p className={styles.genre__subtitle}>{genreSubtitle}</p>
          <h1 className={styles.genre__title}>#{genreName}</h1>
        </div>
      </section>
      {children}
      <VideosVertical videos={videos} handlePage={handlePage} />
    </>
  );
};

export default Genres;
