import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import { isEmpty } from 'lodash';

import {
  COUNTRIES_REVALIDATE_SEC,
  SITE_KEYWORDS,
  COUNTRIES_KEYWORDS,
  COUNTRIES_PAGE_SIZE,
  VIDEO_ORDER_OPTIONS,
  VIDEO_MODE_OPTIONS,
  VIDEO_BY_OPTIONS,
  DEFAULT_IMAGES,
} from '@/config/constants';
import { EndpointManager, ENDPOINTS } from '@/config/endpoints';
import { SETTINGS } from '@/config/settings';
import { fetchVideos } from '@/library/api/videos';
import Video from '@/components/ui/Video';

import styles from '@/styles/pages/Countries.module.scss';
import vStyles from '@/styles/components/Videos.module.scss';

const CountriesComponent = dynamic(() => import('@/components/ui/Countries'), { ssr: false });

// ISR 재생성 주기 설정
export const revalidate = COUNTRIES_REVALIDATE_SEC;

// 데이터 초기화
const initCountryVideos = (result) => {
  const videos = {
    total: 0,
    count: 0,
    page: 1,
    data: [],
    metadata: {
      query: '',
      by: '',
      country: {
        code: '',
        name: '',
        name_en: '',
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
    videos.metadata.country = {
      code: result.metadata?.country?.code || '',
      name: result.metadata?.country?.name || '',
      name_en: result.metadata?.country?.name_en || '',
    };
  }

  return videos;
};

// Countries API 호출
const getCountryVideos = async ({ query }) => {
  const options = {
    page: 1,
    size: COUNTRIES_PAGE_SIZE,
    orderBy: VIDEO_ORDER_OPTIONS.RELEASE_DESC,
    mode: VIDEO_MODE_OPTIONS.KEYWORD,
    by: VIDEO_BY_OPTIONS.COUNTRY,
    query,
  };
  const res = await fetchVideos({ ...options });
  if (res.status === 200) {
    return res.data;
  }
  return {};
};

// 메타 태그 설정
export const generateMetadata = async ({ params }) => {
  const { query } = params;
  const decodeQuery = decodeURIComponent(query);

  // query 값이 없는 경우 notFound 페이지로 이동
  if (isEmpty(decodeQuery)) notFound();

  const result = await getCountryVideos({ query: decodeQuery });
  const videos = initCountryVideos(result);

  // TODO: 트위터, 페이스북, 카카오, 네이버 메타태그 설정
  const isIndex = videos.data.length > 0;
  const { country } = videos.metadata;
  const title = `${country.name}이 만든 콘텐츠 | 리뷰니버스`;
  const description = `${country.name}이 만든 콘텐츠들을 확인해보세요.`;
  const imageUrl = DEFAULT_IMAGES.logo;
  const pathname = EndpointManager.generateUrl(ENDPOINTS.COUNTRIES, { countryId: country.name });
  const url = `${SETTINGS.SITE_BASE_URL}${pathname}`;
  const keywords = `${SITE_KEYWORDS}, ${COUNTRIES_KEYWORDS}, ${country.name_en}, ${country.name}, ${country.name}이 만든 콘텐츠`;

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

const Countries = async ({ params }) => {
  const { query } = params;
  const decodeQuery = decodeURIComponent(query);

  // query 값이 없는 경우 notFound 페이지로 이동
  if (isEmpty(decodeQuery)) notFound();

  const result = await getCountryVideos({ query: decodeQuery });
  const videos = initCountryVideos(result);

  const { country } = videos.metadata;
  const subtitle = '제작국가';
  const referrer = 'countries';
  // page 1의 데이터가 size(20)보다 작으면 enabled를 false로 설정
  const enabled = videos.total > COUNTRIES_PAGE_SIZE;

  return (
    <main className={styles.countries__main}>
      <section className={styles.countries__section}>
        <div className={styles.countries__title__wrapper}>
          <h2 className={styles.countries__subtitle}>{subtitle}</h2>
          <h1 className={styles.countries__title}>{country.name}</h1>
        </div>
      </section>

      <section className={vStyles.vertical__videos__section}>
        <div className={vStyles.vertical__videos__wrapper}>
          {videos.data.map((video) => (
            <Video video={video} referrer={referrer} referrerKey={decodeQuery} key={video.id} />
          ))}
          <Suspense fallback="">
            <CountriesComponent query={decodeQuery} enabled={enabled} referrer={referrer} />
          </Suspense>
        </div>
      </section>
    </main>
  );
};

export default Countries;
