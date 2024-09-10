'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/contexts/AuthContext';
import { useThemeContext } from '@/contexts/ThemeContext';
import BackButton from '@/components/ui/Button/Back';
import LoginService from '@/services/LoginService';
import { DEFAULT_IMAGES } from '@/config/constants';
import { ENDPOINTS } from '@/config/endpoints';
import { isEmpty } from 'lodash';
import styles from '@/styles/pages/Login.module.scss';

export default function page() {
  const router = useRouter();
  const { user } = useAuthContext();
  const { isMobile } = useThemeContext();

  useEffect(() => {
    if (!isEmpty(user)) {
      router.push(ENDPOINTS.HOME);
    }
  }, [user]);

  return (
    <main className={styles.login__main}>
      {isMobile && <BackButton />}
      <div className={styles.login__header}>
        <img src={DEFAULT_IMAGES.logoWhite} alt="리뷰니버스 로고" className={styles.login__header__logo} />
        <h2 className={styles.login__header__title}>소셜 로그인</h2>
      </div>
      <div className={styles.login__content}>
        <button
          type="button"
          className={`${styles.login__button} ${styles.kakao}`}
          onClick={() => LoginService.handleKakaoLogin()}
        >
          <img className={styles.login__button__image} src={DEFAULT_IMAGES.kakao} alt="kakao" />
          카카오로 시작하기
        </button>
        <div id="naverIdLogin" style={{ display: 'none' }} />
        <button
          type="button"
          className={`${styles.login__button} ${styles.naver}`}
          onClick={() => LoginService.handleNaverLogin()}
        >
          <img className={styles.login__button__image} src={DEFAULT_IMAGES.naver} alt="naver" />
          네이버로 시작하기
        </button>
        <button
          type="button"
          className={`${styles.login__button} ${styles.google}`}
          onClick={() => LoginService.handleGoogleLogin(router)}
        >
          <img className={styles.login__button__image} src={DEFAULT_IMAGES.google} alt="google" />
          구글로 시작하기
        </button>
      </div>
    </main>
  );
}
