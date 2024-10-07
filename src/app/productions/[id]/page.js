import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import { isEmpty } from 'lodash';

import { SETTINGS } from '@/config/settings';
import { EndpointManager, ENDPOINTS } from '@/config/endpoints';
import {
  PRODUCTIONS_REVALIDATE_SEC,
  SITE_KEYWORDS,
  PRODUCTIONS_PAGE_SIZE,
  VIDEO_ORDER_OPTIONS,
  VIDEO_MODE_OPTIONS,
  VIDEO_BY_OPTIONS,
  DEFAULT_IMAGES,
} from '@/config/constants';
import { fParseInt } from '@/utils/format';
import { fetchVideos } from '@/library/api/videos';
import Video from '@/components/ui/Video';

import styles from '@/styles/pages/Productions.module.scss';
import vStyles from '@/styles/components/Videos.module.scss';

const ProductionsComponent = dynamic(() => import('@/components/ui/Productions'), { ssr: false });

// ISR 재생성 주기 설정
export const revalidate = PRODUCTIONS_REVALIDATE_SEC;

// Productions
const getProductionVideos = async ({ productionId }) => {
  // 제작사 정보 조회 API 호출
  const options = {
    page: 1,
    size: PRODUCTIONS_PAGE_SIZE,
    orderBy: VIDEO_ORDER_OPTIONS.RELEASE_DESC,
    mode: VIDEO_MODE_OPTIONS.ID,
    by: VIDEO_BY_OPTIONS.PRODUCTION,
    query: productionId,
  };

  const res = await fetchVideos({ ...options });
  if (res.status === 200) {
    return res.data;
  } else {
    return {};
  }
};

// 메타 태그 설정
export const generateMetadata = async ({ params }) => {
  const { id } = params;
  const productionId = fParseInt(id);
  // 숫자가 아닌 경우 notFound 페이지로 이동
  if (productionId === 0) {
    notFound();
  }

  const videos = await getProductionVideos({ productionId });
  if (isEmpty(videos)) {
    return {};
  }

  // TODO: 트위터, 페이스북, 카카오, 네이버 메타태그 설정
  const production = videos.metadata.production;
  const name = production.name;
  const description = `${name}의 작품 목록`;
  const imageUrl = production.logo ? `${SETTINGS.CDN_BASE_URL}/${production.logo}` : DEFAULT_IMAGES.logo;
  const path = EndpointManager.generateUrl(ENDPOINTS.PRODUCTIONS, { productionId: production.id });
  const url = `${SETTINGS.SITE_BASE_URL}${path}`;
  const keywords = `${SITE_KEYWORDS}, ${name}, ${name}의 작품, 제작, 제작사`;

  const metaTitle = `${name} | 리뷰니버스`;

  return {
    alternates: {
      canonical: url,
    },
    title: metaTitle,
    description: description,
    keywords: keywords,
    openGraph: {
      url: url,
      title: metaTitle,
      description: description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: metaTitle,
        },
      ],
    },
  };
};

const Productions = async ({ params }) => {
  const { id } = params;
  const productionId = fParseInt(id);
  // 숫자가 아닌 경우 notFound 페이지로 이동
  if (productionId === 0) {
    notFound();
  }

  const videos = await getProductionVideos({ productionId });
  if (isEmpty(videos)) {
    return {};
  }

  const production = videos.metadata.production;
  const productionSubtitle = '제작사';
  const productionName = production.name;
  const productionLogo = production.logo;

  // page 1의 데이터가 size(20)보다 작으면 enabled를 false로 설정
  const enabled = videos.total > PRODUCTIONS_PAGE_SIZE;

  return (
    <main className={styles.production__main}>
      <section className={styles.production__section}>
        <div className={styles.production__title__wrapper}>
          <p className={styles.production__subtitle}>{productionSubtitle}</p>
          <h1 className={styles.production__title}>{productionName}</h1>
        </div>
      </section>

      <section className={vStyles.vertical__videos__section}>
        <div className={vStyles.vertical__videos__wrapper}>
          {videos.data.map((video) => (
            <Video key={video.id} video={video} />
          ))}
          <Suspense fallback={''}>
            <ProductionsComponent productionId={productionId} enabled={enabled} />
          </Suspense>
        </div>
      </section>
    </main>
  );
};

export default Productions;
