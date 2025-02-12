import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { isEmpty } from 'lodash';

import {
  UPCOMING_REVALIDATE_SEC,
  UPCOMING_PAGE_SIZE,
  SITE_KEYWORDS,
  UPCOMING_KEYWORDS,
  DEFAULT_IMAGES,
} from '@/config/constants';
import { ENDPOINTS } from '@/config/endpoints';
import { SETTINGS } from '@/config/settings';
import { fetchUpcomingVideos } from '@/library/api/videos';
import VideoForUpcoming from '@/components/ui/VideoForUpcoming';

import styles from '@/styles/pages/Upcoming.module.scss';
import vStyles from '@/styles/components/Videos.module.scss';

const UpcomingComponent = dynamic(() => import('@/components/ui/Upcoming'), { ssr: false });

// ISR 재생성 주기 설정
export const revalidate = UPCOMING_REVALIDATE_SEC;

// 데이터 초기화
const initUpcomingVideos = (result) => {
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
    revalidate: UPCOMING_REVALIDATE_SEC,
  };
  // Coming Videos API 호출
  const res = await fetchUpcomingVideos({ ...options });
  if (res.status === 200) {
    return res.data;
  }
  return [];
};

// 메타 태그 설정
export const generateMetadata = async () => {
  // TODO: 트위터, 페이스북, 카카오, 네이버 메타태그 설정
  const title = `공개 예정작 | 리뷰니버스`;
  const description = `OTT 공개 예정작을 확인해보세요.`;
  const imageUrl = DEFAULT_IMAGES.logo;
  const pathname = ENDPOINTS.UPCOMING;
  const url = `${SETTINGS.SITE_BASE_URL}${pathname}`;
  const keywords = `${SITE_KEYWORDS}, ${UPCOMING_KEYWORDS}`;

  return {
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

const Upcoming = async () => {
  const result = await getUpcomingVideos();
  const videos = initUpcomingVideos(result);
  // page 1의 데이터가 size(50)보다 작으면 enabled를 false로 설정
  const enabled = videos.total > UPCOMING_PAGE_SIZE;

  return (
    <main className={styles.upcoming__main}>
      <section className={styles.upcoming__section}>
        <div className={styles.upcoming__title__wrapper}>
          <h2 className={styles.upcoming__title}>공개 예정작</h2>
        </div>
      </section>

      <section className={vStyles.vertical__videos__section}>
        <div className={vStyles.vertical__videos__wrapper}>
          {videos.data.map((video) => (
            <VideoForUpcoming video={video} key={video.id} />
          ))}
          <Suspense fallback="">
            <UpcomingComponent enabled={enabled} />
          </Suspense>
        </div>
      </section>
    </main>
  );
};

export default Upcoming;
