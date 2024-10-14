'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isEmpty } from 'lodash';

import { EndpointManager, ENDPOINTS } from '@/config/endpoints';
import { MESSAGES } from '@/config/messages';
import { SETTINGS } from '@/config/settings';
import { fProviderCode } from '@/utils/formatContent';
import { useAuthContext } from '@/contexts/AuthContext';
import { useThemeContext } from '@/contexts/ThemeContext';
import { showSuccessToast, showErrorToast } from '@/components/ui/Toast';
import LoginLoading from '@/components/ui/LoginLoading';
import JoinAgree from '@/components/ui/JoinAgree';
import BackButton from '@/components/ui/Button/Back';

import styles from '@/styles/pages/UserAuth.module.scss';

const AuthNaverCallback = () => {
  const router = useRouter();
  const { user, login, join } = useAuthContext();
  const { isMobile } = useThemeContext();
  const [snsUser, setSnsUser] = useState(null);
  const [isAgree, setIsAgree] = useState(false);
  const [agreeValues, setAgreeValues] = useState({});

  const handleNaverLogin = async () => {
    try {
      const { naver } = window;
      const naverLogin = new naver.LoginWithNaverId({
        clientId: SETTINGS.NAVER_CLIENT_ID,
        callbackUrl: SETTINGS.NAVER_CALLBACK_URL,
        isPopup: false,
      });

      naverLogin.init();

      naverLogin.getLoginStatus(async (status) => {
        if (status) {
          const naverUser = naverLogin.user;

          const loginUser = {
            code: fProviderCode('naver'),
            email: naverUser.email,
            sns_id: naverUser.id,
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
              email: naverUser.email,
              sns_id: naverUser.id,
              nickname: naverUser.nickname,
              profile_image: naverUser.profile_image,
            });
          } else {
            // TODO: 이메일/닉네임 유효성 검사
            throw new Error(MESSAGES[resLogin.code]);
          }
        } else {
          throw new Error(MESSAGES.L002);
        }
      });
    } catch (error) {
      setSnsUser(null);
      router.push(ENDPOINTS.USER_LOGIN);
      showErrorToast(error.message);
    }
  };

  const handleSocialJoin = async (_snsUser, _agreeValues) => {
    try {
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
      const path = EndpointManager.generateUrl(ENDPOINTS.USER, { userId: user.id });
      router.push(path);
    }

    // 네이버 SDK 동적 로드
    const script = document.createElement('script');
    script.src = 'https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2-nopolyfill.js';
    script.type = 'text/javascript';
    script.async = true;
    document.body.appendChild(script);

    // SDK 로드 완료 후 handleNaverLogin 호출
    script.onload = () => {
      handleNaverLogin();
    };

    // 컴포넌트 언마운트 시 스크립트 제거
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (!snsUser || !isAgree || isEmpty(agreeValues)) return;
    handleSocialJoin(snsUser, agreeValues);
  }, [snsUser, isAgree, agreeValues]);

  /*
  // TODO: 네이버 로그인 SDK 사용하지 않고 구현하려고 했으나, CORS 문제로 인해 실패 및 보류
  useEffect(() => {
    handleNaverLogin();
  }, []);

  const handleNaverLogin = async () => {
    try {
      const code = searchParams.get('code');
      const state = searchParams.get('state');

      if (code) {
        const client = new AxiosClient();
        client.setHeader({
          'X-Naver-Client-Id': SETTINGS.NAVER_CLIENT_ID,
          'X-Naver-Client-Secret': SETTINGS.NAVER_CLIENT_SECRET,
        });
        const tokenRes = await client.get(`https://nid.naver.com/oauth2.0/token`, null, {
          grant_type: 'authorization_code',
          client_id: SETTINGS.NAVER_CLIENT_ID,
          client_secret: SETTINGS.NAVER_CLIENT_SECRET,
          redirect_uri: encodeURIComponent(SETTINGS.NAVER_CALLBACK_URL),
          code: code,
          state: state,
        });
        console.log(tokenRes);
        return;
        const accessToken = tokenRes.data.access_token;

        client.setHeader({ Authorization: `Bearer ${accessToken}` });
        const userRes = await client.get(`https://openapi.naver.com/v1/nid/me`);
        const naverUser = userRes.data;

        const loginUser = {
          code: fProviderCode('naver'),
          email: naverUser.email,
          sns_id: naverUser.id,
        };

        const res = await login(loginUser);
        if (res.status) {
          showSuccessToast(MESSAGES[res.code]);
          router.push(ENDPOINTS.HOME);
        } else {
          if (res.code === 'L003') {
            setSnsUser({
              code: loginUser.code,
              email: naverUser.email,
              sns_id: naverUser.id,
              nickname: naverUser.nickname,
              profile_image: naverUser.profile_image,
            });
          } else {
            setSnsUser(null);
            router.push(ENDPOINTS.USER_LOGIN);
            showErrorToast(MESSAGES[res.code]);
          }
        }
      }
    } catch (error) {
      console.log(error);
      // setSnsUser(null);
      // router.push(ENDPOINTS.USER_LOGIN);
      // showErrorToast(MESSAGES["L002"]);
    }
  };
  */

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

export default AuthNaverCallback;
