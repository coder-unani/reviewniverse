'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import LoginLoading from '@/components/ui/LoginLoading';
import JoinAgree from '@/components/ui/JoinAgree';
import BackButton from '@/components/ui/Button/Back';
import { showSuccessToast, showErrorToast } from '@/components/ui/Toast';
import { useAuthContext } from '@/contexts/AuthContext';
import { useThemeContext } from '@/contexts/ThemeContext';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '@/library/firebase';
import { fProviderCode } from '@/utils/formatContent';
import { MESSAGES } from '@/config/messages';
import { DEFAULT_IMAGES } from '@/config/constants';
import { EndpointManager, ENDPOINTS } from '@/config/endpoints';
import { isEmpty } from 'lodash';
import styles from '@/styles/pages/UserAuth.module.scss';

const AuthGoogleCallback = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, login, join } = useAuthContext();
  const { isMobile } = useThemeContext();
  const [snsUser, setSnsUser] = useState(null);
  const [isAgree, setIsAgree] = useState(false);
  const [agreeValues, setAgreeValues] = useState({});

  useEffect(() => {
    // 로그인 상태일 경우, 회원 정보 페이지로 이동
    if (user) {
      showErrorToast(MESSAGES['L002']);
      const path = EndpointManager.generateUrl(ENDPOINTS.USER, { userId: user.id });
      router.push(path);
    }

    handleGoogleLogin();
  }, []);

  useEffect(() => {
    if (!snsUser || !isAgree || isEmpty(agreeValues)) return;
    handleSocialJoin(snsUser, agreeValues);
  }, [snsUser, isAgree, agreeValues]);

  const handleGoogleLogin = async () => {
    try {
      const googleRes = await signInWithPopup(auth, provider);
      const googleUser = googleRes.user;

      const loginUser = {
        code: fProviderCode('google'),
        email: googleUser.email,
        sns_id: googleUser.uid,
      };

      // 로그인 확인
      const res = await login(loginUser);
      if (res.status) {
        showSuccessToast(MESSAGES[res.code]);
        router.push(ENDPOINTS.HOME);
      } else {
        if (res.code === 'L003') {
          setSnsUser({
            code: loginUser.code,
            email: googleUser.email,
            sns_id: googleUser.uid,
            nickname: googleUser.displayName,
            profile_image: googleUser.photoURL,
          });
        } else {
          // TODO: 이메일/닉네임 유효성 검사
          setSnsUser(null);
          navigate(ENDPOINTS.USER_LOGIN);
          showErrorToast(MESSAGES[res.code]);
        }
      }
    } catch (error) {
      setSnsUser(null);
      router.push(ENDPOINTS.USER_LOGIN);
      showErrorToast(MESSAGES['L002']);
    }
  };

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
        <img className={styles.join__header__logo} src={DEFAULT_IMAGES.logoWhite} alt="logo" />
        <h2 className={styles.join__header__title}>SNS 간편 로그인</h2>
      </div>
      <JoinAgree setIsAgree={setIsAgree} setAgreeValues={setAgreeValues} />
    </>
  );

  return snsUser ? <Join /> : <LoginLoading />;
};

export default AuthGoogleCallback;
