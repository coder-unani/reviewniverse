import React from 'react';

import styles from '@/styles/components/ControlButton.module.scss';

const ShareButton = () => {
  return (
    <button type="button" className={`${styles.detail__control} ${styles.share}`} aria-label="공유하기">
      <span className={styles.detail__control__icon}></span>
    </button>
  );
};

export default ShareButton;
