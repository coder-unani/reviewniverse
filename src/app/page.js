import React from 'react';
import { fetchScreenVideos } from '@/library/api/screens';
import { fetchRankingVideos, fetchRankingGenres } from '@/library/api/ranking';
import { fetchVideos } from '@/library/api/videos';
import VideosPreview from '@/components/ui/VideosPreview';
import VideosHorizontal from '@/components/ui/VideosHorizontal';
import GenresVertical from '@/components/ui/GenresVertical';
import VideoItem from '@/components/ui/VideoItem';
import { SCREEN_MAIN_ID } from '@/config/codes';
import { HOME_REVALIDATE_SEC, VIDEO_ORDER_OPTIONS, VIDEO_TERMS_OPTIONS } from '@/config/constants';
import { fExportScreenDataByCode } from '@/utils/formatContent';
import { isEmpty } from 'lodash';
import LayoutIcon from '@/resources/icons/outline-layout.svg';
import styles from '@/styles/pages/Home.module.scss';
import vhStyles from '@/styles/components/VideosHorizontal.module.scss';
import vvStyles from '@/styles/components/VideosVertical.module.scss';

// ISR 재생성 주기 설정
export const revalidate = HOME_REVALIDATE_SEC;

// Screen 컨텐츠
const getScreenVideos = async () => {
  const code = SCREEN_MAIN_ID;
  const display = 'detail';

  // Screen Videos API 호출
  const res = await fetchScreenVideos({ code, display });
  if (res.status === 200) {
    return res.data.data;
  } else {
    return [];
  }
};

// Ranking 컨텐츠
const getRankingVideos = async () => {
  // 오늘 날짜
  const code = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const count = 20;

  // Ranking Videos API 호출
  const res = await fetchRankingVideos({ code, count });
  if (res.status === 200) {
    return res.data.data;
  } else {
    return [];
  }
};

// ComingSoon 컨텐츠
const getUpcomingVideos = async () => {
  const page = 1;
  const size = 20;
  const orderBy = VIDEO_ORDER_OPTIONS.RELEASE_ASC;
  const terms = VIDEO_TERMS_OPTIONS.COMING_SOON;

  // Coming Videos API 호출
  const res = await fetchVideos({ page, size, orderBy, terms });
  if (res.status === 200) {
    return res.data.data;
  } else {
    return [];
  }
};

// Current Monthly 컨텐츠
const getCurrentVideos = async () => {
  const page = 1;
  const size = 20;
  const orderBy = VIDEO_ORDER_OPTIONS.RELEASE_ASC;
  const terms = VIDEO_TERMS_OPTIONS.CURRENT;

  // Monthly Videos API 호출
  const res = await fetchVideos({ page, size, orderBy, terms });
  if (res.status === 200) {
    return res.data.data;
  } else {
    return [];
  }
};

// 기본 컨텐츠
const getDefaultVideos = async () => {
  const page = 1;
  const size = 100;
  const orderBy = VIDEO_ORDER_OPTIONS.RELEASE_DESC;
  const terms = VIDEO_TERMS_OPTIONS.ALREADY;

  // Videos API 호출
  const res = await fetchVideos({ page, size, orderBy, terms });
  if (res.status === 200) {
    return res.data.data;
  } else {
    return [];
  }
};

// Genres
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

