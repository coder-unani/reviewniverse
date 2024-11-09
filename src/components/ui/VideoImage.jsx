'use client';

import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import styles from '@/styles/components/Video.module.scss';

// 클라이언트 컴포넌트 이미지 레이지 로딩
const VideoImage = ({ thumbnail, title }) => (
  <LazyLoadImage className={styles.default__thumbnail} src={thumbnail} srcSet={thumbnail} alt={title} effect="blur" />
);

export default VideoImage;
