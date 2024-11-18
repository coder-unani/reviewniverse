import React from 'react';
import { nanoid } from 'nanoid';
import { isEmpty } from 'lodash';

import Collection from '@/components/ui/Collection';
import CollectionsSwiperClient from '@/components/ui/Client/CollectionsSwiper';

import ArrowLeftIcon from '@/resources/icons/arrow-left.svg';
import ArrowRightIcon from '@/resources/icons/arrow-right.svg';
import styles from '@/styles/components/VideosSwiper.module.scss';

const CollectionsSwiper = ({ children, collections }) => {
  if (isEmpty(collections)) return null;

  // 고유 아이디 생성
  const uniqueId = nanoid();

  return (
    <>
      <section className={styles.horizontal__videos__section}>
        {children}
        <div className={`${styles.horizontal__videos__wrapper} ${styles.collection}`}>
          <div className={`swiper ${styles.horizontal__videos}`} data-swiper-id={uniqueId}>
            <div className="swiper-wrapper collection-template">
              {collections.map((collection) => (
                <div className="swiper-slide" key={collection.id}>
                  <Collection collection={collection} />
                </div>
              ))}
            </div>
          </div>
          <button
            type="button"
            className={`swiper-prev-button ${styles.horizontal__prev__button}`}
            data-swiper-id={uniqueId}
            disabled // 초기 비활성화
          >
            <ArrowLeftIcon width={28} height={28} />
          </button>
          <button
            type="button"
            className={`swiper-next-button ${styles.horizontal__next__button}`}
            data-swiper-id={uniqueId}
          >
            <ArrowRightIcon width={28} height={28} />
          </button>
        </div>
      </section>

      {/* 클라이언트 컴포넌트에서 Swiper 제어 */}
      <CollectionsSwiperClient uniqueId={uniqueId} />
    </>
  );
};

export default CollectionsSwiper;
