import React from 'react';
import Image from 'next/image';
import { fThumbnail } from '@/utils/formatContent';
import styles from '@/styles/pages/Contents.module.scss';

const VideoSectionPoster = ({ content }) => {
  const poster = fThumbnail(content.data.thumbnail, false);

  return (
    <section className={styles.detail__poster__section}>
      <picture className={styles.detail__poster__wrapper}>
        <Image
          className={styles.detail__poster}
          src={poster}
          alt="포스터"
          width={280}
          height={0}
          sizes="(max-width: 280px) 100vw, 280px"
          priority
        />
      </picture>
    </section>
  );
};

export default VideoSectionPoster;
