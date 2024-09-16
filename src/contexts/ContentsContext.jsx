'use client';

import React, { createContext, useContext, useEffect, useMemo } from 'react';
import { useAuthContext } from '@/contexts/AuthContext';
import { useVideoMyInfo } from '@/hooks/useVideoMyInfo';
import { fParseInt } from '@/utils/format';
import { isEmpty } from 'lodash';

const ContentsContext = createContext();

export const ContentsProvider = ({ children, id }) => {
  const { user } = useAuthContext();
  const videoId = fParseInt(id);
  // 비디오 내정보 조회
  const {
    data: myInfo,
    error: myInfoError,
    isLoading: myInfoIsLoading,
  } = useVideoMyInfo({
    videoId: videoId,
    userId: isEmpty(user) ? null : user.id,
    enabled: !isEmpty(user) && videoId,
  });

  // 내 정보 에러 발생 시 에러 무시
  useEffect(() => {
    // if (myInfoError) {
    //   return router.push(ENDPOINTS.ERROR);
    // }
  }, [myInfoError]);

  const values = useMemo(
    () => ({
      videoId,
      myInfo,
      myInfoIsLoading,
      myInfoError,
    }),
    [videoId, myInfo, myInfoIsLoading, myInfoError]
  );

  return <ContentsContext.Provider value={values}>{children}</ContentsContext.Provider>;
};

export const useContentsContext = () => {
  const context = useContext(ContentsContext);
  if (!context) {
    throw new Error('useContentsContext must be used within a ContentsProvider');
  }
  return context;
};