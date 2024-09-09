import React, { useEffect, useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { AxiosClient } from '@/utils/HttpClient';
import LoginLoading from '@/components/ui/LoginLoading';
import JoinAgree from '@/components/ui/JoinAgree';
import BackButton from '@/components/ui/Button/Back';
import { showSuccessToast, showErrorToast } from '@/components/ui/Toast';
import { useAuthContext } from '@/contexts/AuthContext';
import { useThemeContext } from '@/contexts/ThemeContext';
import { fProviderCode } from '@/utils/formatContent';
import { SETTINGS } from '@/config/settings';
import { MESSAGES } from '@/config/messages';
import { DEFAULT_IMAGES } from '@/config/constants';
import { EndpointManager, ENDPOINTS } from '@/config/endpoints';
import { isEmpty } from 'lodash';
import styles from '@/styles/pages/UserAuth.module.scss';

export default function page() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { user, login, join } = useAuthContext();
  const { isMobile } = useThemeContext();
  const [snsUser, setSnsUser] = useState(null);
  const [isAgree, setIsAgree] = useState(false);
  const [agreeValues, setAgreeValues] = useState({});

  useEffect(() => {
    if (user) {
      showErrorToast(MESSAGES['L002']);
      const pathUser = EndpointManager.generateUrl(ENDPOINTS.USER, { userId: user.id });
      return router.push(pathUser);
    }
    handleKakaoLogin();
  }, [searchParams, pathname, user]);

  useEffect(() => {
    if (!snsUser || !isAgree || isEmpty(agreeValues)) return;
    handleSocialJoin(snsUser, agreeValues);
  }, [snsUser, isAgree, agreeValues]);

  const handleKakaoLogin = async () => {
    try {
      const code = searchParams.get('code');
      if (code) {
        const client = new AxiosClient();
        const tokenRes = await client.post(`https://kauth.kakao.com/oauth/token`, null, {
          grant_type: 'authorization_code',
          client_id: SETTINGS.KAKAO_API_KEY,
          redirect_uri: SETTINGS.KAKAO_CALLBACK_URL,
          code: code,
        });
        const accessToken = tokenRes.data.access_token;

        client.setHeader({ Authorization: `Bearer ${accessToken}` });
        const userRes = await client.get(`https://kapi.kakao.com/v2/user/me`);
        const kakaoUser = userRes.data;

        const loginUser = {
          code: fProviderCode('kakao'),
          email: kakaoUser.kakao_account.email,
          sns_id: kakaoUser.id.toString(),
        };

        // 가입여부 확인 (로그인)
        const res = await login(loginUser);
        if (res.status) {
          showSuccessToast(MESSAGES[res.code]);
          router.push(ENDPOINTS.HOME);
        } else {
          if (res.code === 'L003') {
            setSnsUser({
              code: loginUser.code,
              email: kakaoUser.kakao_account.email,
              sns_id: kakaoUser.id.toString(),
              nickname: kakaoUser.properties.nickname,
              profile_image: kakaoUser.properties.profile_image,
            });
          } else {
            // TODO: 이메일/닉네임 유효성 검사
            setSnsUser(null);
            router.push(ENDPOINTS.USER_LOGIN);
            showErrorToast(MESSAGES[res.code]);
          }
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
    <main className={styles.join__main}>
      {isMobile && <BackButton />}
      <div className={styles.join__header}>
        <img className={styles.join__header__logo} src={DEFAULT_IMAGES.logoWhite} alt="logo" />
        <h2 className={styles.join__header__title}>SNS 간편 로그인</h2>
      </div>
      <JoinAgree setIsAgree={setIsAgree} setAgreeValues={setAgreeValues} />
    </main>
  );

  return snsUser ? <Join /> : <LoginLoading />;
}
