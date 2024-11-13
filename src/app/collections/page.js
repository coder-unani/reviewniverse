import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

import { COLLECTIONS_REVALIDATE_SEC, COLLECTIONS_PAGE_SIZE, COLLECTION_CODE_OPTIONS } from '@/config/constants';
import { fetchCollectionVideos } from '@/library/api/videos';
import CollectionForList from '@/components/ui/CollectionForList';

import styles from '@/styles/pages/Collections.module.scss';

const CollectionsComponent = dynamic(() => import('@/components/ui/Collections'), { ssr: false });

// ISR 재생성 주기 설정
export const revalidate = COLLECTIONS_REVALIDATE_SEC;

// 데이터 초기화
const initCollectionVideos = (result) => {
  const collections = {
    total: 0,
    count: 0,
    page: 1,
    data: [],
    metadata: {},
  };

  if (result) {
    collections.total = result.total || 0;
    collections.count = result.count || 0;
    collections.page = result.page || 1;
    collections.data = result.data || [];
    collections.metadata = result.metadata || {};
  }

  return collections;
};

// CollectionDetail API 호출
const getCollectionVideos = async () => {
  const options = {
    page: 1,
    size: COLLECTIONS_PAGE_SIZE,
    code: COLLECTION_CODE_OPTIONS.COLLECTION,
    revalidate: COLLECTIONS_REVALIDATE_SEC,
  };

  const res = await fetchCollectionVideos({ ...options });
  if (res.status === 200) {
    return res.data;
  }
  return {};
};

// TODO: 메타 태그 설정

const Collections = async () => {
  const result = await getCollectionVideos();
  const collections = initCollectionVideos(result);
  const subtitle = '컬렉션';
  // page 1의 데이터가 size(20)보다 작으면 enabled를 false로 설정
  const enabled = collections.total > COLLECTIONS_PAGE_SIZE;

  return (
    <main className={styles.collections__main}>
      <section className={styles.collections__section}>
        <div className={styles.collections__title__wrapper}>
          {/* <p className={styles.collections__subtitle}>{subtitle}</p> */}
          <h2 className={styles.collections__title}>{subtitle}</h2>
        </div>
      </section>

      <section className={styles.collections__videos__section}>
        <ul className={styles.collections__videos__wrapper}>
          {collections.data.map((collection) => (
            <li className={styles.collection__item} key={collection.id}>
              <CollectionForList collection={collection} />
            </li>
          ))}
          <Suspense fallback="">
            <CollectionsComponent enabled={enabled} />
          </Suspense>
        </ul>
      </section>
    </main>
  );
};

export default Collections;
