import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

import styles from '@/styles/pages/UsersWatchType.module.scss';

const UsersWatchTypeComponent = dynamic(() => import('@/components/ui/UsersWatchType'), { ssr: false });

/**
 * TODO:
 * - fallback 스켈레톤 UI 추가
 */

const UsersWatchType = () => {
  return (
    <main className={styles.favorite__main}>
      <Suspense fallback={''}>
        <UsersWatchTypeComponent />
      </Suspense>
    </main>
  );
};

export default UsersWatchType;
