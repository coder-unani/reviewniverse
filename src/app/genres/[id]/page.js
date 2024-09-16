import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import GenresVertical from '@/components/ui/GenresVertical';
import { fetchRankingGenres } from '@/library/api/ranking';
import styles from '@/styles/pages/Genres.module.scss';

const GenresComponent = dynamic(() => import('@/components/ui/Genres'), { ssr: false });

/**
 * TODO:
 * - 메타 태그 설정
 * - fallback 스켈레톤 UI 추가
 */

/*
// 메타 태그 설정
export const metadata = ({ params }) => {
  const title = `${name}의 검색결과 - 리뷰니버스`;
  const description = `${name}의 검색결과 - 리뷰니버스`;
  const imageUrl = DEFAULT_IMAGES.logo;
  const path = EndpointManager.generateUrl(ENDPOINTS.GENRE, { genreId });
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
          url: DEFAULT_IMAGES.logo,
          width: 800,
          height: 220,
          alt: '리뷰니버스 로고',
        },
      ],
    },
  };
};
*/

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

const Genres = async ({ params }) => {
  const { id } = params;
  const genres = await getGenres();

  return (
    <main className={styles.genre__main}>
      <Suspense fallback={''}>
        <GenresComponent id={id}>
          <GenresVertical genres={genres} />
        </GenresComponent>
      </Suspense>
    </main>
  );
};

export default Genres;
