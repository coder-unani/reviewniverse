import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import { isEmpty } from 'lodash';

import { SETTINGS } from '@/config/settings';
import { EndpointManager, ENDPOINTS } from '@/config/endpoints';
import {
  GENRES_REVALIDATE_SEC,
  SITE_KEYWORDS,
  GENRES_PAGE_SIZE,
  VIDEO_ORDER_OPTIONS,
  VIDEO_MODE_OPTIONS,
  VIDEO_BY_OPTIONS,
  DEFAULT_IMAGES,
} from '@/config/constants';
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

// Ranking Genres
const getGenres = async () => {
  const count = 50;

  // Ranking Genres API 호출
  const res = await fetchRankingGenres({ count });
  if (res.status === 200) {
    return res.data.data;
  } else {
    return [];
  }
};

// Genres
const getGenreVideos = async ({ genreId }) => {
  // 장르 정보 조회 API 호출
  const options = {
    page: 1,
    size: GENRES_PAGE_SIZE,
    orderBy: VIDEO_ORDER_OPTIONS.RELEASE_DESC,
    mode: VIDEO_MODE_OPTIONS.ID,
    by: VIDEO_BY_OPTIONS.GENRE,
    query: genreId,
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
  const genreId = fParseInt(id);
  // 숫자가 아닌 경우 notFound 페이지로 이동
  if (genreId === 0) {
    notFound();
  }

  const videos = await getGenreVideos({ genreId });
  if (isEmpty(videos)) {
    return {};
  }

  // TODO: 트위터, 페이스북, 카카오, 네이버 메타태그 설정
  const genre = videos.metadata.genre;
  const name = genre.name;
  const description = `${name} 장르의 작품 목록`;
  const imageUrl = genre.background ? `${SETTINGS.CDN_BASE_URL}/${genre.background}` : DEFAULT_IMAGES.logo;
  const path = EndpointManager.generateUrl(ENDPOINTS.GENRES, { genreId: genre.id });
  const url = `${SETTINGS.SITE_BASE_URL}${path}`;
  const keywords = `${SITE_KEYWORDS}, ${name}, ${name} 장르의 작품, 장르`;

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

const Genres = async ({ params }) => {
  const { id } = params;
  const genreId = fParseInt(id);
  // 숫자가 아닌 경우 notFound 페이지로 이동
  if (genreId === 0) {
    notFound();
  }

  const genres = await getGenres();
  const videos = await getGenreVideos({ genreId });
  if (isEmpty(videos)) {
    return {};
  }

  const genre = videos.metadata.genre;
  const genreSubtitle = '장르';
  const genreName = genre.name;
  const genreImage = genre.background;

  // page 1의 데이터가 size(20)보다 작으면 enabled를 false로 설정
  const enabled = videos.total > GENRES_PAGE_SIZE;

  return (
    <main className={styles.genre__main}>
      <section className={styles.genre__section}>
        <div className={styles.genre__title__wrapper}>
          <p className={styles.genre__subtitle}>{genreSubtitle}</p>
          <h1 className={styles.genre__title}>#{genreName}</h1>
        </div>
      </section>

      <GenresSwiper genres={genres} />

      <section className={vStyles.vertical__videos__section}>
        <div className={vStyles.vertical__videos__wrapper}>
          {videos.data.map((video) => (
            <Video video={video} key={video.id} />
          ))}
          <Suspense fallback={''}>
            <GenresComponent genreId={genreId} enabled={enabled} />
          </Suspense>
        </div>
      </section>
    </main>
  );
};

export default Genres;
