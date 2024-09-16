'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import BackButton from '@/components/ui/Button/Back';
import { useAuthContext } from '@/contexts/AuthContext';
import { useThemeContext } from '@/contexts/ThemeContext';
import LoginService from '@/services/LoginService';
import { ENDPOINTS } from '@/config/endpoints';
import { isEmpty } from 'lodash';

const UsersLogin = () => {
  const router = useRouter();
  const { user } = useAuthContext();
  const { isMobile } = useThemeContext();

  useEffect(() => {
    if (!isEmpty(user)) {
      router.push(ENDPOINTS.HOME);
    }
  }, [user]);

  useEffect(() => {
    const kakaoButton = document.querySelector('.login-kakao-button');
    kakaoButton.addEventListener('click', () => {
      LoginService.handleKakaoLogin();
    });

    const naverButton = document.querySelector('.login-naver-button');
    naverButton.addEventListener('click', () => {
      LoginService.handleNaverLogin();
    });

    const googleButton = document.querySelector('.login-google-button');
    googleButton.addEventListener('click', () => {
      LoginService.handleGoogleLogin(router);
    });
  }, []);

  return isMobile && <BackButton />;
};

export default UsersLogin;
