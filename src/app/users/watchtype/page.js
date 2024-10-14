import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

import styles from '@/styles/pages/UsersWatchtype.module.scss';

const UsersWatchtypeComponent = dynamic(() => import('@/components/ui/UsersWatchtype'), { ssr: false });

/**
 * TODO:
 * - fallback 스켈레톤 UI 추가
 */

const UsersWatchtype = () => {
  return (
    <main className={styles.favorite__main}>
      <Suspense fallback="">
        <UsersWatchtypeComponent />
      </Suspense>
    </main>
  );
};

export default UsersWatchtype;
