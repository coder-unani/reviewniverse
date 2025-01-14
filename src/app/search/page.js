import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

import styles from '@/styles/pages/Search.module.scss';

const SearchResults = dynamic(() => import('@/components/ui/SearchResults'), { ssr: false });

/**
 * TODO:
 * - 메타 태그 설정
 * - fallback 스켈레톤 UI 추가
 */

const SearchHome = () => {
  return (
    <main className={styles.search__main}>
      <Suspense fallback="">
        <SearchResults />
      </Suspense>
    </main>
  );
};

export default SearchHome;
