'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isEmpty } from 'lodash';
import { signInWithPopup, signInWithRedirect, getRedirectResult } from 'firebase/auth';
import { auth, provider } from '@/library/firebase';

import { ENDPOINTS } from '@/config/endpoints';
import { MESSAGES } from '@/config/messages';
import { fProviderCode } from '@/utils/formatContent';
import { useAuthContext } from '@/contexts/AuthContext';
import { useThemeContext } from '@/contexts/ThemeContext';
import { showSuccessToast, showErrorToast } from '@/components/ui/Toast';
import LoginLoading from '@/components/ui/LoginLoading';
import JoinAgree from '@/components/ui/JoinAgree';
import BackButton from '@/components/ui/Button/Back';

import styles from '@/styles/pages/UserAuth.module.scss';

const AuthGoogleCallback = () => {
  const router = useRouter();
  const { user, login, join } = useAuthContext();
  const { isMobile } = useThemeContext();
  const [snsUser, setSnsUser] = useState(null);
  const [isAgree, setIsAgree] = useState(false);
  const [agreeValues, setAgreeValues] = useState({});
  const [isProcessed, setIsProcessed] = useState(false);
  const [isCreated, setIsCreated] = useState(false);

  // 사이트 회원가입
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
        setIsCreated(true);
        const loginUser = {
          code: joinUser.code,
          email: joinUser.email,
          sns_id: joinUser.sns_id,
        };

        // 로그인 시도
        const resLogin = await login(loginUser);
        if (!resLogin.status) {
          // 로그인 실패
          throw new Error(MESSAGES[resLogin.code]);
        }
        // 로그인이 성공한 경우 useEffect에서 로그인 성공 토스트 메시지 출력
      } else {
        // 회원가입 실패
        throw new Error(MESSAGES[resJoin.code]);
      }
    } catch (error) {
      showErrorToast(error.message);
      router.push(ENDPOINTS.USER_LOGIN);
    } finally {
      setSnsUser(null);
    }
  };

  useEffect(() => {
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
        if (res.code !== 'L003') {
          throw new Error(MESSAGES[res.code]);
        }
        // 로그인 실패
        // snsUser 데이터 생성해서 handleSocialJoin 함수 실행
        setSnsUser({
          code: loginUser.code,
          email: googleUser.email,
          sns_id: googleUser.uid,
          nickname: googleUser.displayName,
          profile_image: googleUser.photoURL,
        });
      }
    };

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
          const resPopup = await signInWithPopup(auth, provider);
          const googleUser = resPopup.user;
          await processLogin(googleUser);
          setIsProcessed(true);
        }
      } catch (error) {
        setSnsUser(null);
        showErrorToast(error.message);
        router.push(ENDPOINTS.USER_LOGIN);
      }
    };

    if (!user && !isProcessed) {
      // 사용자 정보 없고 로그인이 진행중이지 않을 때
      handleGoogleLogin();
    } else if (user && !isProcessed) {
      // 사용자 정보가 있을 때 (로그인 상태에서 주소치고 들어온 경우 홈으로 이동)
      router.push(ENDPOINTS.HOME);
    } else if (user && isProcessed) {
      // 사용자 정보가 있고 로그인이 진행중일 때 유저 왓치타입 페이지로 이동 (=회원가입 성공 후 로그인 성공)
      if (isCreated) {
        showSuccessToast(MESSAGES.J001);
        router.push(ENDPOINTS.USER_WATCHTYPE);
      } else {
        router.push(ENDPOINTS.HOME);
      }
    }
  }, [user, isProcessed, isMobile, router]);

  useEffect(() => {
    // snsUser, isAgree, agreeValues 값이 없으면 함수 실행하지 않음
    if (!snsUser || !isAgree || isEmpty(agreeValues)) return;

    // 사이트 회원 가입 함수 실행
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

export default AuthGoogleCallback;
