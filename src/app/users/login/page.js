import React from 'react';
import dynamic from 'next/dynamic';
import { DEFAULT_IMAGES } from '@/config/constants';
import styles from '@/styles/pages/Login.module.scss';

const UsersLoginClient = dynamic(() => import('@/components/ui/Client/UsersLogin'), { ssr: false });

/**
 * TODO:
 * - fallback 스켈레톤 UI 추가
 */

const UsersLogin = () => {
  const loginTitle = '소셜 로그인';
  const kakaoButton = '카카오로 시작하기';
  const naverButton = '네이버로 시작하기';
  const googleButton = '구글로 시작하기';

  return (
    <main className={styles.login__main}>
      <div className={styles.login__header}>
        <img src={DEFAULT_IMAGES.logoWhite} alt="리뷰니버스 로고" className={styles.login__header__logo} />
        <h2 className={styles.login__header__title}>{loginTitle}</h2>
      </div>
      <div className={styles.login__content}>
        <button type="button" className={`login-kakao-button ${styles.login__button} ${styles.kakao}`}>
          <img className={styles.login__button__image} src={DEFAULT_IMAGES.kakao} alt="kakao" />
          {kakaoButton}
        </button>
        <div id="naverIdLogin" style={{ display: 'none' }} />
        <button type="button" className={`login-naver-button ${styles.login__button} ${styles.naver}`}>
          <img className={styles.login__button__image} src={DEFAULT_IMAGES.naver} alt="naver" />
          {naverButton}
        </button>
        <button type="button" className={`login-google-button ${styles.login__button} ${styles.google}`}>
          <img className={styles.login__button__image} src={DEFAULT_IMAGES.google} alt="google" />
          {googleButton}
        </button>
      </div>
      <UsersLoginClient />
    </main>
  );
};

export default UsersLogin;
