// 클라이언트 사이드에서만 사용되는 컴포넌트
// 'use client';

// import { useRouter } from 'next/navigation';
import Link from 'next/link';
// import React, { useEffect, useState } from 'react';
import { EndpointManager, ENDPOINTS } from '@/config/endpoints';
import SearchForm from '@/components/ui/SearchForm';
import LogoIcon from '@/resources/icons/logo-white.svg';
import SearchIcon from '@/resources/icons/search.svg';
import MenuIcon from '@/resources/icons/menu.svg';
import styles from '@/styles/Header.module.scss';

// import { useAuthContext } from '/src/context/AuthContext';
// import { useThemeContext } from '/src/context/ThemeContext';
// import MenuModal from '/src/components/Modal/Menu';
// import ProfileImage from '/src/components/Button/Profile/Image';

const Header = () => {
  // const router = useRouter();
  // const [isMenuModal, setIsMenuModal] = useState(false);
  // const isSearch = router.pathname === ENDPOINTS.SEARCH;
  // const { user } = useAuthContext();
  // const { isMobile } = useThemeContext();

  const toggleMobileMenu = () => {
    setIsMenuModal((prev) => !prev);
  };

  // const handleMobileSearch = () => {
  //   router.push(ENDPOINTS.SEARCH);
  // };

  // 헤더 로고
  const Logo = () => (
    <h1 className={styles.header__logo}>
      <Link href={ENDPOINTS.HOME} className={styles.header__logo__link}>
        <LogoIcon width={145} height={40} />
      </Link>
    </h1>
  );

  /*
  // 모바일 헤더
  const MobileHeader = () => {
    // 기본 모바일 헤더
    const defaultMobile = () => (
      <section className={styles.header__mobile__wrapper}>
        <Logo />
        <section className={styles.toolbar__container}>
          <SearchIcon className={styles.search__button} onClick={handleMobileSearch} />
          <MenuIcon className={styles.menu__button} onClick={toggleMobileMenu} />
        </section>
      </section>
    );

    // 검색 모바일 헤더
    const searchMobile = () => (
      <section className={styles.header__search__wrapper}>
        <SearchForm />
        <MenuIcon className={styles.menu__button} onClick={toggleMobileMenu} />
      </section>
    );

    return isSearch ? searchMobile() : defaultMobile();
  };
  */

  // 기본 헤더
  const DefaultHeader = () => {
    /*
    // 프로필 이미지
    const renderProfile = () => {
      const path = EndpointManager.generateUrl(ENDPOINTS.USER, {
        userId: user.id,
      });
      return (
        <Link href={path} className={styles.toolbar__user}>
          <ProfileImage image={user.profile_image} size={34} />
        </Link>
      );
    };
    */

    // 로그인 버튼
    const renderLogin = () => (
      <Link href={ENDPOINTS.USER_LOGIN} className={styles.toolbar__login}>
        로그인
      </Link>
    );

    return (
      <section className={styles.header__wrapper}>
        <Logo />
        <section className={styles.search__container}>
          <SearchForm />
        </section>
        <section className={styles.toolbar__container}>
          {/* {user ? renderProfile() : renderLogin()} */}
          {renderLogin()}
        </section>
      </section>
    );
  };

  const renderHeader = () => {
    // 기본 헤더: DefaultHeader, 모바일 헤더: MobileHeader
    // return isMobile ? <MobileHeader /> : <DefaultHeader />;
    return DefaultHeader();
  };

  return (
    <header className={styles.header}>
      {renderHeader()}
      {/* {isMenuModal && <MenuModal onClose={toggleMobileMenu} />} */}
    </header>
  );
};

export default Header;
