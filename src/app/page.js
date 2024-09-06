'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import SkeletonHome from '@/components/ui/Skeleton/Home';
import { useScreenVideos } from '@/hooks/useScreenVideos';
import { useRankingVideos } from '@/hooks/useRankingVideos';
import { useRankingGenres } from '@/hooks/useRankingGenres';
import { useVideos } from '@/hooks/useVideos';
import { showErrorToast } from '@/components/ui/Toast';
import { fScreenCode } from '@/utils/formatContent';
import { SCREEN_MAIN_ID } from '@/config/codes';
import { VIDEO_ORDER_OPTIONS, VIDEO_TERMS_OPTIONS } from '@/config/constants';
import { MESSAGES } from '@/config/messages';
import { ENDPOINTS } from '@/config/endpoints';
import { isEmpty } from 'lodash';
import LayoutIcon from '@/resources/icons/outline-layout.svg';
import styles from '@/styles/pages/Home.module.scss';
import vhStyles from '@/styles/components/VideosHorizontal.module.scss';
import vvStyles from '@/styles/components/VideosVertical.module.scss';

// 코드 스플리팅을 위한 동적 임포트
const VideosPreview = React.lazy(() => import('@/components/ui/VideosPreview'));
const Genres = React.lazy(() => import('@/components/ui/Genres'));
const VideosHorizontal = React.lazy(
  () => import('@/components/ui/VideosHorizontal')
);
const VideosVertical = React.lazy(
  () => import('@/components/ui/VideosVertical')
);

