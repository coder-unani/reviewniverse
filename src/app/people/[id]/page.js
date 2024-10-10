import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import { isEmpty } from 'lodash';

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
import { EndpointManager, ENDPOINTS } from '@/config/endpoints';
import { SETTINGS } from '@/config/settings';
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

// 데이터 초기화
const initPeopleVideos = (result) => {
  const videos = {
    total: 0,
    count: 0,
    page: 1,
    data: [],
    metadata: {
      query: '',
      by: '',
      person: {
        id: 0,
        name: '',
        name_og: '',
        sex: '',
        birth: '',
        country: '',
        job: '',
        picture: '',
        profile: '',
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
    videos.metadata.person = {
      id: result.metadata?.person?.id || 0,
      name: result.metadata?.person?.name || '',
      name_og: result.metadata?.person?.name_og || '',
      sex: result.metadata?.person?.sex || '',
      birth: result.metadata?.person?.birth || '',
      country: result.metadata?.person?.country || '',
      job: result.metadata?.person?.job || '',
      picture: result.metadata?.person?.picture || '',
      profile: result.metadata?.person?.profile || '',
    };
  }

  return videos;
};

// People API 호출
const getPeopleVideos = async ({ peopleId }) => {
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

  const result = await getPeopleVideos({ peopleId });
  const videos = initPeopleVideos(result);

  // TODO: 트위터, 페이스북, 카카오, 네이버 메타태그 설정
  const isIndex = videos.data.length > 0;
  const person = videos.metadata.person;
  const title = `${person.name} 필모그래피 | 리뷰니버스`;
  const description = `${person.name}의 작품들을 확인해보세요.`;
  const imageUrl = `${SETTINGS.CDN_BASE_URL}/${person.picture}`;
  const path = EndpointManager.generateUrl(ENDPOINTS.PEOPLE, { peopleId: person.id });
  const url = `${SETTINGS.SITE_BASE_URL}${path}`;
  const keywords = `${SITE_KEYWORDS}, ${PEOPLE_KEYWORDS}, ${person.name}의 작품, ${person.name}${person.name_og ? `, ${person.name_og}` : ''}`;

  return {
    robots: {
      index: isIndex,
    },
    alternates: {
      canonical: url,
    },
    title: title,
    description: description,
    keywords: keywords,
    openGraph: {
      url: url,
      title: title,
      description: description,
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

const People = async ({ params }) => {
  const { id } = params;
  const peopleId = fParseInt(id);
  // 숫자가 아닌 경우 notFound 페이지로 이동
  if (peopleId === 0) {
    notFound();
  }

  const result = await getPeopleVideos({ peopleId });
  const videos = initPeopleVideos(result);

  const person = videos.metadata.person;
  const subtitle = '필모그래피';
  // page 1의 데이터가 size(20)보다 작으면 enabled를 false로 설정
  const enabled = videos.total > PEOPLE_PAGE_SIZE;

  // 프로필 타일
  const ProfileTile = ({ title, desc }) => (
    <div className={styles.people__profile}>
      <span className={styles.people__profile__title}>{title}</span>
      <span className={styles.people__profile__desc}>{desc}</span>
    </div>
  );

  return (
    <main className={styles.people__main}>
      <section className={styles.people__section}>
        <div className={styles.people__info__container}>
          <PeopleImage
            image={fMakeImageUrl(person.picture, DEFAULT_IMAGES.noActor)}
            size={100}
            alt={person.name}
            priority={true}
          />
          <div className={styles.people__info__wrapper}>
            <div className={styles.people__name__wrapper}>
              <h1 className={styles.people__name}>{person.name}</h1>
              {person.name_og && <p className={styles.people__name__og}>{person.name_og}</p>}
            </div>
            <div className={styles.people__profile__wrapper}>
              {person.birth && <ProfileTile title="출생" desc={person.birth} />}
              {person.country && <ProfileTile title="국적" desc={person.country} />}
              {person.job && <ProfileTile title="직업" desc={person.job} />}
            </div>
          </div>
        </div>
      </section>

      <section className={vStyles.vertical__videos__section}>
        <div className={vStyles.vertical__title__wrapper}>
          <h2 className={vStyles.vertical__subtitle}>{subtitle}</h2>
        </div>
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
