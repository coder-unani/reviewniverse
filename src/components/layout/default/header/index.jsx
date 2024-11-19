'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';

import { ENDPOINTS } from '@/config/endpoints';
import { useThemeContext } from '@/contexts/ThemeContext';
import { useModalContext } from '@/contexts/ModalContext';
import Logo from '@/components/ui/Logo';
import SearchForm from '@/components/ui/SearchForm';

import MenuIcon from '@/resources/icons/menu.svg';
import styles from '@/styles/components/Header.module.scss';

const DefaultHeader = dynamic(() => import('@/components/layout/default/header/Default'), { ssr: false });
const MobileHeader = dynamic(() => import('@/components/layout/default/header/Mobile'), { ssr: false });

// TODO: 검색 페이지에서 검색 모달로 변경

const Header = () => {
  const pathname = usePathname();
  const { isMobile } = useThemeContext();
  const { toggleMenuModal } = useModalContext();
  const isSearch = pathname.includes(ENDPOINTS.SEARCH);

  // 헤더 스타일 변경
  useEffect(() => {
    // TODO: 고도화 필요, 홈 페이지일 때만 헤더 스타일 변경
    const header = document.querySelector('header');
    const isContentIdPath = /^\/contents\/\d+$/.test(pathname);
    // 메인화면 프리뷰 섹션을 없애면서 HOME 페이지 헤더 스타일 변경 삭제
    // if (pathname !== ENDPOINTS.HOME && !isContentIdPath) {
    if (!isContentIdPath) {
      header.classList.remove('transparent');
      return undefined;
    }

    const handleScroll = () => {
      if (window.scrollY > 100 && header.classList.contains('transparent')) {
        header.classList.remove('transparent');
      } else if (window.scrollY <= 100 && !header.classList.contains('transparent')) {
        header.classList.add('transparent');
      }
    };

    window.addEventListener('scroll', handleScroll);
    header.classList.add('transparent');

    // clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
      header.classList.remove('transparent');
    };
  }, [pathname]);

  return (
    <header className={`${styles.header} transparent`}>
      {isMobile && isSearch ? (
        // 모바일 검색 헤더 렌더링
        <section className="header__search__wrapper">
          <SearchForm />
          <MenuIcon className={styles.menu__button} width={32} height={32} onClick={toggleMenuModal} />
        </section>
      ) : (
        // 기본 헤더 렌더링
        <section className={`${styles.header__wrapper}${isMobile ? ` ${styles.mobile}` : ''}`}>
          <Link href={ENDPOINTS.HOME} className={styles.header__logo__link} aria-label="홈">
            <Logo />
          </Link>
          {isMobile ? <MobileHeader /> : <DefaultHeader />}
        </section>
      )}
    </header>
  );
};

export default Header;
