'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isEmpty } from 'lodash';

import { ENDPOINTS } from '@/config/endpoints';
import { useAuthContext } from '@/contexts/AuthContext';
import LoginService from '@/services/LoginService';

const UsersLogin = () => {
  const router = useRouter();
  const { user } = useAuthContext();

  useEffect(() => {
    if (!isEmpty(user)) {
      router.push(ENDPOINTS.HOME);
    }
  }, [user]);

  useEffect(() => {
    // 외부 스크립트 삽입
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2-nopolyfill.js';
    script.async = true;

    // 스크립트를 head에 추가
    document.head.appendChild(script);

    const naverButton = document.querySelector('.login-naver-button');
    script.onload = () => {
      naverButton.addEventListener('click', LoginService.handleNaverLogin);
    };

    const kakaoButton = document.querySelector('.login-kakao-button');
    kakaoButton.addEventListener('click', LoginService.handleKakaoLogin);

    const googleButton = document.querySelector('.login-google-button');
    googleButton.addEventListener('click', () => LoginService.handleGoogleLogin(router));

    // 컴포넌트가 언마운트될 때 스크립트 제거
    return () => {
      document.head.removeChild(script);

      naverButton.removeEventListener('click', LoginService.handleNaverLogin);
      kakaoButton.removeEventListener('click', LoginService.handleKakaoLogin);
      googleButton.removeEventListener('click', LoginService.handleGoogleLogin);
    };
  }, []);

  // return isMobile && <BackButton />;
  return null;
};

export default UsersLogin;
