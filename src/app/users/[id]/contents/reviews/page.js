import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

import styles from '@/styles/pages/UsersReviews.module.scss';

const UsersReviewsComponent = dynamic(() => import('@/components/ui/UsersReviews'), { ssr: false });

/**
 * TODO:
 * - 메타 태그 설정
 * - fallback 스켈레톤 UI 추가
 */

const UsersReviews = ({ params }) => {
  const { id } = params;

  return (
    <main className={styles.reviews__main}>
      <Suspense fallback="">
        <UsersReviewsComponent id={id} />
      </Suspense>
    </main>
  );
};

export default UsersReviews;
