import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import { isEmpty } from 'lodash';

import {
  PRODUCTIONS_REVALIDATE_SEC,
  SITE_KEYWORDS,
  PRODUCTIONS_KEYWORDS,
  PRODUCTIONS_PAGE_SIZE,
  VIDEO_ORDER_OPTIONS,
  VIDEO_MODE_OPTIONS,
  VIDEO_BY_OPTIONS,
  DEFAULT_IMAGES,
} from '@/config/constants';
import { EndpointManager, ENDPOINTS } from '@/config/endpoints';
import { SETTINGS } from '@/config/settings';
import { fParseInt } from '@/utils/format';
import { fetchVideos } from '@/library/api/videos';
import Video from '@/components/ui/Video';

import styles from '@/styles/pages/Productions.module.scss';
import vStyles from '@/styles/components/Videos.module.scss';

const ProductionsComponent = dynamic(() => import('@/components/ui/Productions'), { ssr: false });

// ISR 재생성 주기 설정
export const revalidate = PRODUCTIONS_REVALIDATE_SEC;

// 데이터 초기화
const initProductionVideos = (result) => {
  const videos = {
    total: 0,
    count: 0,
    page: 1,
    data: [],
    metadata: {
      query: '',
      by: '',
      production: {
        id: 0,
        name: '',
        logo: '',
      },
    },
  };

  if (!isEmpty(result)) {
    videos.total = result.total || 0;
    videos.count = result.count || 0;
    videos.page = result.page || 1;
    videos.data = result.data || [];
    videos.metadata.query = result.metadata?.query || '';
    videos.metadata.by = result.metadata?.by || '';
    videos.metadata.production = {
      id: result.metadata?.production?.id || 0,
      name: result.metadata?.production?.name || '',
      logo: result.metadata?.production?.logo || '',
    };
  }

  return videos;
};

// Productions API 호출
const getProductionVideos = async ({ productionId }) => {
  const options = {
    page: 1,
    size: PRODUCTIONS_PAGE_SIZE,
    orderBy: VIDEO_ORDER_OPTIONS.RELEASE_DESC,
    mode: VIDEO_MODE_OPTIONS.ID,
    by: VIDEO_BY_OPTIONS.PRODUCTION,
    query: productionId,
    revalidate: PRODUCTIONS_REVALIDATE_SEC,
  };
  const res = await fetchVideos({ ...options });
  if (res.status === 200) {
    return res.data;
  }
  return {};
};

// 메타 태그 설정
export const generateMetadata = async ({ params }) => {
  const { id } = params;
  const productionId = fParseInt(id);

  // 숫자가 아닌 경우 notFound 페이지로 이동
  if (productionId === 0) notFound();

  const result = await getProductionVideos({ productionId });
  const videos = initProductionVideos(result);

  // TODO: 트위터, 페이스북, 카카오, 네이버 메타태그 설정
  const isIndex = videos.data.length > 0;
  const { production } = videos.metadata;
  const title = `${production.name} | 리뷰니버스`;
  const description = `${production.name} 제작사의 작품들을 확인해보세요.`;
  const imageUrl = production.logo ? `${SETTINGS.CDN_BASE_URL}/${production.logo}` : DEFAULT_IMAGES.logo;
  const pathname = EndpointManager.generateUrl(ENDPOINTS.PRODUCTIONS, { productionId: production.id });
  const url = `${SETTINGS.SITE_BASE_URL}${pathname}`;
  const keywords = `${SITE_KEYWORDS}, ${PRODUCTIONS_KEYWORDS}, ${production.name}의 작품, ${production.name}`;

  return {
    robots: {
      index: isIndex,
    },
    alternates: {
      canonical: url,
    },
    title,
    description,
    keywords,
    openGraph: {
      url,
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
  };
};

const Productions = async ({ params }) => {
  const { id } = params;
  const productionId = fParseInt(id);

  // 숫자가 아닌 경우 notFound 페이지로 이동
  if (productionId === 0) notFound();

  const result = await getProductionVideos({ productionId });
  const videos = initProductionVideos(result);

  const { production } = videos.metadata;
  const subtitle = '제작사';
  // page 1의 데이터가 size(20)보다 작으면 enabled를 false로 설정
  const enabled = videos.total > PRODUCTIONS_PAGE_SIZE;

  return (
    <main className={styles.production__main}>
      <section className={styles.production__section}>
        <div className={styles.production__title__wrapper}>
          <p className={styles.production__subtitle}>{subtitle}</p>
          <h2 className={styles.production__title}>{production.name}</h2>
        </div>
      </section>

      <section className={vStyles.vertical__videos__section}>
        <div className={vStyles.vertical__videos__wrapper}>
          {videos.data.map((video) => (
            <Video video={video} key={video.id} />
          ))}
          <Suspense fallback="">
            <ProductionsComponent productionId={productionId} enabled={enabled} />
          </Suspense>
        </div>
      </section>
    </main>
  );
};

export default Productions;
