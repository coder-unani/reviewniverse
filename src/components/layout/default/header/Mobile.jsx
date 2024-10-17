'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import { ENDPOINTS } from '@/config/endpoints';
import { useModalContext } from '@/contexts/ModalContext';

import SearchIcon from '@/resources/icons/search.svg';
import MenuIcon from '@/resources/icons/menu.svg';
import styles from '@/styles/components/Header.module.scss';

const MobileHeader = () => {
  const router = useRouter();
  const { toggleMenuModal } = useModalContext();

  // 검색 페이지로 이동
  const handleMobileSearch = () => {
    router.push(ENDPOINTS.SEARCH);
  };

  return (
    <section className={styles.toolbar__container}>
      <SearchIcon className={styles.search__button} width={32} height={32} onClick={handleMobileSearch} />
      <MenuIcon className={styles.menu__button} width={32} height={32} onClick={toggleMenuModal} />
    </section>
  );
};

export default MobileHeader;
