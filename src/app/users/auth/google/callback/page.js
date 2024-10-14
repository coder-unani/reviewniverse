import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

import styles from '@/styles/pages/UserAuth.module.scss';

const AuthGoogleCallback = dynamic(() => import('@/components/ui/AuthGoogleCallback'), { ssr: false });

/**
 * TODO:
 * - fallback 스켈레톤 UI 추가
 */

const GoogleCallback = () => {
  return (
    <main className={styles.join__main}>
      <Suspense fallback="">
        <AuthGoogleCallback />
      </Suspense>
    </main>
  );
};

export default GoogleCallback;
