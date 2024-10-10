'use client';

import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import styles from '@/styles/components/Video.module.scss';

const VideoImage = ({ thumbnail, title }) => (
  <LazyLoadImage className={styles.default__thumbnail} src={thumbnail} srcSet={thumbnail} alt={title} effect="blur" />
);

export default VideoImage;
