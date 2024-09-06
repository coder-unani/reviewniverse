'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useVideos } from '@/hooks/useVideos';
import { useRankingGenres } from '@/hooks/useRankingGenres';
import VideosVertical from '@/components/ui/VideosVertical';
import { showErrorToast } from '@/components/ui/Toast';
import { SETTINGS } from '@/config/settings';
import { DEFAULT_IMAGES } from '@/config/constants';
import { MESSAGES } from '@/config/messages';
import { EndpointManager, ENDPOINTS } from '@/config/endpoints';
import { fParseInt } from '@/utils/format';
import { isEmpty } from 'lodash';
import styles from '@/styles/pages/Genres.module.scss';

/**
 * TODO:
 * - location.state 말고 다른 방법으로 name을 받아오는 방법 찾기
 * - React.lazy -> next/dynamic으로 변경
 * - 메타 태그 설정은 서버 컴포넌트에서만 가능
 */
const GenresVertical = dynamic(() => import('@/components/ui/GenresVertical'), {
  ssr: false,
});

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

export default function page({ params }) {
  // const location = useLocation();
  const router = useRouter();
  const { id } = params;
  const genreId = fParseInt(id);
  // const name = location.state?.name;
  const [page, setPage] = useState(1);
  const [videos, setVideos] = useState(null);
  const {
    data: videosData,
    error: videosError,
    isLoading: videosIsLoading,
  } = useVideos({
    query: genreId,
    page,
    mode: 'id',
    target: 'genre',
    orderBy: 'release_desc',
    enabled: genreId,
    // enabled: genreId || !isEmpty(name),
  });
  const {
    data: rankingGenres,
    error: rankingGenresError,
    isLoading: rankingGenresIsLoading,
  } = useRankingGenres({ count: 50 });

  /*
  // genreId가 숫자형이 아닐 경우, location state에 name이 없을 경우
  useEffect(() => {
    if (genreId === 0 || isEmpty(name)) {
      notFound();
    }
  }, [genreId, name]);
  */

  useEffect(() => {
    if (videosIsLoading || !videosData) {
      return;
    }
    if (!videosData.status) {
      if (videosData.code === 'C001') {
        // TODO: 고도화 필요
        if (page === 1) {
          return router.push(ENDPOINTS.ERROR);
        } else {
          // showErrorToast(MESSAGES["C001"]);
          setPage((prev) => prev - 1);
          return;
        }
      } else {
        return router.push(ENDPOINTS.ERROR);
      }
    }
    if (page === 1) {
      setVideos({ ...videosData.data });
    } else {
      setVideos((prev) => {
        if (prev.page === videosData.data.page) return prev;
        return {
          ...prev,
          count: videosData.data.count,
          page: videosData.data.page,
          data: prev.data
            ? [...prev.data, ...videosData.data.data]
            : [...videosData.data.data],
        };
      });
    }
  }, [videosIsLoading, videosData, page]);

  const handlePage = (newPage) => {
    setPage(newPage);
  };

  if (videosError) {
    return router.push(ENDPOINTS.ERROR);
  }

  if (isEmpty(videos)) {
    return;
  }

  return (
    <main className={styles.genre__main}>
      <section className={styles.genre__section}>
        <div className={styles.genre__title__wrapper}>
          <h1 className={styles.genre__title}>#{name}</h1>
        </div>
      </section>

      {rankingGenres.status && <GenresVertical content={rankingGenres.data} />}

      <VideosVertical videos={videos} handlePage={handlePage} />
    </main>
  );
}
