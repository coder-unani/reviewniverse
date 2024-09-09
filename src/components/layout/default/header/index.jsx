'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthContext } from '@/contexts/AuthContext';
import { useThemeContext } from '@/contexts/ThemeContext';
import { EndpointManager, ENDPOINTS } from '@/config/endpoints';
import { isEmpty } from 'lodash';
import LogoIcon from '@/resources/icons/logo-white.svg';
import SearchIcon from '@/resources/icons/search.svg';
import MenuIcon from '@/resources/icons/menu.svg';
import styles from '@/styles/components/Header.module.scss';

// dynamic import
const SearchForm = dynamic(() => import('@/components/ui/SearchForm'), {
  ssr: false,
});
const ProfileImage = dynamic(
  () => import('@/components/ui/Button/Profile/Image'),
  { ssr: false }
);
const MenuModal = dynamic(() => import('@/components/ui/Modal/Menu'), {
  ssr: false,
});

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuthContext();
  const { isMobile } = useThemeContext();
  const [isMenuModal, setIsMenuModal] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const isSearch = pathname === ENDPOINTS.SEARCH;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 모바일 메뉴 토글
  const toggleMobileMenu = () => {
    setIsMenuModal((prev) => !prev);
  };

  // 검색 페이지로 이동
  const handleMobileSearch = () => {
    router.push(ENDPOINTS.SEARCH);
  };

  // 헤더 로고
  const Logo = () => (
    <h1 className={styles.header__logo}>
      <Link href={ENDPOINTS.HOME} className={styles.header__logo__link}>
        <LogoIcon width={145} height={40} />
      </Link>
    </h1>
  );

  // 모바일 헤더
  const MobileHeader = () => {
    // 기본 모바일 헤더 렌더링
    const renderDefault = () => (
      <section className={styles.header__mobile__wrapper}>
        <Logo />
        <section className={styles.toolbar__container}>
          <SearchIcon
            className={styles.search__button}
            width={32}
            height={32}
            onClick={handleMobileSearch}
          />
          <MenuIcon
            className={styles.menu__button}
            width={32}
            height={32}
            onClick={toggleMobileMenu}
          />
        </section>
      </section>
    );

    // 검색 모바일 헤더 렌더링
    const renderSearch = () => (
      <section className="header__search__wrapper">
        <Suspense fallback={<div>Loading...</div>}>
          <SearchForm />
        </Suspense>
        <MenuIcon
          className={styles.menu__button}
          width={32}
          height={32}
          onClick={toggleMobileMenu}
        />
      </section>
    );

    // 검색 페이지 여부에 따라 기본 또는 검색 모바일 헤더 렌더링
    return isSearch ? renderSearch() : renderDefault();
  };

  // 기본 헤더
  const DefaultHeader = () => {
    // 프로필 이미지 렌더링
    const renderProfile = () => {
      const path = EndpointManager.generateUrl(ENDPOINTS.USER, {
        userId: user.id,
      });
      // TODO: suppressHydrationWarning 안쓰는 방법 찾기
      return (
        <Link
          href={path}
          className={styles.toolbar__user}
          suppressHydrationWarning
        >
          <ProfileImage image={user.profile_image} size={34} />
        </Link>
      );
    };

    // 로그인 버튼 렌더링
    const renderLogin = () => (
      <Link href={ENDPOINTS.USER_LOGIN} className={styles.toolbar__login}>
        로그인
      </Link>
    );

    // 로그인 여부에 따라 프로필 이미지 또는 로그인 버튼 렌더링
    return (
      <section className={styles.header__wrapper}>
        <Logo />
        <section className={styles.search__container}>
          <Suspense fallback={<div>Loading...</div>}>
            <SearchForm />
          </Suspense>
        </section>
        <section className={styles.toolbar__container}>
          {isMounted && isEmpty(user) ? renderLogin() : renderProfile()}
        </section>
      </section>
    );
  };

  // 기본 헤더: DefaultHeader, 모바일 헤더: MobileHeader
  return (
    <header className={styles.header}>
      {isMobile ? <MobileHeader /> : <DefaultHeader />}
      {isMenuModal && <MenuModal onClose={toggleMobileMenu} />}
    </header>
  );
};

export default Header;
