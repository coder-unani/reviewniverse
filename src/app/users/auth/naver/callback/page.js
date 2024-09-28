import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

import styles from '@/styles/pages/UserAuth.module.scss';

const AuthNaverCallback = dynamic(() => import('@/components/ui/AuthNaverCallback'), { ssr: false });

/**
 * TODO:
 * - fallback 스켈레톤 UI 추가
 */

const NaverCallback = () => {
  return (
    <main className={styles.join__main}>
      <Suspense fallback={''}>
        <AuthNaverCallback />
      </Suspense>
    </main>
  );
};

export default NaverCallback;
