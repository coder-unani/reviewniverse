import Image from 'next/image';

import { DEFAULT_IMAGES } from '@/config/constants';
import HomeButton from '@/components/ui/Button/Home';

import styles from '@/styles/pages/NotFound.module.scss';

const NotFound = () => {
  return (
    <main className={styles.notfound__main}>
      <section className={styles.notfound__section}>
        <div className={styles.notfound__content}>
          <Image
            className={styles.notfound__image}
            src={DEFAULT_IMAGES.pageNotFound}
            alt="페이지를 찾을 수 없음"
            width={320}
            height={320}
            priority
          />
          <p className={styles.notfound__title}>요청하신 페이지를 찾을 수 없습니다.</p>
          <p className={styles.notfound__subtitle}>
            입력하신 주소가 잘못되었거나, 변경 혹은 삭제되었을 수 있습니다.
            <br />
            입력하신 주소가 정확한지 다시 한번 확인해주세요.
          </p>
          <HomeButton />
        </div>
      </section>
    </main>
  );
};

export default NotFound;
