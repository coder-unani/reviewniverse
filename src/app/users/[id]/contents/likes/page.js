import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';

import { fParseInt } from '@/utils/format';

import styles from '@/styles/pages/UsersContents.module.scss';

const UsersLikesComponent = dynamic(() => import('@/components/ui/UsersLikes'), { ssr: false });

/**
 * TODO:
 * - 메타 태그 설정
 * - fallback 스켈레톤 UI 추가
 */

const UsersLikes = ({ params }) => {
  const { id } = params;
  const userId = fParseInt(id);

  // 숫자가 아닌 경우 notFound 페이지로 이동
  if (userId === 0) notFound();

  return (
    <main className={styles.contents__main}>
      <Suspense fallback="">
        <UsersLikesComponent userId={userId} />
      </Suspense>
    </main>
  );
};

export default UsersLikes;
