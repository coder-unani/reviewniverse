'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, notFound } from 'next/navigation';
import { isEmpty } from 'lodash';

import { VIDEO_ORDER_OPTIONS, VIDEO_MODE_OPTIONS, VIDEO_BY_OPTIONS } from '@/config/constants';
import { EndpointManager, ENDPOINTS } from '@/config/endpoints';
import { MESSAGES } from '@/config/messages';
import { fParseInt } from '@/utils/format';
import { useVideos } from '@/hooks/useVideos';
import { showErrorToast } from '@/components/ui/Toast';
import VideosVertical from '@/components/ui/VideosVertical';

import styles from '@/styles/pages/Productions.module.scss';

const Productions = ({ id }) => {
  const router = useRouter();
  const productionId = fParseInt(id);
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
    by: VIDEO_BY_OPTIONS.PRODUCTION,
    query: productionId,
    enabled: productionId,
  });

  // productionId가 숫자형이 아닐 경우 notFound 페이지로 이동
  useEffect(() => {
    if (productionId === 0) {
      notFound();
    }
  }, [productionId]);

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

  const productionSubtitle = '제작사';
  const productionName = videos.metadata.production.name;
  const productionLogo = videos.metadata.production.logo;

  return (
    <>
      <section className={styles.production__section}>
        <div className={styles.production__title__wrapper}>
          <p className={styles.production__subtitle}>{productionSubtitle}</p>
          <h1 className={styles.production__title}>{productionName}</h1>
        </div>
      </section>
      <VideosVertical videos={videos} handlePage={handlePage} />
    </>
  );
};

export default Productions;
