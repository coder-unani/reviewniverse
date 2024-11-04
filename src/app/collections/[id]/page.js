import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { isEmpty } from 'lodash';

import { COLLECTIONS_REVALIDATE_SEC } from '@/config/constants';
import { EndpointManager, ENDPOINTS } from '@/config/endpoints';
import { fParseInt, fDiffDate } from '@/utils/format';
import { fetchCollectionVideos } from '@/library/api/videos';
import ProfileImage from '@/components/ui/Button/Profile/Image';
import Video from '@/components/ui/Video';
import CollectionLikeButton from '@/components/ui/Button/Collection/Like';

import styles from '@/styles/pages/Collections.module.scss';
import vStyles from '@/styles/components/Videos.module.scss';

// ISR 재생성 주기 설정
export const revalidate = COLLECTIONS_REVALIDATE_SEC;

// 데이터 초기화
const initCollectionVideos = (result) => {
  const collection = {
    id: 0,
    title: '',
    description: '',
    thumbnail: [],
    user: {},
    data: [],
    created_at: '',
    updated_at: '',
  };

  if (!isEmpty(result)) {
    collection.id = result.id || 0;
    collection.title = result.title || '';
    collection.description = result.description || '';
    collection.thumbnail = result.thumbnail || [];
    collection.user = result.user || {};
    collection.data = result.data || [];
    collection.created_at = result.created_at || '';
    collection.updated_at = result.updated_at || '';
  }

  return collection;
};

// Collections API 호출
const getCollectionVideos = async ({ collectionId }) => {
  const res = await fetchCollectionVideos({ collectionId });
  if (res.status === 200) {
    return res.data.data;
  }
  return {};
};

// 메타 태그 설정

const Collections = async ({ params }) => {
  const { id } = params;
  const collectionId = fParseInt(id);

  // 숫자가 아닌 경우 notFound 페이지로 이동
  if (collectionId === 0) notFound();

  const result = await getCollectionVideos({ collectionId });
  const collection = initCollectionVideos(result);

  const referrer = 'collections';

  return (
    <main className={styles.collection__main}>
      <section className={styles.collection__section}>
        <div className={styles.collection__info__wrapper}>
          <div className={styles.collection__control__wrapper}>
            <CollectionLikeButton collectionId={collectionId} />
          </div>

          <Link
            href={EndpointManager.generateUrl(ENDPOINTS.USER, { userId: collection.user.id })}
            className={styles.collection__profile__link}
          >
            <ProfileImage image={collection.user.profile_image} size={20} />
            <span className={styles.collection__profile__nickname}>{collection.user.nickname}</span>
            {collection.user.id === 0 && <span className={styles.collection__profile__badge}>운영자</span>}
          </Link>

          <p className={styles.collection__more__wrapper}>
            <span>작품 {collection.data.length}</span>
            &middot;
            <span>{fDiffDate(collection.updated_at) || fDiffDate(collection.created_at)} 업데이트</span>
          </p>

          <h2 className={styles.collection__title}>{collection.title}</h2>
          {collection.description && <p className={styles.collection__subtitle}>{collection.description}</p>}
        </div>
      </section>

      <section className={vStyles.vertical__videos__section}>
        <div className={vStyles.vertical__videos__wrapper}>
          {collection.data.map((video) => (
            <Video video={video} referrer={referrer} referrerKey={collectionId} key={video.id} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Collections;
