import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import { isEmpty } from 'lodash';

import { SETTINGS } from '@/config/settings';
import { EndpointManager, ENDPOINTS } from '@/config/endpoints';
import {
  PEOPLE_REVALIDATE_SEC,
  SITE_KEYWORDS,
  PEOPLE_KEYWORDS,
  PEOPLE_PAGE_SIZE,
  VIDEO_ORDER_OPTIONS,
  VIDEO_MODE_OPTIONS,
  VIDEO_BY_OPTIONS,
  DEFAULT_IMAGES,
} from '@/config/constants';
import { fParseInt } from '@/utils/format';
import { fMakeImageUrl } from '@/utils/formatContent';
import { fetchVideos } from '@/library/api/videos';
import PeopleImage from '@/components/ui/Button/People/Image';
import Video from '@/components/ui/Video';

import styles from '@/styles/pages/People.module.scss';
import vStyles from '@/styles/components/Videos.module.scss';

const Filmography = dynamic(() => import('@/components/ui/Filmography'), { ssr: false });

// ISR 재생성 주기 설정
export const revalidate = PEOPLE_REVALIDATE_SEC;

// People
const getPeopleVideos = async ({ peopleId }) => {
  // 인물 정보 조회 API 호출
  const options = {
    page: 1,
    size: PEOPLE_PAGE_SIZE,
    orderBy: VIDEO_ORDER_OPTIONS.RELEASE_DESC,
    mode: VIDEO_MODE_OPTIONS.ID,
    by: VIDEO_BY_OPTIONS.PERSON,
    query: peopleId,
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
  const peopleId = fParseInt(id);
  // 숫자가 아닌 경우 notFound 페이지로 이동
  if (peopleId === 0) {
    notFound();
  }

  const videos = await getPeopleVideos({ peopleId });
  if (isEmpty(videos)) {
    return {};
  }

  // TODO: 트위터, 페이스북, 카카오, 네이버 메타태그 설정
  const person = videos.metadata.person;
  const name = person.name;
  const description = `${name}의 작품 목록`;
  const imageUrl = `${SETTINGS.CDN_BASE_URL}/${person.picture}`;
  const path = EndpointManager.generateUrl(ENDPOINTS.PEOPLE, { peopleId: person.id });
  const url = `${SETTINGS.SITE_BASE_URL}${path}`;
  const keywords = `${SITE_KEYWORDS}, ${PEOPLE_KEYWORDS}, ${name}, ${name}의 작품`;

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

const People = async ({ params }) => {
  const { id } = params;
  const peopleId = fParseInt(id);
  // 숫자가 아닌 경우 notFound 페이지로 이동
  if (peopleId === 0) {
    notFound();
  }

  const videos = await getPeopleVideos({ peopleId });
  if (isEmpty(videos)) {
    return;
  }

  const person = videos.metadata.person;
  const personName = person.name;
  const personPicture = person.picture;
  const personProfile = person.profile;

  // page 1의 데이터가 size(20)보다 작으면 enabled를 false로 설정
  const enabled = videos.total > PEOPLE_PAGE_SIZE;

  return (
    <main className={styles.people__main}>
      <section className={styles.people__section}>
        <div className={styles.people__info__wrapper}>
          <PeopleImage
            image={fMakeImageUrl(personPicture, DEFAULT_IMAGES.noActor)}
            size={100}
            alt={personName}
            priority={true}
          />
          <h1 className={styles.people__name}>{personName}</h1>
        </div>
      </section>

      <section className={vStyles.vertical__videos__section}>
        <div className={vStyles.vertical__videos__wrapper}>
          {videos.data.map((video) => (
            <Video video={video} key={video.id} />
          ))}
          <Suspense fallback={''}>
            <Filmography peopleId={peopleId} enabled={enabled} />
          </Suspense>
        </div>
      </section>
    </main>
  );
};

export default People;
