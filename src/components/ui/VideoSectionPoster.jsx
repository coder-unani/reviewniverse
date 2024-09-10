import React from 'react';
import { fThumbnail } from '@/utils/formatContent';
import styles from '@/styles/pages/Contents.module.scss';

const VideoSectionPoster = ({ content }) => {
  const poster = fThumbnail(content.data.thumbnail, false);

  return (
    <section className={styles.detail__poster__section}>
      <picture className={styles.detail__poster__wrapper}>
        <img className={styles.detail__poster} src={poster} srcSet={poster} alt="포스터" />
      </picture>
    </section>
  );
};

export default VideoSectionPoster;
