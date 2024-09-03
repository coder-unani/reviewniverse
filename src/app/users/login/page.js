import Image from 'next/image';
import { SETTINGS } from '@/config/settings';
import { DEFAULT_IMAGES } from '@/config/constants';
import styles from '@/styles/Login.module.scss';

export default function page() {
  return (
    <main className={styles.login__main}>
      <div className={styles.login__header}>
        <Image
          src={`${SETTINGS.CDN_BASE_URL}${DEFAULT_IMAGES.logoWhite}`}
          alt="리뷰니버스 로고"
          width={200}
          height={55}
          className={styles.login__header__logo}
          priority
        />
        <h2 className={styles.login__header__title}>소셜 로그인</h2>
      </div>
      <div className={styles.login__content}>
        <button
          type="button"
          className={`${styles.login__button} ${styles.kakao}`}
          onClick=""
        >
          <Image
            className={styles.login__button__image}
            src={`${SETTINGS.CDN_BASE_URL}${DEFAULT_IMAGES.kakao}`}
            alt="kakao"
            width={40}
            height={40}
          />
          카카오로 시작하기
        </button>
        <div id="naverIdLogin" style={{ display: 'none' }} />
        <button
          type="button"
          className={`${styles.login__button} ${styles.naver}`}
          onClick=""
        >
          <Image
            className={styles.login__button__image}
            src={`${SETTINGS.CDN_BASE_URL}${DEFAULT_IMAGES.naver}`}
            alt="naver"
            width={40}
            height={40}
          />
          네이버로 시작하기
        </button>
        <button
          type="button"
          className={`${styles.login__button} ${styles.google}`}
          onClick=""
        >
          <Image
            className={styles.login__button__image}
            src={`${SETTINGS.CDN_BASE_URL}${DEFAULT_IMAGES.google}`}
            alt="google"
            width={40}
            height={40}
          />
          구글로 시작하기
        </button>
      </div>
    </main>
  );
}
