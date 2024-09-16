import React from 'react';
import { isEmpty } from 'lodash';
import styles from '@/styles/pages/Contents.module.scss';

const VideoPoster = ({ poster }) => {
  if (isEmpty(poster)) {
    return null;
  }

  return (
    <section className={styles.detail__poster__section}>
      <picture className={styles.detail__poster__wrapper}>
        <img className={styles.detail__poster} src={poster} srcSet={poster} alt="포스터" />
      </picture>
    </section>
  );
};

export default VideoPoster;