export default function page() {
  const today = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [videos, setVideos] = useState(null);
  // 화면 데이터 호출
  const {
    data: screenVideos,
    error: screenVidoesError,
    isLoading: screenVideosIsLoading,
  } = useScreenVideos({ code: SCREEN_MAIN_ID, display: 'detail' });
  // 랭킹 데이터 호출
  const {
    data: rankingVideos,
    error: rankingVideosError,
    isLoading: rankingVideosIsLoading,
  } = useRankingVideos({ code: today, count: 20 });
  // 장르 데이터 호출
  const {
    data: rankingGenres,
    error: rankingGenresError,
    isLoading: rankingGenresIsLoading,
  } = useRankingGenres({ count: 50 });
  // 커밍순 데이터 호출
  const {
    data: comingSoonVideos,
    error: comingSoonVideosError,
    isLoading: comingSoonVideosIsLoading,
  } = useVideos({
    page: 1,
    orderBy: VIDEO_ORDER_OPTIONS[0],
    terms: VIDEO_TERMS_OPTIONS[1],
  });
  // 이달의 비디오 데이터 호출
  const {
    data: monthlyVideos,
    error: monthlyVideosError,
    isLoading: monthlyVideosIsLoading,
  } = useVideos({
    page: 1,
    orderBy: VIDEO_ORDER_OPTIONS[1],
    terms: VIDEO_TERMS_OPTIONS[2],
  });
  // 비디오 리스트 데이터 호출
  const {
    data: videosData,
    error: videosError,
    isLoading: videosIsLoading,
  } = useVideos({
    page,
    orderBy: VIDEO_ORDER_OPTIONS[1],
    terms: VIDEO_TERMS_OPTIONS[0],
    enabled: hasMore,
  });

  // 헤더 스타일 변경
  useEffect(() => {
    const header = document.querySelector('header');
    const handleScroll = () => {
      if (window.scrollY > 100 && header.classList.contains('transparent')) {
        header.classList.remove('transparent');
      } else if (
        window.scrollY <= 100 &&
        !header.classList.contains('transparent')
      ) {
        header.classList.add('transparent');
      }
    };
    window.addEventListener('scroll', handleScroll);
    header.classList.add('transparent');
    return () => {
      window.removeEventListener('scroll', handleScroll);
      header.classList.remove('transparent');
    };
  }, []);

  // 비디오 데이터 무한 스크롤 구현
  // TODO: useInfiniteQuery 사용하여 무한 스크롤 구현해보기
  useEffect(() => {
    if (videosIsLoading || !videosData || !hasMore) {
      return;
    }

    // TODO: 고도화 필요
    if (!videosData.status) {
      // 429 Too Many Requests 에러 처리
      if (videosData.code === 'C001') {
        if (page === 1) {
          // 첫 페이지에서 429 에러 발생 시 에러 페이지로 이동
          return router.push(ENDPOINTS.ERROR);
        } else {
          // 429 에러 발생 시 페이지 번호를 줄여서 다시 요청
          showErrorToast(MESSAGES['C001']);
          setPage((prev) => prev - 1);
          return;
        }
      } else {
        // 그 외 에러 발생 시 에러 페이지로 이동
        return router.push(ENDPOINTS.ERROR);
      }
    }

    if (page === 1) {
      // 첫 페이지일 경우 데이터를 그대로 저장
      setVideos({ ...videosData.data });
    } else {
      // 그 외 페이지일 경우 기존 데이터에 추가
      setVideos((prev) => {
        // 이전 페이지와 현재 페이지가 같을 경우 데이터를 그대로 반환
        if (prev.page === videosData.data.page) {
          return prev;
        }
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
  }, [videosIsLoading, videosData, hasMore, page]);

  // 페이지 변경
  const handlePage = (newPage) => {
    // 5페이지까지만 불러오기
    if (newPage === 6) {
      setHasMore(false);
    }
    setPage(newPage);
  };

  // 화면 비디오 리스트 렌더링
  const renderScreenVideos = (code) => {
    if (screenVideosIsLoading || screenVidoesError) {
      return null;
    }
    if (
      isEmpty(screenVideos) ||
      !screenVideos.status ||
      isEmpty(screenVideos.data)
    ) {
      return null;
    }
    // 코드에 해당하는 데이터만 필터링
    const screens = fScreenCode(screenVideos.data, code);
    if (!screens) {
      return null;
    }

    // 프리뷰 비디오 리스트 렌더링
    const renderPreviewVideos = () => <VideosPreview videos={screens} />;

    // 기본 비디오 리스트 렌더링
    const renderDefaultVideos = () => (
      <VideosHorizontal
        content={screens.content.list}
        template={screens.content.template}
      >
        <div className={vhStyles.horizontal__title__wrapper}>
          <h2 className={vhStyles.horizontal__title}>{screens.title}</h2>
        </div>
      </VideosHorizontal>
    );

    return code === 'MA01' ? renderPreviewVideos() : renderDefaultVideos();
  };

  // 랭킹 비디오 리스트 렌더링
  const renderRankingVideos = () => {
    if (rankingVideosIsLoading || rankingVideosError) {
      return null;
    }
    if (
      isEmpty(rankingVideos) ||
      !rankingVideos.status ||
      isEmpty(rankingVideos.data)
    ) {
      return null;
    }
    const title = '🍿 리뷰니버스 TOP 20';
    return (
      <VideosHorizontal content={rankingVideos.data} template="rank">
        <div className={vhStyles.horizontal__title__wrapper}>
          <h2 className={vhStyles.horizontal__title}>{title}</h2>
        </div>
      </VideosHorizontal>
    );
  };

  // 장르 리스트 렌더링
  const renderRankingGernes = () => {
    if (rankingGenresIsLoading || rankingGenresError) {
      return null;
    }
    if (
      isEmpty(rankingGenres) ||
      !rankingGenres.status ||
      isEmpty(rankingGenres.data)
    ) {
      return null;
    }
    const title = '장르';
    return (
      <Genres content={rankingGenres.data}>
        <div className={vhStyles.horizontal__title__wrapper}>
          <h2 className={`${vhStyles.horizontal__title} ${vhStyles.genre}`}>
            <LayoutIcon width={24} height={25} />
            {title}
          </h2>
        </div>
      </Genres>
    );
  };

  // 커밍순 비디오 리스트 렌더링
  const renderComingVideos = () => {
    if (comingSoonVideosIsLoading || comingSoonVideosError) {
      return null;
    }
    if (
      isEmpty(comingSoonVideos) ||
      !comingSoonVideos.status ||
      isEmpty(comingSoonVideos.data) ||
      isEmpty(comingSoonVideos.data.data)
    ) {
      return null;
    }
    const title = '💖 두근두근 기대작';
    return (
      <VideosHorizontal content={comingSoonVideos.data.data} template="coming">
        <div className={vhStyles.horizontal__title__wrapper}>
          <h2 className={vhStyles.horizontal__title}>{title}</h2>
        </div>
      </VideosHorizontal>
    );
  };

  // 이달의 비디오 리스트 렌더링
  const renderMonthlyVideos = () => {
    if (monthlyVideosIsLoading || monthlyVideosError) {
      return null;
    }
    if (
      isEmpty(monthlyVideos) ||
      !monthlyVideos.status ||
      isEmpty(monthlyVideos.data) ||
      isEmpty(monthlyVideos.data.data)
    ) {
      return null;
    }
    const title = '👀 이달의 콘텐츠';
    return (
      <VideosHorizontal content={monthlyVideos.data.data} template="monthly">
        <div className={vhStyles.horizontal__title__wrapper}>
          <h2 className={vhStyles.horizontal__title}>{title}</h2>
        </div>
      </VideosHorizontal>
    );
  };

  // 기본 비디오 리스트 렌더링
  const renderVideos = () => {
    if (videosError) {
      return null;
    }
    if (isEmpty(videos) || isEmpty(videos.data)) {
      return null;
    }
    const title = '🍟 이건 어때요?';
    return (
      <VideosVertical videos={videos} handlePage={handlePage}>
        <div className={vvStyles.vertical__title__wrapper}>
          <h2 className={vvStyles.vertical__title}>{title}</h2>
        </div>
      </VideosVertical>
    );
  };

  // 스켈리톤 로딩 UI 적용
  if (
    screenVideosIsLoading ||
    rankingVideosIsLoading ||
    rankingGenresIsLoading ||
    comingSoonVideosIsLoading ||
    monthlyVideosIsLoading
  ) {
    return <SkeletonHome />;
  }

  // 에러 발생 시 에러 페이지로 이동
  if (
    screenVidoesError ||
    rankingVideosError ||
    rankingGenresError ||
    comingSoonVideosError ||
    monthlyVideosError
  ) {
    return router.push(ENDPOINTS.ERROR);
  }

  return (
    <Suspense fallback={<SkeletonHome />}>
      <main className={styles.home__main}>
        <section className={styles.home__preview__section}>
          {renderScreenVideos('MA01')}
        </section>
        <section className={styles.home__main__section}>
          {renderRankingVideos()}
          {renderRankingGernes()}
          {renderComingVideos()}
          {renderMonthlyVideos()}
          {renderScreenVideos('MA02')}
          {renderScreenVideos('MA03')}
          {renderScreenVideos('MA04')}
          {renderScreenVideos('MA05')}
          {renderVideos()}
        </section>
      </main>
    </Suspense>
  );
}
