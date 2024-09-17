'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthContext } from '@/contexts/AuthContext';
import { useThemeContext } from '@/contexts/ThemeContext';
import SearchForm from '@/components/ui/SearchForm';
import ProfileImage from '@/components/ui/Button/Profile/Image';
import MenuModal from '@/components/ui/Modal/Menu';
import { EndpointManager, ENDPOINTS } from '@/config/endpoints';
import { isEmpty } from 'lodash';
import LogoIcon from '@/resources/icons/logo-white.svg';
import SearchIcon from '@/resources/icons/search.svg';
import MenuIcon from '@/resources/icons/menu.svg';
import styles from '@/styles/components/Header.module.scss';

// TODO: 검색 페이지에서 검색 모달로 변경

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuthContext();
  const { isMobile } = useThemeContext();
  const [isMenuModal, setIsMenuModal] = useState(false);
  const isSearch = pathname.includes(ENDPOINTS.SEARCH);

  // 헤더 스타일 변경
  useEffect(() => {
    // 홈 페이지일 때만 헤더 스타일 변경
    // TODO: 고도화 필요
    const isContentIdPath = /^\/contents\/\d+$/.test(pathname);
    if (pathname !== ENDPOINTS.HOME && !isContentIdPath) return;

    const header = document.querySelector('header');
    const handleScroll = () => {
      if (window.scrollY > 100 && header.classList.contains('transparent')) {
        header.classList.remove('transparent');
      } else if (window.scrollY <= 100 && !header.classList.contains('transparent')) {
        header.classList.add('transparent');
      }
    };
    window.addEventListener('scroll', handleScroll);
    header.classList.add('transparent');
    return () => {
      window.removeEventListener('scroll', handleScroll);
      header.classList.remove('transparent');
    };
  }, [pathname]);

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
      <Link href={ENDPOINTS.HOME} className={styles.header__logo__link} aria-label="홈">
        <LogoIcon width={145} height={40} />
      </Link>
    </h1>
  );

  // 모바일 헤더
  const MobileHeader = () => {
    // 기본 모바일 헤더 렌더링
    const DefaultMobileHeader = () => (
      <section className={styles.header__mobile__wrapper}>
        <Logo />
        <section className={styles.toolbar__container}>
          <SearchIcon className={styles.search__button} width={32} height={32} onClick={handleMobileSearch} />
          <MenuIcon className={styles.menu__button} width={32} height={32} onClick={toggleMobileMenu} />
        </section>
      </section>
    );

    // 검색 모바일 헤더 렌더링
    const SearchMobileHeader = () => (
      <section className="header__search__wrapper">
        <SearchForm />
        <MenuIcon className={styles.menu__button} width={32} height={32} onClick={toggleMobileMenu} />
      </section>
    );

    // 검색 페이지 여부에 따라 기본 또는 검색 모바일 헤더 렌더링
    return isSearch ? <SearchMobileHeader /> : <DefaultMobileHeader />;
  };

  // 기본 헤더
  const DefaultHeader = () => {
    // 프로필 이미지 렌더링
    const ProfileLink = () => {
      const path = EndpointManager.generateUrl(ENDPOINTS.USER, { userId: user.id });
      return (
        <Link href={path} className={styles.toolbar__user}>
          <ProfileImage image={user.profile_image} size={34} />
        </Link>
      );
    };

    // 로그인 버튼 렌더링
    const LoginLink = () => (
      <Link href={ENDPOINTS.USER_LOGIN} className={styles.toolbar__login}>
        로그인
      </Link>
    );

    // 로그인 여부에 따라 프로필 이미지 또는 로그인 버튼 렌더링
    return (
      <section className={styles.header__wrapper}>
        <Logo />
        <section className={styles.search__container}>
          <SearchForm />
        </section>
        <section className={styles.toolbar__container}>{isEmpty(user) ? <LoginLink /> : <ProfileLink />}</section>
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
