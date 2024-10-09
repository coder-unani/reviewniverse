import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { isEmpty } from 'lodash';

import { UPCOMING_REVALIDATE_SEC, UPCOMING_PAGE_SIZE } from '@/config/constants';
// import { fDateToKorean } from '@/utils/format';
// import { fGroupDataByRelease } from '@/utils/formatContent';
import { fetchUpcomingVideos } from '@/library/api/videos';
import VideoForUpcoming from '@/components/ui/VideoForUpcoming';
// import VideosSwiper from '@/components/ui/VideosSwiper';

import styles from '@/styles/pages/Upcoming.module.scss';
import vStyles from '@/styles/components/Videos.module.scss';
// import vsStyles from '@/styles/components/VideosSwiper.module.scss';

const UpcomingComponent = dynamic(() => import('@/components/ui/Upcoming'), { ssr: false });

// ISR 재생성 주기 설정
export const revalidate = UPCOMING_REVALIDATE_SEC;

// 데이터 초기화
export const initUpcomingVideos = (result) => {
  const videos = {
    total: 0,
    count: 0,
    page: 1,
    data: [],
  };

  if (!isEmpty(result)) {
    videos.total = result.total || 0;
    videos.count = result.count || 0;
    videos.page = result.page || 1;
    videos.data = result.data || [];
  }

  return videos;
};

// UpComing 컨텐츠
const getUpcomingVideos = async () => {
  const options = {
    page: 1,
    size: UPCOMING_PAGE_SIZE,
  };

  // Coming Videos API 호출
  const res = await fetchUpcomingVideos({ ...options });
  if (res.status === 200) {
    return res.data;
  } else {
    return [];
  }
};

// TODO: 메타 태그 설정

const Upcoming = async () => {
  const result = await getUpcomingVideos();
  const videos = initUpcomingVideos(result);
  // page 1의 데이터가 size(20)보다 작으면 enabled를 false로 설정
  const enabled = videos.total > UPCOMING_PAGE_SIZE;

  // const releaseVideos = fGroupDataByRelease(videos.data);

  return (
    <main className={styles.upcoming__main}>
      <section className={styles.upcoming__section}>
        <div className={styles.upcoming__title__wrapper}>
          <h1 className={styles.upcoming__title}>공개 예정작</h1>
        </div>
      </section>

      {/* {Object.entries(releaseVideos).map(([release, videos]) => (
        <VideosSwiper videos={videos} template={'upcoming'} key={release}>
          <div className={vsStyles.horizontal__title__wrapper}>
            <h2 className={vsStyles.horizontal__title}>{fDateToKorean(release)}</h2>
          </div>
        </VideosSwiper>
      ))} */}

      <section className={vStyles.vertical__videos__section}>
        <div className={vStyles.vertical__videos__wrapper}>
          {videos.data.map((video) => (
            <VideoForUpcoming video={video} key={video.id} />
          ))}
        </div>
        <Suspense fallback={''}>
          <UpcomingComponent enabled={enabled} />
        </Suspense>
      </section>
    </main>
  );
};

export default Upcoming;
