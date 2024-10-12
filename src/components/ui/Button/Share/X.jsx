'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { DEFAULT_IMAGES } from '@/config/constants';

import styles from '@/styles/components/ShareModal.module.scss';

const XShareButton = ({ title, desc, link = null, image = null }) => {
  // X(트위터) 공유하기 버튼 클릭
  const handleClick = (e) => {
    e.preventDefault();
    const url = link || window.location.href;
    const twitterIntent = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${url}`;
    window.open(twitterIntent, '_blank');
  };

  return (
    <Link id="btn-x-share" className={styles.share__button} href="#" onClick={handleClick}>
      <picture className={styles.share__button__image__wrapper}>
        <Image
          className={styles.share__button__image}
          src={DEFAULT_IMAGES.shareX}
          alt="엑스 공유하기 버튼"
          width={60}
          height={60}
          loading="lazy"
        />
      </picture>
      <p className={styles.share__button__name}>X</p>
    </Link>
  );
};

export default XShareButton;
