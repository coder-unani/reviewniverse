import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

import styles from '@/styles/pages/ContentsReviews.module.scss';

const VideoReviewsComponent = dynamic(() => import('@/components/ui/VideoReviews'), { ssr: false });

/**
 * TODO:
 * - 메타 태그 설정
 * - fallback 스켈레톤 UI 추가
 */

const ContentsReviews = ({ params }) => {
  const { id } = params;

  return (
    <main className={styles.reviews__main}>
      <Suspense fallback={''}>
        <VideoReviewsComponent id={id} />
      </Suspense>
    </main>
  );
};

export default ContentsReviews;
