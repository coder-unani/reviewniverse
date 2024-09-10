import React from 'react';
import { fPlatformFilter } from '@/utils/formatContent';
import { SETTINGS } from '@/config/settings';
import { isEmpty } from 'lodash';
import styles from '@/styles/pages/Contents.module.scss';

const VideoSectionPlatform = ({ content }) => {
  const platforms = fPlatformFilter(content.data.platform);
  if (isEmpty(platforms)) {
    return null;
  }

  return (
    <section className={styles.detail__platform__section}>
      <h4 className={styles.detail__main__title}>보러가기</h4>
      <article className={styles.detail__platform__wrapper}>
        {platforms.map((platform, index) => (
          <button
            type="button"
            className={styles.detail__platform}
            onClick={() => window.open(platform.url)}
            key={index}
          >
            <img
              className={styles.platform__image}
              src={`${SETTINGS.CDN_BASE_URL}/assets/images/platform/${platform.code}.png`}
              alt="플랫폼"
            />
          </button>
        ))}
      </article>
    </section>
  );
};

export default VideoSectionPlatform;
