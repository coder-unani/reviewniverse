'use client';

import React from 'react';

import OutlineFolderIcon from '@/resources/icons/outline-folder.svg';
import styles from '@/styles/components/ControlButton.module.scss';

const CollectionButton = () => {
  return (
    <button type="button" className={styles.detail__control} aria-label="컬렉션 추가하기">
      <OutlineFolderIcon className={styles.detail__control__icon} width={30} height={30} />
      <span className={styles.detail__control__text}>컬렉션</span>
    </button>
  );
};

export default CollectionButton;
