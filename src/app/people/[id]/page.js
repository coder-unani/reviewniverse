'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, notFound } from 'next/navigation';
import { useVideos } from '@/hooks/useVideos';
import PeopleImage from '@/components/ui/Button/People/Image';
import VideosVertical from '@/components/ui/VideosVertical';
import { showErrorToast } from '@/components/ui/Toast';
import { SETTINGS } from '@/config/settings';
import { MESSAGES } from '@/config/messages';
import { DEFAULT_IMAGES } from '@/config/constants';
import { EndpointManager, ENDPOINTS } from '@/config/endpoints';
import { fParseInt } from '@/utils/format';
import { isEmpty } from 'lodash';
import styles from '@/styles/pages/People.module.scss';

/*
// 메타 태그 설정
export const metadata = ({ params }) => {
  const title = `${name} - 리뷰니버스`;
  const description = `${name}의 ${videos.total}개 작품`;
  const imageUrl = people.picture;
  const path = EndpointManager.generateUrl(ENDPOINTS.PEOPLE, { peopleId });
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
          url: imageUrl,
          width: 220,
          height: 220,
          alt: name,
        },
      ],
    },
  };
};
*/

/**
 * TODO:
 * - people로 통합됐는데, target 값이 필요한가?
 */

export default function page({ params }) {
  // const navigate = useNavigate();
  const router = useRouter();
  const { id } = params;
  const peopleId = fParseInt(id);
  // const location = useLocation();
  // const people =
  //   location.state && location.state.people ? location.state.people : {};
  // const target =
  //   location.state && location.state.target ? location.state.target : '';
  const [page, setPage] = useState(1);
  const [videos, setVideos] = useState(null);
  const {
    data: videosData,
    error: videosError,
    isLoading: videosIsLoading,
  } = useVideos({
    query: peopleId,
    page,
    mode: 'id',
    // target,
    orderBy: 'release_desc',
    enabled: peopleId,
    // enabled: peopleId || !isEmpty(people) || !isEmpty(target),
  });

  /*
  useEffect(() => {
    if (peopleId === 0 || isEmpty(people) || isEmpty(target)) {
      notFound();
    }
  }, [peopleId, people, target]);
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
          data: prev.data ? [...prev.data, ...videosData.data.data] : [],
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
    <main className={styles.people__main}>
      <section className={styles.people__section}>
        <div className={styles.people__info__wrapper}>
          {/* <PeopleImage image={people.picture} size={100} /> */}
          <PeopleImage image={DEFAULT_IMAGES.noActor} size={100} />
          {/* <h1 className={styles.people__name>{people.name}</h1> */}
          <h1 className={styles.people__name}>배우명</h1>
        </div>
      </section>
      <VideosVertical videos={videos} handlePage={handlePage} />
    </main>
  );
}
