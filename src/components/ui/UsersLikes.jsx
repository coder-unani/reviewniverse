'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, notFound } from 'next/navigation';
import { isEmpty } from 'lodash';

import { ENDPOINTS } from '@/config/endpoints';
import { fParseInt } from '@/utils/format';
import { useUserLikes } from '@/hooks/useUserLikes';
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

  // 숫자가 아닌 경우 notFound 페이지로 이동
  useEffect(() => {
    if (userId === 0) {
      notFound();
    }
  }, [userId]);

  // 좋아요 데이터 처리
  useEffect(() => {
    // API 호출 중이거나 데이터가 없는 경우
    if (videosIsLoading || !videosData) {
      return;
    }

    // API 호출 결과가 실패인 경우
    if (!videosData.status) {
      // 429 에러인 경우
      if (videosData.code === 'C001') {
        // TODO: 고도화 필요
        if (page > 1) setPage((prev) => prev - 1);
        return;
      } else {
        return router.push(ENDPOINTS.ERROR);
      }
    }

    if (page === 1) {
      // 첫 페이지인 경우
      setVideos({ ...videosData.data });
    } else {
      // 첫 페이지가 아닌 경우 데이터 추가
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

  // 페이지 변경
  const handlePage = (newPage) => {
    setPage(newPage);
  };

  // 에러 발생 시 에러 페이지로 이동
  if (videosError) {
    return router.push(ENDPOINTS.ERROR);
  }

  // 좋아요 데이터가 없는 경우
  if (isEmpty(videos)) {
    return null;
  }

  return (
    <>
      <section className={styles.contents__title__section}>
        <strong className={styles.contents__title}>
          <em>{videos.user.nickname}</em> 님이 좋아하는 작품이 {videos.total} 개 있어요
        </strong>
      </section>
      <section className={styles.contents__content__section}>
        {!isEmpty(videos.data) && <VideosLike videos={videos} handlePage={handlePage} />}
      </section>
    </>
  );
};

export default UsersLikes;
