import React from 'react';
import Image from 'next/image';

import { DEFAULT_IMAGES } from '@/config/constants';

import styles from '@/styles/pages/Search.module.scss';

const SearchHome = () => {
  return (
    <main className={styles.search__main}>
      <section className={styles.search__section}>
        <div className={styles.no__search__content}>
          <Image
            className={styles.no__search__image}
            src={DEFAULT_IMAGES.searchNotFound}
            alt="검색 결과 없음"
            width={240}
            height={240}
            priority
          />
          <p className={styles.no__search__title}>어떤 작품을 찾으세요? 👀</p>
          <p className={styles.no__search__subtitle}>찾고싶은 영화나 시리즈를 검색해보세요!</p>
        </div>
      </section>
    </main>
  );
};

export default SearchHome;
