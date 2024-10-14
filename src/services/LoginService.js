import { ENDPOINTS } from '@/config/endpoints';
import { SETTINGS } from '@/config/settings';

class LoginService {
  static handleKakaoLogin() {
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${
      SETTINGS.KAKAO_API_KEY
    }&redirect_uri=${encodeURIComponent(SETTINGS.KAKAO_CALLBACK_URL)}&response_type=code`;
    window.location.href = kakaoAuthUrl;
  }

  static handleGoogleLogin(router) {
    router.push(ENDPOINTS.USER_AUTH_GOOGLE_CALLBACK);
  }

  static handleNaverLogin() {
    const { naver } = window;
    const naverLogin = new naver.LoginWithNaverId({
      clientId: SETTINGS.NAVER_CLIENT_ID,
      callbackUrl: SETTINGS.NAVER_CALLBACK_URL,
      isPopup: false,
      loginButton: { color: 'white', type: 1, height: 60 },
    });

    naverLogin.init();

    const loginButton = document.getElementById('naverIdLogin').firstChild;
    if (loginButton) {
      loginButton.click();
    }

    /*
    // TODO: 네이버 로그인 SDK 사용하지 않고 구현하려고 했으나, CORS 문제로 인해 실패 및 보류
    // CSRF 방지를 위한 상태 코드
    const state = Math.random().toString(36).substr(2, 11);
    const naverAuthUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${
      SETTINGS.NAVER_CLIENT_ID
    }&redirect_uri=${encodeURIComponent(SETTINGS.NAVER_CALLBACK_URL)}&state=${state}`;
    window.location.href = naverAuthUrl;
    */
  }
}

export default LoginService;
