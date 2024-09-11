import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import styles from '@/styles/pages/Login.module.scss';

const UsersLoginComponent = dynamic(() => import('@/components/ui/UsersLogin'), { ssr: false });

/**
 * TODO:
 * - fallback 스켈레톤 UI 추가
 */

const UsersLogin = () => {
  return (
    <main className={styles.login__main}>
      <Suspense fallback={''}>
        <UsersLoginComponent />
      </Suspense>
    </main>
  );
};

export default UsersLogin;
