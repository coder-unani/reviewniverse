import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

import styles from '@/styles/pages/Users.module.scss';

const UsersComponent = dynamic(() => import('@/components/ui/Users'), { ssr: false });

/**
 * TODO:
 * - 메타 태그 설정
 * - fallback 스켈레톤 UI 추가
 */

const Users = ({ params }) => {
  const { id } = params;

  return (
    <main className={styles.user__main}>
      <Suspense fallback="">
        <UsersComponent id={id} />
      </Suspense>
    </main>
  );
};

export default Users;
