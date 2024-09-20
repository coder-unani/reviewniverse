import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

import styles from '@/styles/pages/Productions.module.scss';

const ProductionsComponent = dynamic(() => import('@/components/ui/Productions'), { ssr: false });

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
  const imageUrl = DEFAULT_IMAGES.logo;
  const path = EndpointManager.generateUrl(ENDPOINTS.PRODUCTION, { productionId });
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
          width: 800,
          height: 220,
          alt: '리뷰니버스 로고',
        },
      ],
    },
  };
};
*/

const Productions = ({ params }) => {
  const { id } = params;

  return (
    <main className={styles.production__main}>
      <Suspense fallback={''}>
        <ProductionsComponent id={id} />
      </Suspense>
    </main>
  );
};

export default Productions;
