import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

import styles from '@/styles/pages/UsersProfile.module.scss';

const UsersProfileComponent = dynamic(() => import('@/components/ui/UsersProfile'), { ssr: false });

/**
 * TODO:
 * - fallback 스켈레톤 UI 추가
 */

const UsersProfile = () => {
  return (
    <main className={styles.edit__main}>
      <Suspense fallback="">
        <UsersProfileComponent />
      </Suspense>
    </main>
  );
};

export default UsersProfile;
