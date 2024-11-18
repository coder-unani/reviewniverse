import React from 'react';
// import { isEmpty } from 'lodash';

// import { SCREEN_MAIN_ID } from '@/config/codes';
import {
  HOME_REVALIDATE_SEC,
  GENRES_REVALIDATE_SEC,
  REVIEWS_REVALIDATE_SEC,
  COLLECTION_CODE_OPTIONS,
  // VIDEO_ORDER_OPTIONS,
  // VIDEO_TERMS_OPTIONS,
  // VIDEO_MODEL_OPTIONS,
} from '@/config/constants';
import { ENDPOINTS } from '@/config/endpoints';
// import { fExportScreenDataByCode } from '@/utils/formatContent';
// import { fetchScreenVideos, fetchCollectionVideos, fetchVideos, fetchUpcomingVideos } from '@/library/api/videos';
import { fetchCollectionVideos, fetchUpcomingVideos } from '@/library/api/videos';
import { fetchRankingVideos, fetchRankingGenres } from '@/library/api/ranking';
import { fetchReviews } from '@/library/api/reviews';
// import VideosSwiperForPreview from '@/components/ui/VideosSwiperForPreview';
import VideosSwiper from '@/components/ui/VideosSwiper';
import GenresSwiper from '@/components/ui/GenresSwiper';
import ReviewsSwiper from '@/components/ui/ReviewsSwiper';
// import CollectionsSwiper from '@/components/ui/CollectionsSwiper';
import Collection from '@/components/ui/Collection';
import MoreButton from '@/components/ui/Button/More';
// import Video from '@/components/ui/Video';

import styles from '@/styles/pages/Home.module.scss';
import vhStyles from '@/styles/components/VideosSwiper.module.scss';
// import vvStyles from '@/styles/components/Videos.module.scss';
import cvStyles from '@/styles/components/Collections.module.scss';

// ISR 재생성 주기 설정
export const revalidate = HOME_REVALIDATE_SEC;

// Screen 컨텐츠
// const getScreenVideos = async () => {
//   const options = {
//     code: SCREEN_MAIN_ID,
//     display: VIDEO_MODEL_OPTIONS.DETAIL,
//     revalidate: HOME_REVALIDATE_SEC,
//   };
//   // Screen Videos API 호출
//   const res = await fetchScreenVideos({ ...options });
//   if (res.status === 200) {
//     return res.data.data;
//   }
//   return [];
// };

// Ranking 컨텐츠
const getRankingVideos = async () => {
  const options = {
    code: new Date().toISOString().slice(0, 10).replace(/-/g, ''),
    count: 20,
    revalidate: HOME_REVALIDATE_SEC,
  };
  // Ranking Videos API 호출
  const res = await fetchRankingVideos({ ...options });
  if (res.status === 200) {
    return res.data.data;
  }
  return [];
};

// Upcoming 컨텐츠
const getUpcomingVideos = async () => {
  const options = {
    page: 1,
    size: 20,
    revalidate: HOME_REVALIDATE_SEC,
  };
  // Coming Videos API 호출
  const res = await fetchUpcomingVideos({ ...options });
  if (res.status === 200) {
    return res.data.data;
  }
  return [];
};

// Current 컨텐츠
// const getCurrentVideos = async () => {
//   const options = {
//     page: 1,
//     size: 20,
//     orderBy: VIDEO_ORDER_OPTIONS.RELEASE_ASC,
//     terms: VIDEO_TERMS_OPTIONS.CURRENT,
//     revalidate: HOME_REVALIDATE_SEC,
//   };
//   // Current Videos API 호출
//   const res = await fetchVideos({ ...options });
//   if (res.status === 200) {
//     return res.data.data;
//   }
//   return [];
// };

// 기본 컨텐츠
// const getDefaultVideos = async () => {
//   const options = {
//     page: 1,
//     size: 100,
//     orderBy: VIDEO_ORDER_OPTIONS.RELEASE_DESC,
//     terms: VIDEO_TERMS_OPTIONS.RELEASED,
//     revalidate: HOME_REVALIDATE_SEC,
//   };
//   // Videos API 호출
//   const res = await fetchVideos({ ...options });
//   if (res.status === 200) {
//     return res.data.data;
//   }
//   return [];
// };

