import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

import styles from '@/styles/pages/UserAuth.module.scss';

const AuthKakaoCallback = dynamic(() => import('@/components/ui/AuthKakaoCallback'), { ssr: false });

/**
 * TODO:
 * - fallback 스켈레톤 UI 추가
 */

const KakaoCallback = () => {
  return (
    <main className={styles.join__main}>
      <Suspense fallback={''}>
        <AuthKakaoCallback />
      </Suspense>
    </main>
  );
};

export default KakaoCallback;
