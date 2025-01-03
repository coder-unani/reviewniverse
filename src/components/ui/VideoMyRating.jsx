'use client';

import React from 'react';

// import { fRatingColor, fRatingText } from '@/utils/formatContent';
import { useContentsContext } from '@/contexts/ContentsContext';
import RatingVideo2 from '@/components/ui/RatingVideo2';

import styles from '@/styles/pages/Contents.module.scss';

const VideoMyRating = ({ videoId, title }) => {
  const { myInfo } = useContentsContext();
  // const rating = myInfo && myInfo.rating ? myInfo.rating : 0;
  // const ratingText = fRatingText(rating);
  // const ratingColor = fRatingColor(rating);

  return (
    <section className={styles.detail__my__rating__section}>
      <h4 className={styles.detail__main__title}>{title}</h4>
      {/* 평가하기 점수 표시 보류 */}
      {/* <div className={styles.detail__my__rating}>
        <span className={`${styles.my__rating__text} ${styles.number}`} data-color={ratingColor}>
          {ratingText}
        </span>
        <span className={styles.my__rating__text}>/</span>
        <span className={styles.my__rating__text}>5</span>
      </div> */}
      <RatingVideo2 videoId={videoId} myInfo={myInfo} />
    </section>
  );
};

export default VideoMyRating;