// Genres
const getGenres = async () => {
  const options = {
    count: 50,
    revalidate: GENRES_REVALIDATE_SEC,
  };
  // Ranking Genres API 호출
  const res = await fetchRankingGenres({ ...options });
  if (res.status === 200) {
    return res.data.data;
  }
  return [];
};

// Reviews
const getReviews = async () => {
  const options = {
    page: 1,
    size: 20,
    revalidate: REVIEWS_REVALIDATE_SEC,
  };
  // Reviews API 호출
  const res = await fetchReviews({ ...options });
  if (res.status === 200) {
    return res.data.data;
  }
  return [];
};

// Collections
const getCollections = async () => {
  const options = {
    page: 1,
    size: 8,
    code: COLLECTION_CODE_OPTIONS.COLLECTION,
    revalidate: HOME_REVALIDATE_SEC,
  };
  // Collections API 호출
  const res = await fetchCollectionVideos({ ...options });
  if (res.status === 200) {
    return res.data.data;
  }
  return [];
};

const Home = async () => {
  // 데이터 페칭
  const [
    // screenVideos,
    rankingVideos,
    upcomingVideos,
    // currentVideos,
    // videos,
    genres,
    reviews,
    collections,
  ] = await Promise.all([
    // getScreenVideos(),
    getRankingVideos(),
    getUpcomingVideos(),
    // getCurrentVideos(),
    // getDefaultVideos(),
    getGenres(),
    getReviews(),
    getCollections(),
  ]);

  const referrer = 'home';

  // const previewData = fExportScreenDataByCode(screenVideos, 'MA01');
  // const previewVideos = previewData.content.list || [];
  // const previewReferrerKey = 'MA01';

  // const screenMA02Data = fExportScreenDataByCode(screenVideos, 'MA02');
  // const screenMA02Videos = screenMA02Data?.content.list || [];
  // const screenMA02ReferrerKey = 'MA02';
  // const screenMA02Template = screenMA02Data?.content.template || '';
  // const screenMA02Title = screenMA02Data?.title || '';

  // const screenMA03Data = fExportScreenDataByCode(screenVideos, 'MA03');
  // const screenMA03Videos = screenMA03Data?.content.list || [];
  // const screenMA03ReferrerKey = 'MA03';
  // const screenMA03Template = screenMA03Data?.content.template || '';
  // const screenMA03Title = screenMA03Data?.title || '';

  // const screenMA04Data = fExportScreenDataByCode(screenVideos, 'MA04');
  // const screenMA04Videos = screenMA04Data?.content.list || [];
  // const screenMA04ReferrerKey = 'MA04';
  // const screenMA04Template = screenMA04Data?.content.template || '';
  // const screenMA04Title = screenMA04Data?.title || '';

  // const screenMA05Data = fExportScreenDataByCode(screenVideos, 'MA05');
  // const screenMA05Videos = screenMA05Data?.content.list || [];
  // const screenMA05ReferrerKey = 'MA05';
  // const screenMA05Template = screenMA05Data?.content.template || '';
  // const screenMA05Title = screenMA05Data?.title || '';

  const rankingVideosTemplate = 'rank';
  const rankingReferrerKey = 'ranking';
  const rankingVideosTitle = '🍿 오늘의 인기순위';
  const rankingVideosSubtitle = 'POPULAR ON REVIEWNIVERSE';

  const upcomingVideosTemplate = 'upcoming';
  const upcomingReferrerKey = 'upcoming';
  const upcomingVideosTitle = '💖 두근두근 기대작';
  const upcomingVideosSubtitle = 'NEW ON REVIEWNIVERSE';
  const upcomingMoreLink = ENDPOINTS.UPCOMING;
  const upcomingMoreTitle = '더보기';
  const upcomingMoreSubtitle = '공개 예정작 보러가기';

  // const currentVideosTemplate = 'default';
  // const currentReferrerKey = 'current';
  // const currentVideosTitle = '🌰 따끈~따끈한 신작';
  // const currentVideosSubtitle = 'NEW RELEASE';

  // const videosTemplate = 'default';
  // const videosReferrerKey = 'default';
  // const videosTitle = '🍟 이건 어때요?';
  // const videosSubtitle = 'RECOMMEND';

  const genresTitle = '🔫 장르별 작품들';
  const genresSubtitle = 'WORKS BY GENRE';

  const reviewsTitle = '👀 최근 작품 감상평';
  const reviewsSubtitle = 'RECENTLY REVIEWS';
  const reviewsMoreLink = ENDPOINTS.RECENTREVIEWS;
  const reviewsMoreTitle = '더보기';
  const reviewsMoreSubtitle = '리뷰 보러가기';

  const collectionsTitle = '🧩 리뷰니버스가 추천하는 작품 모음';
  const collectionsSubtitle = 'RECOMMEND ON REVIEWNIVERSE';
  const collectionsMoreLink = ENDPOINTS.COLLECTIONS;
  const collectionsMoreTitle = '더보기';
  const collectionsMoreSubtitle = '컬렉션 보러가기';

  return (
    <main className={styles.home__main}>
      {/* 콘텐츠 프리뷰: 애드센스를 위해 보류 */}
      {/* <section className={styles.home__preview__section}>
        <VideosSwiperForPreview videos={previewVideos} referrer={referrer} referrerKey={previewReferrerKey} />
      </section> */}

      <section className={styles.home__main__section}>
        {/* 리뷰 리스트 */}
        <ReviewsSwiper reviews={reviews}>
          <div className={vhStyles.horizontal__title__wrapper}>
            <h2 className={vhStyles.horizontal__title}>
              {reviewsTitle}
              <span className={vhStyles.horizontal__subtitle}>| {reviewsSubtitle}</span>
            </h2>
            <MoreButton link={reviewsMoreLink} title={reviewsMoreTitle} subtitle={reviewsMoreSubtitle} />
          </div>
        </ReviewsSwiper>

        {/* 컬렉션 리스트 */}
        {/* <CollectionsSwiper collections={collections}>
          <div className={vhStyles.horizontal__title__wrapper}>
            <h2 className={vhStyles.horizontal__title}>
              {collectionsTitle}
              <span className={vhStyles.horizontal__subtitle}>| {collectionsSubtitle}</span>
            </h2>
            <MoreButton link={collectionsMoreLink} title={collectionsMoreTitle} subtitle={collectionsMoreSubtitle} />
          </div>
        </CollectionsSwiper> */}
        <section className={cvStyles.vertical__collections__section}>
          <div className={cvStyles.vertical__title__wrapper}>
            <h2 className={cvStyles.vertical__title}>
              {collectionsTitle}
              <span className={cvStyles.vertical__subtitle}>| {collectionsSubtitle}</span>
            </h2>
            <MoreButton link={collectionsMoreLink} title={collectionsMoreTitle} subtitle={collectionsMoreSubtitle} />
          </div>
          <ul className={cvStyles.vertical__collections__wrapper}>
            {collections.map((collection) => (
              <li className={cvStyles.vertical__collections__item} key={collection.id}>
                <Collection collection={collection} />
              </li>
            ))}
          </ul>
        </section>

        {/* 랭킹 콘텐츠 리스트 */}
        <VideosSwiper
          videos={rankingVideos}
          template={rankingVideosTemplate}
          referrer={referrer}
          referrerKey={rankingReferrerKey}
        >
          <div className={vhStyles.horizontal__title__wrapper}>
            <h2 className={vhStyles.horizontal__title}>
              {rankingVideosTitle}
              <span className={vhStyles.horizontal__subtitle}>| {rankingVideosSubtitle}</span>
            </h2>
          </div>
        </VideosSwiper>

        {/* 장르 리스트 */}
        <GenresSwiper genres={genres}>
          <div className={vhStyles.horizontal__title__wrapper}>
            <h2 className={vhStyles.horizontal__title}>
              {genresTitle}
              <span className={vhStyles.horizontal__subtitle}>| {genresSubtitle}</span>
            </h2>
          </div>
        </GenresSwiper>

        {/* upcoming 콘텐츠 리스트 */}
        <VideosSwiper
          videos={upcomingVideos}
          template={upcomingVideosTemplate}
          referrer={referrer}
          referrerKey={upcomingReferrerKey}
        >
          <div className={vhStyles.horizontal__title__wrapper}>
            <h2 className={vhStyles.horizontal__title}>
              {upcomingVideosTitle}
              <span className={vhStyles.horizontal__subtitle}>| {upcomingVideosSubtitle}</span>
            </h2>
            <MoreButton link={upcomingMoreLink} title={upcomingMoreTitle} subtitle={upcomingMoreSubtitle} />
          </div>
        </VideosSwiper>

        {/* current 콘텐츠 리스트: 애드센스를 위해 보류 */}
        {/* <VideosSwiper
          videos={currentVideos}
          template={currentVideosTemplate}
          referrer={referrer}
          referrerKey={currentReferrerKey}
        >
          <div className={vhStyles.horizontal__title__wrapper}>
            <h2 className={vhStyles.horizontal__title}>
              {currentVideosTitle}
              <span className={vhStyles.horizontal__subtitle}>| {currentVideosSubtitle}</span>
            </h2>
          </div>
        </VideosSwiper> */}

        {/* screen 콘텐츠 리스트: 애드센스를 위해 보류 */}
        {/* {!isEmpty(screenMA02Videos) && (
          <VideosSwiper
            videos={screenMA02Videos}
            template={screenMA02Template}
            referrer={referrer}
            referrerKey={screenMA02ReferrerKey}
          >
            <div className={vhStyles.horizontal__title__wrapper}>
              <h2 className={vhStyles.horizontal__title}>
                {screenMA02Title}
                <span className={vhStyles.horizontal__subtitle}>| {videosSubtitle}</span>
              </h2>
            </div>
          </VideosSwiper>
        )}

        {!isEmpty(screenMA03Videos) && (
          <VideosSwiper
            videos={screenMA03Videos}
            template={screenMA03Template}
            referrer={referrer}
            referrerKey={screenMA03ReferrerKey}
          >
            <div className={vhStyles.horizontal__title__wrapper}>
              <h2 className={vhStyles.horizontal__title}>
                {screenMA03Title}
                <span className={vhStyles.horizontal__subtitle}>| {videosSubtitle}</span>
              </h2>
            </div>
          </VideosSwiper>
        )}

        {!isEmpty(screenMA04Videos) && (
          <VideosSwiper
            videos={screenMA04Videos}
            template={screenMA04Template}
            referrer={referrer}
            referrerKey={screenMA04ReferrerKey}
          >
            <div className={vhStyles.horizontal__title__wrapper}>
              <h2 className={vhStyles.horizontal__title}>
                {screenMA04Title}
                <span className={vhStyles.horizontal__subtitle}>| {videosSubtitle}</span>
              </h2>
            </div>
          </VideosSwiper>
        )}

        {!isEmpty(screenMA05Videos) && (
          <VideosSwiper
            videos={screenMA05Videos}
            template={screenMA05Template}
            referrer={referrer}
            referrerKey={screenMA05ReferrerKey}
          >
            <div className={vhStyles.horizontal__title__wrapper}>
              <h2 className={vhStyles.horizontal__title}>
                {screenMA05Title}
                <span className={vhStyles.horizontal__subtitle}>| {videosSubtitle}</span>
              </h2>
            </div>
          </VideosSwiper>
        )} */}

        {/* 기본 콘텐츠 리스트: 애드센스를 위해 보류 */}
        {/* <section className={vvStyles.vertical__videos__section}>
          <div className={vvStyles.vertical__title__wrapper}>
            <h2 className={vvStyles.vertical__title}>
              {videosTitle}
              <span className={vhStyles.horizontal__subtitle}>| {videosSubtitle}</span>
            </h2>
          </div>
          <div className={vvStyles.vertical__videos__wrapper}>
            {videos.map((video) => (
              <Video video={video} referrer={referrer} referrerKey={videosReferrerKey} key={video.id} />
            ))}
          </div>
        </section> */}
      </section>
    </main>
  );
};

export default Home;
