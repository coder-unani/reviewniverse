import { DEFAULT_IMAGES } from '@/config/constants';
import styles from '@/styles/components/LoginLoading.module.scss';

const LoginLoading = () => {
  return (
    <main className={styles.loading__main}>
      <section className={styles.loading__section}>
        <div className={styles.loading__content}>
          <img
            className={styles.loading__image}
            src={DEFAULT_IMAGES.loading}
            srcSet={DEFAULT_IMAGES.loading}
            alt="로딩 이미지"
          />
          <p className={styles.loading__title}>소셜 로그인 중입니다.</p>
          <p className={styles.loading__subtitle}>잠시만 기다려주세요.</p>
        </div>
      </section>
    </main>
  );
};

export default LoginLoading;
