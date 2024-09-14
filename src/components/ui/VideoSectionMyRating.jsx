'use client';

import React from 'react';
import RatingVideo from '@/components/ui/RatingVideo';
import { useContentsContext } from '@/contexts/ContentsContext';
import { fRatingColor, fRatingText } from '@/utils/formatContent';
import styles from '@/styles/pages/Contents.module.scss';

const VideoSectionMyRating = ({ videoId }) => {
  const { myInfo } = useContentsContext();
  const rating = myInfo && myInfo.rating ? myInfo.rating : 0;
  const ratingText = fRatingText(rating);
  const ratingColor = fRatingColor(rating);

  return (
    <section className={styles.detail__my__rating__section}>
      <h4 className={styles.detail__main__title}>평가하기</h4>
      <div className={styles.detail__my__rating}>
        <span className={`${styles.my__rating__text} ${styles.number}`} data-color={ratingColor}>
          {ratingText}
        </span>
        <span className={styles.my__rating__text}>/</span>
        <span className={styles.my__rating__text}>5</span>
      </div>
      <RatingVideo videoId={videoId} myInfo={myInfo} />
    </section>
  );
};

export default VideoSectionMyRating;
