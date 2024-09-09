import React, { useEffect, useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
// import { AxiosClient } from "@/utils/HttpClient";
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

const NaverCallback = () => {
  const { naver } = window;
  const router = useRouter();
  const pathname = usePathname();
  // const searchParams = useSearchParams();
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
    handleNaverLogin();
  }, [pathname, user]);

  useEffect(() => {
    if (!snsUser || !isAgree || isEmpty(agreeValues)) return;
    handleSocialJoin(snsUser, agreeValues);
  }, [snsUser, isAgree, agreeValues]);

  // TODO: 네이버 로그인 SDK 사용하지 않고 구현하려고 했으나, CORS 문제로 인해 실패 및 보류
  /*
  useEffect(() => {
    const handleNaverLogin = async () => {
      try {
        const code = searchParams.get("code");
        const state = searchParams.get("state");

        if (code) {
          const client = new AxiosClient();
          client.setHeader({
            "X-Naver-Client-Id": SETTINGS.NAVER_CLIENT_ID,
            "X-Naver-Client-Secret": SETTINGS.NAVER_CLIENT_SECRET,
          });
          const tokenRes = await client.get(`https://nid.naver.com/oauth2.0/token`, null, {
            grant_type: "authorization_code",
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
            code: fProviderCode("naver"),
            email: naverUser.email,
            sns_id: naverUser.id,
          };

          const res = await login(loginUser);
          if (res.status) {
            showSuccessToast(MESSAGES[res.code]);
            router.push(ENDPOINTS.HOME);
          } else {
            if (res.code === "L003") {
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

    handleNaverLogin();
  }, []);
  */

  const handleNaverLogin = () => {
    try {
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
        } else {
          setSnsUser(null);
          router.push(ENDPOINTS.USER_LOGIN);
          showErrorToast(MESSAGES['L002']);
        }
      });
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
};

export default NaverCallback;
