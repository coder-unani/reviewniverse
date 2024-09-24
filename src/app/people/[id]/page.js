import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

import styles from '@/styles/pages/People.module.scss';

const Filmography = dynamic(() => import('@/components/ui/Filmography'), { ssr: false });

/**
 * TODO:
 * - 메타 태그 설정
 * - fallback 스켈레톤 UI 추가
 */

/*
// 메타 태그 설정
export const metadata = ({ params }) => {
  const title = `${name} - 리뷰니버스`;
  const description = `${name}의 ${videos.total}개 작품`;
  const imageUrl = people.picture;
  const path = EndpointManager.generateUrl(ENDPOINTS.PEOPLE, { peopleId });
  const url = `${SETTINGS.SITE_BASE_URL}${path}`;

  return {
    title,
    description,
    openGraph: {
      url,
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: 220,
          height: 220,
          alt: name,
        },
      ],
    },
  };
};
*/

const People = ({ params }) => {
  const { id } = params;

  return (
    <main className={styles.people__main}>
      <Suspense fallback={''}>
        <Filmography id={id} />
      </Suspense>
    </main>
  );
};

export default People;
