import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { EndpointManager, ENDPOINTS } from '@/config/endpoints';
import { fThumbnail } from '@/utils/formatContent';
import ProfileImage from '@/components/ui/Button/Profile/Image';

import styles from '@/styles/components/Collection.module.scss';

const Collection = ({ collection }) => {
  const collectionLink = EndpointManager.generateUrl(ENDPOINTS.COLLECTION, { collectionId: collection.id });
  const profileLink = EndpointManager.generateUrl(ENDPOINTS.USER, { userId: collection.user.id });

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
        {collection.user && (
          <div className={styles.collection__profile__wrapper}>
            <Link href={profileLink} className={styles.collection__profile__link}>
              <ProfileImage image={collection.user.profile_image} size={20} />
              <span className={styles.collection__profile__nickname}>{collection.user.nickname}</span>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Collection;
