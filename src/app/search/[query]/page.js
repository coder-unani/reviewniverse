import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import styles from '@/styles/pages/Search.module.scss';

const SearchResults = dynamic(() => import('@/components/ui/SearchResults'), { ssr: false });

export default function Page({ params }) {
  const { query } = params;

  // URI 인코딩된 한글 쿼리를 디코딩
  const decodedQuery = decodeURIComponent(query);

  // TODO: fallback 스켈레톤 UI 추가
  return (
    <main className={styles.search__main}>
      <Suspense fallback={<div>Loading...</div>}>
        <SearchResults query={decodedQuery} />
      </Suspense>
    </main>
  );
}
