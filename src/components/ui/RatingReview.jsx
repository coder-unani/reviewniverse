import React from 'react';
import { fRating, fRatingColor } from '@/utils/formatContent';

const RatingReview = ({ rating }) => {
  // const length = Math.ceil(fRating(rating));
  const color = fRatingColor(rating);

  return (
    <div className="review-rating-wrapper">
      <div className="review-rating-range" data-color={color}>
        {/* {Array.from({ length }, (_, i) => (
          <div key={i} className="review-rating-fill" />
        ))} */}
        <div className="review-rating-fill" />
      </div>
      <span className="review-rating-count">{fRating(rating)}</span>
    </div>
  );
};

export default RatingReview;
