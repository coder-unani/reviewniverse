import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';

import { fParseInt } from '@/utils/format';

import styles from '@/styles/pages/UsersContents.module.scss';

const UsersRatingsComponent = dynamic(() => import('@/components/ui/UsersRatings'), { ssr: false });

/**
 * TODO:
 * - 메타 태그 설정
 * - fallback 스켈레톤 UI 추가
 */

const UsersRatings = ({ params }) => {
  const { id } = params;
  const userId = fParseInt(id);

  // 숫자가 아닌 경우 notFound 페이지로 이동
  if (userId === 0) notFound();

  const referrer = 'users';

  return (
    <main className={styles.contents__main}>
      <Suspense fallback="">
        <UsersRatingsComponent userId={userId} referrer={referrer} />
      </Suspense>
    </main>
  );
};

export default UsersRatings;
