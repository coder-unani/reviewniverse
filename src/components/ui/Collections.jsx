'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isEmpty } from 'lodash';

import { COLLECTIONS_PAGE_SIZE, COLLECTION_CODE_OPTIONS } from '@/config/constants';
import { ENDPOINTS } from '@/config/endpoints';
import { useCollections } from '@/hooks/useCollections';
import VideosForCollection from '@/components/ui/VideosForCollection';

const Collections = ({ enabled }) => {
  const router = useRouter();
  const [collections, setCollections] = useState({});
  const [page, setPage] = useState(2);
  const {
    data: collectionsData,
    error: collectionsError,
    isLoading: collectionsIsLoading,
  } = useCollections({
    page,
    size: COLLECTIONS_PAGE_SIZE,
    code: COLLECTION_CODE_OPTIONS.COLLECTION,
    enabled, // enabled가 false인 경우 데이터 호출하지 않음
  });

  useEffect(() => {
    if (collectionsIsLoading || !collectionsData || !enabled) return;

    // API 호출 결과가 실패인 경우
    if (!collectionsData.status) {
      if (collectionsData.code === 'C001' && page > 1) {
        // 429 에러이고, 첫 페이지가 아닌 경우 이전 페이지 번호로 변경
        setPage((prev) => prev - 1);
      } else {
        // 그 외의 경우 에러 페이지로 이동
        router.push(ENDPOINTS.ERROR);
      }
      return;
    }

    setCollections((prev) => {
      const newData = collectionsData.data;
      // 첫 페이지인 경우
      if (!prev) return { ...newData };
      // 같은 페이지인 경우
      if (prev.page === newData.page) return prev;
      // 첫 페이지가 아닌 경우 데이터 추가
      return {
        ...prev,
        total: newData.total,
        count: newData.count,
        page: newData.page,
        data: prev.data ? [...prev.data, ...newData.data] : [...newData.data],
      };
    });
  }, [collectionsIsLoading, collectionsData, page, enabled]);

  // 페이지 변경
  const handlePage = (newPage) => {
    setPage(newPage);
  };

  // 에러 발생 시 에러 페이지로 이동
  if (collectionsError) {
    router.push(ENDPOINTS.ERROR);
    return null;
  }

  // 컬렉션 데이터가 없는 경우
  if (isEmpty(collections)) return null;

  return <VideosForCollection collections={collections} handlePage={handlePage} pageSize={COLLECTIONS_PAGE_SIZE} />;
};

export default Collections;
