import { SETTINGS } from '@/config/settings';
import { ENDPOINTS } from '@/config/endpoints';

class LoginService {
  constructor() {
    this.kakaoApiKey = SETTINGS.KAKAO_API_KEY;
    this.kakaoCallbackUrl = SETTINGS.KAKAO_CALLBACK_URL;
    this.naverClientId = SETTINGS.NAVER_CLIENT_ID;
    this.naverCallbackUrl = SETTINGS.NAVER_CALLBACK_URL;
  }

  handleKakaoLogin() {
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${
      this.kakaoApiKey
    }&redirect_uri=${encodeURIComponent(this.kakaoCallbackUrl)}&response_type=code`;
    window.location.href = kakaoAuthUrl;
  }

  handleGoogleLogin(router) {
    router.push(ENDPOINTS.USER_AUTH_GOOGLE_CALLBACK);
  }

  handleNaverLogin() {
    /*
    const { naver } = window;
    const naverLogin = new naver.LoginWithNaverId({
      clientId: this.naverClientId,
      callbackUrl: this.naverCallbackUrl,
      isPopup: false,
      loginButton: { color: 'white', type: 1, height: 60 },
    });

    naverLogin.init();

    const loginButton = document.getElementById('naverIdLogin').firstChild;
    if (loginButton) {
      loginButton.click();
    }
    */

    // TODO: 네이버 로그인 SDK 사용하지 않고 구현하려고 했으나, CORS 문제로 인해 실패 및 보류
    // CSRF 방지를 위한 상태 코드
    const state = Math.random().toString(36).substr(2, 11);
    const naverAuthUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${
      this.naverClientId
    }&redirect_uri=${encodeURIComponent(this.naverCallbackUrl)}&state=${state}`;
    window.location.href = naverAuthUrl;
  }
}

export default new LoginService();
