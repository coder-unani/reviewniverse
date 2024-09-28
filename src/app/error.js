'use client';

import Image from 'next/image';

import { DEFAULT_IMAGES } from '@/config/constants';
import HomeButton from '@/components/ui/Button/Home';

import styles from '@/styles/pages/Error.module.scss';

// TODO: 에러 코드별 메세지 표시

const Error = ({ error, reset }) => {
  return (
    <main className={styles.error__main}>
      <section className={styles.error__section}>
        <div className={styles.error__content}>
          <Image
            className={styles.error__image}
            src={DEFAULT_IMAGES.error}
            alt="페이지를 찾을 수 없음"
            width={240}
            height={240}
            priority
          />
          <p className={styles.error__title}>서비스에 접속할 수 없습니다.</p>
          <p className={styles.error__subtitle}>
            죄송합니다. 기술적인 문제로 일시적으로 접속되지 않습니다.
            <br />
            잠시 후 다시 이용 부탁드립니다.
          </p>
          <HomeButton />
        </div>
      </section>
    </main>
  );
};

export default Error;
