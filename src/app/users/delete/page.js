import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import styles from '@/styles/pages/UsersDelete.module.scss';

const UsersDeleteComponent = dynamic(() => import('@/components/ui/UsersDelete'), { ssr: false });

/**
 * TODO:
 * - fallback 스켈레톤 UI 추가
 */

const UsersDelete = () => {
  return (
    <main className={styles.delete__main}>
      <Suspense fallback={''}>
        <UsersDeleteComponent />
      </Suspense>
    </main>
  );
};

export default UsersDelete;
