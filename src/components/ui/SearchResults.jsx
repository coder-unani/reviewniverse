'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { isEmpty } from 'lodash';

import { SEARCH_PAGE_SIZE, VIDEO_MODE_OPTIONS, DEFAULT_IMAGES } from '@/config/constants';
import { ENDPOINTS } from '@/config/endpoints';
import { useVideos } from '@/hooks/useVideos';
import SuggestButton from '@/components/ui/Button/Suggest';
import InfiniteVideos from '@/components/ui/InfiniteVideos';

import styles from '@/styles/pages/Search.module.scss';
import vvStyles from '@/styles/components/Videos.module.scss';

/**
 * TODO:
 * - loading 상태 추가
 * - videos skeleton ui 추가
 */

const SearchResults = () => {
  const router = useRouter();
  // 검색 쿼리 파라미터 가져오기
  const param = useSearchParams();
  const query = param.get('query') || null;
  // URI 인코딩된 한글 쿼리를 디코딩
  const decodeQuery = decodeURIComponent(query);
  const [page, setPage] = useState(1);
  const [videos, setVideos] = useState(null);
  const {
    data: videosData,
    error: videosError,
    isLoading: videosIsLoading,
  } = useVideos({
    page,
    size: SEARCH_PAGE_SIZE,
    mode: VIDEO_MODE_OPTIONS.KEYWORD,
    query: decodeQuery,
    enabled: decodeQuery,
  });

  useEffect(() => {
    if (!query || !decodeQuery) return;
    setPage(1);
    setVideos(null);
  }, [query, decodeQuery]);

  useEffect(() => {
    if (!query || videosIsLoading || !videosData) return;

    // API 호출 결과가 실패인 경우
    if (!videosData.status) {
      if (videosData.code === 'C001' && page > 1) {
        // 429 에러이고, 첫 페이지가 아닌 경우 이전 페이지 번호로 변경
        setPage((prev) => prev - 1);
      } else {
        // 그 외의 경우 에러 페이지로 이동
        router.push(ENDPOINTS.ERROR);
      }
      return;
    }

    setVideos((prev) => {
      const newData = videosData.data;
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
  }, [query, videosIsLoading, videosData, page]);

  // 페이지 변경
  const handlePage = (newPage) => {
    setPage(newPage);
  };

  // 에러 발생 시 에러 페이지로 이동
  if (videosError) {
    router.push(ENDPOINTS.ERROR);
    return null;
  }

  // 검색어 및 비디오 데이터가 없는 경우
  if (!query || isEmpty(videos)) {
    return query ? null : (
      <section className={styles.search__section}>
        <div className={styles.no__search__content}>
          <Image
            className={styles.no__search__image}
            src={DEFAULT_IMAGES.searchNotFound}
            alt="검색 결과 없음"
            width={240}
            height={240}
            priority
          />
          <p className={styles.no__search__title}>어떤 작품을 찾으세요? 👀</p>
          <p className={styles.no__search__subtitle}>찾고싶은 영화나 시리즈를 검색해보세요!</p>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.search__section}>
      {isEmpty(videos.data) ? (
        <div className={styles.no__search__content}>
          <Image
            className={styles.no__search__image}
            src={DEFAULT_IMAGES.searchNotFound}
            alt="검색 결과 없음"
            width={240}
            height={240}
            priority
          />
          <p className={styles.no__search__title}>
            &quot;<em>{decodeQuery}</em>&quot;에 대한 검색 결과가 없어요.
          </p>
          <p className={styles.no__search__subtitle}>찾고싶은 영화나 시리즈를 검색해보세요!</p>
          <SuggestButton query={query} total={videos.total} />
        </div>
      ) : (
        <>
          <strong className={styles.search__title}>
            &quot;<em>{decodeQuery}</em>&quot;의 검색 결과가 {videos.total} 개 있어요
          </strong>
          <section className={vvStyles.vertical__videos__section}>
            <div className={vvStyles.vertical__videos__wrapper}>
              <InfiniteVideos videos={videos} pageSize={SEARCH_PAGE_SIZE} handlePage={handlePage} />
            </div>
          </section>
        </>
      )}
    </section>
  );
};

export default SearchResults;
