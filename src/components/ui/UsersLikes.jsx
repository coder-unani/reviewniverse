'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, notFound } from 'next/navigation';
import { isEmpty } from 'lodash';

import { ENDPOINTS } from '@/config/endpoints';
import { MESSAGES } from '@/config/messages';
import { fParseInt } from '@/utils/format';
import { useUserLikes } from '@/hooks/useUserLikes';
import { showErrorToast } from '@/components/ui/Toast';
import VideosLike from '@/components/ui/VideosLike';

import styles from '@/styles/pages/UsersContents.module.scss';

const UsersLikes = ({ id }) => {
  const router = useRouter();
  const userId = fParseInt(id);
  const [videos, setVideos] = useState(null);
  const [page, setPage] = useState(1);
  const pageSize = 20;
  const {
    data: videosData,
    error: videosError,
    isLoading: videosIsLoading,
  } = useUserLikes({
    userId: userId,
    page,
    pageSize,
    orderBy: 'created_at_desc',
    enabled: userId,
  });

  useEffect(() => {
    if (userId === 0) {
      notFound();
    }
  }, [userId]);

  useEffect(() => {
    if (videosIsLoading || !videosData) {
      return;
    }
    if (!videosData.status) {
      if (videosData.code === 'C001') {
        // TODO: 고도화 필요
        if (page > 1) setPage((prev) => prev - 1);
        // showErrorToast(MESSAGES["C001"]);
        return;
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
    return null;
  }

  return (
    <>
      <section className={styles.contents__section}>
        <strong className={styles.contents__title}>
          <em>{videos.user.nickname}</em> 님이 좋아하는 작품이 {videos.total} 개 있어요
        </strong>
      </section>
      {!isEmpty(videos.data) && <VideosLike videos={videos} handlePage={handlePage} />}
    </>
  );
};

export default UsersLikes;
