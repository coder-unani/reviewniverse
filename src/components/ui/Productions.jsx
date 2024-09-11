'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, notFound } from 'next/navigation';
import { useVideos } from '@/hooks/useVideos';
import VideosVertical from '@/components/ui/VideosVertical';
import { showErrorToast } from '@/components/ui/Toast';
import { SETTINGS } from '@/config/settings';
import { DEFAULT_IMAGES } from '@/config/constants';
import { MESSAGES } from '@/config/messages';
import { EndpointManager, ENDPOINTS } from '@/config/endpoints';
import { fParseInt } from '@/utils/format';
import { isEmpty } from 'lodash';
import styles from '@/styles/pages/Productions.module.scss';

/**
 * TODO:
 * - location.state 말고 다른 방법으로 name을 받아오는 방법 찾기
 * - api 데이터에서 production 데이터 필요?
 */

const Productions = ({ id }) => {
  const router = useRouter();
  const productionId = fParseInt(id);
  // const location = useLocation();
  // const name = location.state?.name;
  const [page, setPage] = useState(1);
  const [videos, setVideos] = useState(null);
  const {
    data: videosData,
    error: videosError,
    isLoading: videosIsLoading,
  } = useVideos({
    query: productionId,
    page,
    mode: 'id',
    target: 'production',
    orderBy: 'release_desc',
    enabled: productionId,
    // enabled: productionId || !isEmpty(name),
  });

  /*
  // productionId가 숫자형이 아닐 경우, location state에 name이 없을 경우
  useEffect(() => {
    if (productionId === 0 || isEmpty(name)) {
      notFound();
    }
  }, [productionId, name]);
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
      <section className={styles.production__section}>
        <div className={styles.production__title__wrapper}>
          {/* <h1 className={styles.production__title}>{name}</h1> */}
          <h1 className={styles.production__title}>제작사명</h1>
        </div>
      </section>
      <VideosVertical videos={videos} handlePage={handlePage} />
    </>
  );
};

export default Productions;
