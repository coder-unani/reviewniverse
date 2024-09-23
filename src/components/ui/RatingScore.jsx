import React from 'react';

import { fRating, fRatingColor } from '@/utils/formatContent';

import styles from '@/styles/components/RatingScore.module.scss';

const RatingScore = ({ rating }) => {
  // const length = Math.ceil(fRating(rating));
  const color = fRatingColor(rating);

  return (
    <div className={styles.review__rating__wrapper}>
      <div className={styles.review__rating__range} data-color={color}>
        {/* {Array.from({ length }, (_, i) => (
          <div key={i} className={styles.review__rating__fill} />
        ))} */}
        <div className={styles.review__rating__fill} />
      </div>
      <span className={styles.review__rating__count}>{fRating(rating)}</span>
    </div>
  );
};

export default RatingScore;
