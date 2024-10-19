'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { isEmpty } from 'lodash';

import { EndpointManager, ENDPOINTS } from '@/config/endpoints';
import { MESSAGES } from '@/config/messages';
import { SETTINGS } from '@/config/settings';
import { fProviderCode } from '@/utils/formatContent';
import AxiosClient from '@/utils/AxiosClient';
import { useAuthContext } from '@/contexts/AuthContext';
import { useThemeContext } from '@/contexts/ThemeContext';
import { showSuccessToast, showErrorToast } from '@/components/ui/Toast';
import LoginLoading from '@/components/ui/LoginLoading';
import JoinAgree from '@/components/ui/JoinAgree';
import BackButton from '@/components/ui/Button/Back';

import styles from '@/styles/pages/UserAuth.module.scss';

const AuthKakaoCallback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, login, join } = useAuthContext();
  const { isMobile } = useThemeContext();
  const [snsUser, setSnsUser] = useState(null);
  const [isAgree, setIsAgree] = useState(false);
  const [agreeValues, setAgreeValues] = useState({});

  const handleKakaoLogin = async () => {
    try {
      const code = searchParams.get('code');
      if (code) {
        const client = new AxiosClient();
        const resToken = await client.post(`https://kauth.kakao.com/oauth/token`, null, {
          grant_type: 'authorization_code',
          client_id: SETTINGS.KAKAO_API_KEY,
          redirect_uri: SETTINGS.KAKAO_CALLBACK_URL,
          code,
        });
        const accessToken = resToken.data.access_token;

        client.setHeader({ Authorization: `Bearer ${accessToken}` });
        const resKakaoUser = await client.get(`https://kapi.kakao.com/v2/user/me`);
        const kakaoUser = resKakaoUser.data;

        const loginUser = {
          code: fProviderCode('kakao'),
          email: kakaoUser.kakao_account.email,
          sns_id: kakaoUser.id.toString(),
        };

        // 가입여부 확인 (로그인)
        const resLogin = await login(loginUser);
        if (resLogin.status) {
          // 로그인 성공
          showSuccessToast(MESSAGES[resLogin.code]);
          router.push(ENDPOINTS.HOME);
        } else if (resLogin.code === 'L003') {
          // 유저 존재하지 않음, 회원가입 필요
          setSnsUser({
            code: loginUser.code,
            email: kakaoUser.kakao_account.email,
            sns_id: kakaoUser.id.toString(),
            nickname: kakaoUser.properties.nickname,
            profile_image: kakaoUser.properties.profile_image,
          });
        } else {
          // TODO: 이메일/닉네임 유효성 검사
          throw new Error(MESSAGES[resLogin.code]);
        }
      } else {
        throw new Error(MESSAGES.L002);
      }
    } catch (error) {
      setSnsUser(null);
      router.push(ENDPOINTS.USER_LOGIN);
      showErrorToast(error.message);
    }
  };

  const handleSocialJoin = async (_snsUser, _agreeValues) => {
    const joinUser = {
      code: _snsUser.code,
      email: _snsUser.email,
      sns_id: _snsUser.sns_id,
      nickname: _snsUser.nickname,
      profile_image: _snsUser.profile_image,
      is_privacy_agree: _agreeValues.privacy,
      is_terms_agree: _agreeValues.terms,
      is_age_agree: _agreeValues.age,
      is_marketing_agree: _agreeValues.marketing,
    };

    try {
      const resJoin = await join(joinUser);
      if (resJoin.status) {
        // 회원가입 성공
        showSuccessToast(MESSAGES[resJoin.code]);
        const loginUser = {
          code: joinUser.code,
          email: joinUser.email,
          sns_id: joinUser.sns_id,
        };

        // 로그인 시도
        const resLogin = await login(loginUser);
        if (resLogin.status) {
          // 로그인 성공 후 회원 취향 등록 페이지로 이동
          router.push(ENDPOINTS.USER_WATCHTYPE);
        } else {
          // 로그인 실패
          throw new Error(MESSAGES[resLogin.code]);
        }
      } else {
        // 회원가입 실패
        throw new Error(MESSAGES[resJoin.code]);
      }
    } catch (error) {
      // 회원가입 실패
      showErrorToast(error.message);
      router.push(ENDPOINTS.USER_LOGIN);
    } finally {
      setSnsUser(null);
    }
  };

  useEffect(() => {
    if (user) {
      showErrorToast(MESSAGES.L002);
      const pathname = EndpointManager.generateUrl(ENDPOINTS.USER, { userId: user.id });
      router.push(pathname);
    }
    handleKakaoLogin();
  }, []);

  useEffect(() => {
    if (!snsUser || !isAgree || isEmpty(agreeValues)) return;
    handleSocialJoin(snsUser, agreeValues);
  }, [snsUser, isAgree, agreeValues]);

  return snsUser ? (
    <>
      {isMobile && <BackButton />}
      <div className={styles.join__header}>
        <h2 className={styles.join__header__title}>SNS 간편 로그인</h2>
      </div>
      <JoinAgree setIsAgree={setIsAgree} setAgreeValues={setAgreeValues} />
    </>
  ) : (
    <LoginLoading />
  );
};

export default AuthKakaoCallback;
