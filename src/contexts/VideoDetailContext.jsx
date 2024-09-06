'use client';

import React, { createContext, useContext, useEffect, useMemo } from 'react';
import { useRouter, notFound } from 'next/navigation';
import { useAuthContext } from '@/contexts/AuthContext';
import { useVideoDetail } from '@/hooks/useVideoDetail';
import { useVideoMyInfo } from '@/hooks/useVideoMyInfo';
import { fParseInt } from '@/utils/format';
import { ENDPOINTS } from '@/config/endpoints';

const VideoDetailContext = createContext();

export const VideoDetailProvider = ({ children, id }) => {
  const router = useRouter();
  const { user } = useAuthContext();
  const videoId = fParseInt(id);
  const {
    data: content,
    error: contentError,
    isLoading: contentIsLoading,
  } = useVideoDetail({ videoId: videoId, enabled: videoId });
  const {
    data: myInfo,
    error: myInfoError,
    isLoading: myInfoIsLoading,
  } = useVideoMyInfo({
    videoId: videoId,
    userId: user ? user.id : null,
    enabled: user && videoId,
  });

  // 비디오 ID가 숫자형이 아닐 경우 404 페이지로 이동
  useEffect(() => {
    if (videoId === 0) {
      return router.push(ENDPOINTS.NOT_FOUND);
    }
  }, [videoId]);

  // 비디오 에러 발생 시 404 or 에러 페이지로 이동
  useEffect(() => {
    if (contentIsLoading) {
      return;
    }
    if (contentError) {
      // VIDEO_NOT_FOUND일 시 404 페이지로 이동
      if (contentError.message === 'C003') {
        notFound();
      } else {
        return router.push(ENDPOINTS.ERROR);
      }
    }
  }, [contentIsLoading, contentError]);

  // 내 정보 에러 발생 시 에러 무시
  useEffect(() => {
    // if (myInfoError) {
    //   return router.push(ENDPOINTS.ERROR);
    // }
  }, [myInfoError]);

  const values = useMemo(
    () => ({
      videoId: videoId,
      content,
      contentIsLoading,
      contentError,
      myInfo,
      myInfoIsLoading,
      myInfoError,
    }),
    [
      videoId,
      content,
      contentIsLoading,
      contentError,
      myInfo,
      myInfoIsLoading,
      myInfoError,
    ]
  );

  return (
    <VideoDetailContext.Provider value={values}>
      {children}
    </VideoDetailContext.Provider>
  );
};

export const useVideoDetailContext = () => {
  const context = useContext(VideoDetailContext);
  if (!context) {
    throw new Error(
      'useVideoDetailContext must be used within a VideoDetailProvider'
    );
  }
  return context;
};
