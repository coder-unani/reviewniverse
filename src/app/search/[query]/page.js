import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import styles from '@/styles/pages/Search.module.scss';

const SearchResults = dynamic(() => import('@/components/ui/SearchResults'), {
  ssr: false,
});

export default function Page({ params }) {
  const { query } = params;
  // TODO: fallback 스켈레톤 UI 추가
  return (
    <main className={styles.search__main}>
      <Suspense fallback={<div>Loading...</div>}>
        <SearchResults query={query} />
      </Suspense>
    </main>
  );
}