const Home = async () => {
  // 데이터 페칭
  const [screenVideos, rankingVideos, comingVideos, monthlyVideos, videos, genres] = await Promise.all([
    getScreenVideos(),
    getRankingVideos(),
    getUpcomingVideos(),
    getCurrentVideos(),
    getDefaultVideos(),
    getGenres(),
  ]);

  const previewData = fExportScreenDataByCode(screenVideos, 'MA01');
  const previewVideos = previewData.content.list || [];

  const screenMA02Data = fExportScreenDataByCode(screenVideos, 'MA02');
  const screenMA02Videos = screenMA02Data?.content.list || [];
  const screenMA02Template = screenMA02Data?.content.template || '';
  const screenMA02Title = screenMA02Data?.title || '';

  const screenMA03Data = fExportScreenDataByCode(screenVideos, 'MA03');
  const screenMA03Videos = screenMA03Data?.content.list || [];
  const screenMA03Template = screenMA03Data?.content.template || '';
  const screenMA03Title = screenMA03Data?.title || '';

  const screenMA04Data = fExportScreenDataByCode(screenVideos, 'MA04');
  const screenMA04Videos = screenMA04Data?.content.list || [];
  const screenMA04Template = screenMA04Data?.content.template || '';
  const screenMA04Title = screenMA04Data?.title || '';

  const screenMA05Data = fExportScreenDataByCode(screenVideos, 'MA05');
  const screenMA05Videos = screenMA05Data?.content.list || [];
  const screenMA05Template = screenMA05Data?.content.template || '';
  const screenMA05Title = screenMA05Data?.title || '';

  const rankingVideosTemplate = 'rank';
  const rankingVideosTitle = '🍿 리뷰니버스 TOP 20';

  const comingVideosTemplate = 'coming';
  const comingVideosTitle = '💖 두근두근 기대작';

  const monthlyVideosTemplate = 'monthly';
  const monthlyVideosTitle = '🌰 따끈~따끈한 신작';

  const videosTemplate = 'default';
  const videosTitle = '🍟 이건 어때요?';

  const genresTitle = '장르';

  return (
    <main className={styles.home__main}>
      <section className={styles.home__preview__section}>
        <VideosPreview videos={previewVideos} />
      </section>

      <section className={styles.home__main__section}>
        <VideosHorizontal videos={rankingVideos} template={rankingVideosTemplate}>
          <div className={vhStyles.horizontal__title__wrapper}>
            <h2 className={vhStyles.horizontal__title}>{rankingVideosTitle}</h2>
          </div>
        </VideosHorizontal>

        <GenresVertical genres={genres}>
          <div className={vhStyles.horizontal__title__wrapper}>
            <h2 className={`${vhStyles.horizontal__title} ${vhStyles.genre}`}>
              <LayoutIcon width={24} height={25} />
              {genresTitle}
            </h2>
          </div>
        </GenresVertical>

        <VideosHorizontal videos={comingVideos} template={comingVideosTemplate}>
          <div className={vhStyles.horizontal__title__wrapper}>
            <h2 className={vhStyles.horizontal__title}>{comingVideosTitle}</h2>
          </div>
        </VideosHorizontal>

        <VideosHorizontal videos={monthlyVideos} template={monthlyVideosTemplate}>
          <div className={vhStyles.horizontal__title__wrapper}>
            <h2 className={vhStyles.horizontal__title}>{monthlyVideosTitle}</h2>
          </div>
        </VideosHorizontal>

        {!isEmpty(screenMA02Videos) && (
          <VideosHorizontal videos={screenMA02Videos} template={screenMA02Template}>
            <div className={vhStyles.horizontal__title__wrapper}>
              <h2 className={vhStyles.horizontal__title}>{screenMA02Title}</h2>
            </div>
          </VideosHorizontal>
        )}

        {!isEmpty(screenMA03Videos) && (
          <VideosHorizontal videos={screenMA03Videos} template={screenMA03Template}>
            <div className={vhStyles.horizontal__title__wrapper}>
              <h2 className={vhStyles.horizontal__title}>{screenMA03Title}</h2>
            </div>
          </VideosHorizontal>
        )}

        {!isEmpty(screenMA04Videos) && (
          <VideosHorizontal videos={screenMA04Videos} template={screenMA04Template}>
            <div className={vhStyles.horizontal__title__wrapper}>
              <h2 className={vhStyles.horizontal__title}>{screenMA04Title}</h2>
            </div>
          </VideosHorizontal>
        )}

        {!isEmpty(screenMA05Videos) && (
          <VideosHorizontal videos={screenMA05Videos} template={screenMA05Template}>
            <div className={vhStyles.horizontal__title__wrapper}>
              <h2 className={vhStyles.horizontal__title}>{screenMA05Title}</h2>
            </div>
          </VideosHorizontal>
        )}

        <section className={vvStyles.vertical__videos__section}>
          <div className={vvStyles.vertical__title__wrapper}>
            <h2 className={vvStyles.vertical__title}>{videosTitle}</h2>
          </div>
          <div className={vvStyles.vertical__videos__wrapper}>
            {videos.map((video, index) => (
              <VideoItem key={index} video={video} />
            ))}
          </div>
        </section>
      </section>
    </main>
  );
};

export default Home;
