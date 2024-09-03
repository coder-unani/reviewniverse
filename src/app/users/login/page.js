import styles from '@/styles/Login.module.scss';

export default function page() {
  return (
    <main className="login-main-container">
      <div className="login-header">
        <img className="login-header-logo" src="" alt="logo" />
        <h2 className="login-header-title">소셜 로그인</h2>
      </div>
      <div className="login-content">
        <button type="button" className="login-button kakao" onClick="">
          <img className="login-button-image" src="" alt="kakao" />
          카카오로 시작하기
        </button>
        <div id="naverIdLogin" style={{ display: 'none' }} />
        <button type="button" className="login-button naver" onClick="">
          <img className="login-button-image" src="" alt="naver" />
          네이버로 시작하기
        </button>
        <button type="button" className="login-button google" onClick="">
          <img className="login-button-image" src="" alt="google" />
          구글로 시작하기
        </button>
      </div>
    </main>
  );
}
