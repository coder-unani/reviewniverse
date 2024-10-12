'use client';

import React from 'react';

import styles from '@/styles/components/ControlButton.module.scss';

const CollectionButton = () => {
  return (
    <button type="button" className={`${styles.detail__control} ${styles.collection}`}>
      <span className={styles.detail__control__icon}></span>
    </button>
  );
};

export default CollectionButton;
