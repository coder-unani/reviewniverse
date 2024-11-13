import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import { isEmpty } from 'lodash';

import {
  GENRES_REVALIDATE_SEC,
  SITE_KEYWORDS,
  GENRES_KEYWORDS,
  GENRES_PAGE_SIZE,
  VIDEO_ORDER_OPTIONS,
  VIDEO_MODE_OPTIONS,
  VIDEO_BY_OPTIONS,
  DEFAULT_IMAGES,
} from '@/config/constants';
import { EndpointManager, ENDPOINTS } from '@/config/endpoints';
import { SETTINGS } from '@/config/settings';
import { fParseInt } from '@/utils/format';
import { fetchRankingGenres } from '@/library/api/ranking';
import { fetchVideos } from '@/library/api/videos';
import GenresSwiper from '@/components/ui/GenresSwiper';
import Video from '@/components/ui/Video';

import styles from '@/styles/pages/Genres.module.scss';
import vStyles from '@/styles/components/Videos.module.scss';

const GenresComponent = dynamic(() => import('@/components/ui/Genres'), { ssr: false });

// ISR 재생성 주기 설정
export const revalidate = GENRES_REVALIDATE_SEC;

// 데이터 초기화
const initGenreVideos = (result) => {
  const videos = {
    total: 0,
    count: 0,
    page: 1,
    data: [],
    metadata: {
      query: '',
      by: '',
      genre: {
        id: 0,
        name: '',
        background: '',
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
    videos.metadata.genre = {
      id: result.metadata?.genre?.id || 0,
      name: result.metadata?.genre?.name || '',
      background: result.metadata?.genre?.background || '',
    };
  }

  return videos;
};

// Ranking Genres API 호출
const getRankingGenres = async () => {
  const options = {
    count: 50,
    revalidate: GENRES_REVALIDATE_SEC,
  };
  const res = await fetchRankingGenres({ ...options });
  if (res.status === 200) {
    return res.data.data;
  }
  return [];
};

// Genres API 호출
const getGenreVideos = async ({ genreId }) => {
  const options = {
    page: 1,
    size: GENRES_PAGE_SIZE,
    orderBy: VIDEO_ORDER_OPTIONS.RELEASE_DESC,
    mode: VIDEO_MODE_OPTIONS.ID,
    by: VIDEO_BY_OPTIONS.GENRE,
    query: genreId,
    revalidate: GENRES_REVALIDATE_SEC,
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
  const genreId = fParseInt(id);

  // 숫자가 아닌 경우 notFound 페이지로 이동
  if (genreId === 0) notFound();

  const result = await getGenreVideos({ genreId });
  const videos = initGenreVideos(result);

  // TODO: 트위터, 페이스북, 카카오, 네이버 메타태그 설정
  const isIndex = videos.data.length > 0;
  const { genre } = videos.metadata;
  const title = `${genre.name} 장르 | 리뷰니버스`;
  const description = `${genre.name} 장르의 작품들을 확인해보세요.`;
  const imageUrl = genre.background ? `${SETTINGS.CDN_BASE_URL}/${genre.background}` : DEFAULT_IMAGES.logo;
  const pathname = EndpointManager.generateUrl(ENDPOINTS.GENRES, { genreId: genre.id });
  const url = `${SETTINGS.SITE_BASE_URL}${pathname}`;
  const keywords = `${SITE_KEYWORDS}, ${GENRES_KEYWORDS}, ${genre.name}, ${genre.name} 장르의 작품`;

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

const Genres = async ({ params }) => {
  const { id } = params;
  const genreId = fParseInt(id);

  // 숫자가 아닌 경우 notFound 페이지로 이동
  if (genreId === 0) notFound();

  const rankingGenres = await getRankingGenres();
  const result = await getGenreVideos({ genreId });
  const videos = initGenreVideos(result);

  const { genre } = videos.metadata;
  const subtitle = '장르';
  const referrer = 'genres';
  // page 1의 데이터가 size(20)보다 작으면 enabled를 false로 설정
  const enabled = videos.total > GENRES_PAGE_SIZE;

  return (
    <main className={styles.genre__main}>
      <section className={styles.genre__section}>
        <div className={styles.genre__title__wrapper}>
          <p className={styles.genre__subtitle}>{subtitle}</p>
          <h2 className={styles.genre__title}>#{genre.name}</h2>
        </div>
      </section>

      <GenresSwiper genres={rankingGenres} />

      <section className={vStyles.vertical__videos__section}>
        <div className={vStyles.vertical__videos__wrapper}>
          {videos.data.map((video) => (
            <Video video={video} key={video.id} referrer={referrer} referrerKey={genreId} />
          ))}
          <Suspense fallback="">
            <GenresComponent genreId={genreId} enabled={enabled} referrer={referrer} />
          </Suspense>
        </div>
      </section>
    </main>
  );
};

export default Genres;
