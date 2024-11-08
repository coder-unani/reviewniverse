import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { EndpointManager, ENDPOINTS } from '@/config/endpoints';
import { fThumbnail } from '@/utils/formatContent';

import styles from '@/styles/components/CollectionForList.module.scss';

const CollectionForList = ({ collection }) => {
  const collectionLink = EndpointManager.generateUrl(ENDPOINTS.COLLECTION, { collectionId: collection.id });

  return (
    <>
      <Link
        href={collectionLink}
        className={styles.collection__link}
        aria-label={`${collection.title} 컬렉션 보러가기`}
      >
        <ul className={styles.collection__image__wrapper}>
          {/* 4개 고정 반복 */}
          {Array.from({ length: 4 }).map((_, index) => (
            <li className={styles.collection__image} key={index}>
              {collection.thumbnail[index] && (
                <Image
                  className={styles.collection__thumbnail}
                  src={fThumbnail(collection.thumbnail[index])}
                  alt={collection.title}
                  width={120}
                  height={180}
                  quality={100}
                  loading="lazy"
                />
              )}
            </li>
          ))}
        </ul>
      </Link>
      <div className={styles.collection__info__wrapper}>
        <Link href={collectionLink} className={styles.collection__title__link}>
          <span className={styles.collection__title}>{collection.title}</span>
        </Link>
        {collection.description && <p className={styles.collection__desc}>{collection.description}</p>}
      </div>
    </>
  );
};

export default CollectionForList;
