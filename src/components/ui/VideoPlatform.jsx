import React from 'react';
import Image from 'next/image';
import { isEmpty } from 'lodash';

import { SETTINGS } from '@/config/settings';
import { fPlatformNameByCode } from '@/utils/formatContent';

import styles from '@/styles/pages/Contents.module.scss';

const VideoPlatform = ({ platforms, title }) => {
  if (isEmpty(platforms)) {
    return null;
  }

  const imageBaseUrl = `${SETTINGS.CDN_BASE_URL}/assets/images/platform/`;

  return (
    <section className={styles.detail__platform__section}>
      <div className={styles.detail__main__title}>{title}</div>
      <article className={styles.detail__platform__wrapper}>
        {platforms.map((platform, index) => (
          <button
            type="button"
            className={`platform-button ${styles.detail__platform}`}
            aria-label={`${fPlatformNameByCode(platform.code)} 보러가기`}
            data-url={platform.url}
            key={index}
          >
            <Image
              className={styles.platform__image}
              src={`${imageBaseUrl}${platform.code}.png`}
              alt={fPlatformNameByCode(platform.code)}
              width={60}
              height={60}
              loading="lazy"
            />
          </button>
        ))}
      </article>
    </section>
  );
};

export default VideoPlatform;
