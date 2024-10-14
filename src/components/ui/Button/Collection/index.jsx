'use client';

import React from 'react';

import styles from '@/styles/components/ControlButton.module.scss';

const CollectionButton = () => {
  return (
    <button type="button" className={`${styles.detail__control} ${styles.collection}`} aria-label="컬렉션 추가하기">
      <span className={styles.detail__control__icon} />
    </button>
  );
};

export default CollectionButton;
