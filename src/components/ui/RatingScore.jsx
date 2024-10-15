import React from 'react';

import { fRating, fRatingColor } from '@/utils/formatContent';

import StarIcon from '@/resources/icons/fill-star.svg';
import styles from '@/styles/components/RatingScore.module.scss';

const RatingScore = ({ rating }) => {
  const color = fRatingColor(rating);

  return (
    <div className={styles.review__rating__wrapper}>
      <div className={styles.review__rating__range} data-color={color}>
        <StarIcon className={styles.review__rating__fill} width={16} height={16} />
      </div>
      <span className={styles.review__rating__count}>{fRating(rating)}</span>
    </div>
  );
};

export default RatingScore;
