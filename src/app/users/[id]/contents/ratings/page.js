import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import styles from '@/styles/pages/UsersContents.module.scss';

const UsersRatingsComponent = dynamic(() => import('@/components/ui/UsersRatings'), { ssr: false });

/**
 * TODO:
 * - 메타 태그 설정
 * - fallback 스켈레톤 UI 추가
 */

const UsersRatings = ({ params }) => {
  const { id } = params;

  return (
    <main className={styles.contents__main}>
      <Suspense fallback={''}>
        <UsersRatingsComponent id={id} />
      </Suspense>
    </main>
  );
};

export default UsersRatings;
