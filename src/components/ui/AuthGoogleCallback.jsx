'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { isEmpty, set } from 'lodash';
import { signInWithPopup, signInWithRedirect, getRedirectResult } from 'firebase/auth';
import { auth, provider } from '@/library/firebase';

import { DEFAULT_IMAGES } from '@/config/constants';
import { EndpointManager, ENDPOINTS } from '@/config/endpoints';
import { MESSAGES } from '@/config/messages';
import { fProviderCode } from '@/utils/formatContent';
import { useAuthContext } from '@/contexts/AuthContext';
import { useThemeContext } from '@/contexts/ThemeContext';
import { showSuccessToast, showErrorToast } from '@/components/ui/Toast';
import { getSessionStorage, setSessionStorage, removeSessionStorage } from '@/utils/storage';
import LoginLoading from '@/components/ui/LoginLoading';
import JoinAgree from '@/components/ui/JoinAgree';
import BackButton from '@/components/ui/Button/Back';

import styles from '@/styles/pages/UserAuth.module.scss';

const AuthGoogleCallback = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, login, join } = useAuthContext();
  const { isMobile } = useThemeContext();
  const [snsUser, setSnsUser] = useState(null);
  const [isAgree, setIsAgree] = useState(false);
  const [agreeValues, setAgreeValues] = useState({});
  const [isProcessed, setIsProcessed] = useState(false);

  useEffect(() => {
    // 구글 로그인
    const handleGoogleLogin = async () => {
      try {
        // 모바일 구글 로그인 콜백 함수
        const result = await getRedirectResult(auth);
        if (result && result.user) {
          // 모바일 구글 로그인 성공
          const googleUser = result.user;
          await processLogin(googleUser);
          setIsProcessed(true);
        } else if (!isProcessed && isMobile) {
          // 모바일 구글 로그인
          await signInWithRedirect(auth, provider);
        } else if (!isProcessed && !isMobile) {
          // PC 구글 로그인
          const result = await signInWithPopup(auth, provider);
          const googleUser = result.user;
          await processLogin(googleUser);
          setIsProcessed(true);
        }
      } catch (error) {
        setSnsUser(null);
        showErrorToast(error.message);
        router.push(ENDPOINTS.USER_LOGIN);
      }
    };

    // 사이트 로그인
    const processLogin = async (googleUser) => {
      // 로그인 유저 데이터 생성
      const loginUser = {
        code: fProviderCode('google'),
        email: googleUser.email,
        sns_id: googleUser.uid,
      };

      // 로그인 시도
      const res = await login(loginUser);

      if (res.status) {
        // 로그인 성공
        showSuccessToast(MESSAGES[res.code]);
        router.push(ENDPOINTS.HOME);
      } else {
        // 로그인 실패
        if (res.code === 'L003') {
          // snsUser 데이터 생성해서 handleSocialJoin 함수 실행
          setSnsUser({
            code: loginUser.code,
            email: googleUser.email,
            sns_id: googleUser.uid,
            nickname: googleUser.displayName,
            profile_image: googleUser.photoURL,
          });
        } else {
          // 로그인 실패 (L002)
          throw new Error(MESSAGES[res.code]);
        }
      }
    };

    if (!user && !isProcessed) {
      // 사용자 정보 없고 로그인이 진행중이지 않을 때
      handleGoogleLogin();
    } else if (user) {
      // 사용자 정보가 있을 때
      showErrorToast(MESSAGES['L002']);
      const path = EndpointManager.generateUrl(ENDPOINTS.USER, { userId: user.id });
      router.push(path);
    }
  }, [user, isProcessed, isMobile, router]);

  useEffect(() => {
    if (!snsUser || !isAgree || isEmpty(agreeValues)) return;
    handleSocialJoin(snsUser, agreeValues);
  }, [snsUser, isAgree, agreeValues]);

  // 사이트 회원가입
  const handleSocialJoin = async (snsUser, agreeValues) => {
    try {
      const joinUser = {
        code: snsUser.code,
        email: snsUser.email,
        sns_id: snsUser.sns_id,
        nickname: snsUser.nickname,
        profile_image: snsUser.profile_image,
        is_privacy_agree: agreeValues.privacy,
        is_terms_agree: agreeValues.terms,
        is_age_agree: agreeValues.age,
        is_marketing_agree: agreeValues.marketing,
      };

      const res = await join(joinUser);
      if (res.status) {
        showSuccessToast(MESSAGES[res.code]);

        const loginUser = {
          code: joinUser.code,
          email: joinUser.email,
          sns_id: joinUser.sns_id,
        };

        const loginRes = await login(loginUser);
        if (loginRes.status) {
          // 회원 취향 등록 페이지로 이동
          router.push(ENDPOINTS.USER_WATCHTYPE);
        } else {
          // 로그인 실패
          showErrorToast(MESSAGES[res.code]);
          router.push(ENDPOINTS.USER_LOGIN);
        }
      } else {
        // 회원가입 실패
        showErrorToast(MESSAGES[res.code]);
        router.push(ENDPOINTS.USER_LOGIN);
      }
    } catch {
    } finally {
      setSnsUser(null);
    }
  };

  const Join = () => (
    <>
      {isMobile && <BackButton />}
      <div className={styles.join__header}>
        {/* <img className={styles.join__header__logo} src={DEFAULT_IMAGES.logoWhite} alt="logo" /> */}
        <h2 className={styles.join__header__title}>SNS 간편 로그인</h2>
      </div>
      <JoinAgree setIsAgree={setIsAgree} setAgreeValues={setAgreeValues} />
    </>
  );

  return snsUser ? <Join /> : <LoginLoading />;
};

export default AuthGoogleCallback;
