'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, notFound } from 'next/navigation';
import { useVideos } from '@/hooks/useVideos';
import PeopleImage from '@/components/ui/Button/People/Image';
import VideosVertical from '@/components/ui/VideosVertical';
import { showErrorToast } from '@/components/ui/Toast';
import { SETTINGS } from '@/config/settings';
import { MESSAGES } from '@/config/messages';
import { DEFAULT_IMAGES, VIDEO_ORDER_OPTIONS, VIDEO_MODE_OPTIONS, VIDEO_BY_OPTIONS } from '@/config/constants';
import { EndpointManager, ENDPOINTS } from '@/config/endpoints';
import { fParseInt } from '@/utils/format';
import { isEmpty } from 'lodash';
import styles from '@/styles/pages/People.module.scss';

const People = ({ id }) => {
  const router = useRouter();
  const peopleId = fParseInt(id);
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
    by: VIDEO_BY_OPTIONS.PERSON,
    query: peopleId,
    enabled: peopleId,
  });

  // peopleId가 숫자형이 아닐 경우 notFound 페이지로 이동
  useEffect(() => {
    if (peopleId === 0) {
      notFound();
    }
  }, [peopleId]);

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

  if (isEmpty(videos)) {
    return;
  }

  const personName = videos.metadata.person.name;
  const personPicture = `${SETTINGS.CDN_BASE_URL}/${videos.metadata.person.picture}`;
  const personProfile = videos.metadata.person.profile;

  return (
    <>
      <section className={styles.people__section}>
        <div className={styles.people__info__wrapper}>
          <PeopleImage image={personPicture} size={100} />
          <h1 className={styles.people__name}>{personName}</h1>
        </div>
      </section>
      <VideosVertical videos={videos} handlePage={handlePage} />
    </>
  );
};

export default People;
