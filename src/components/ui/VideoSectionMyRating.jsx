import React from 'react';
import RatingVideo from '@/components/ui/RatingVideo';
import { useVideoDetailContext } from '@/contexts/VideoDetailContext';
import { fRatingColor, fRatingText } from '@/utils/formatContent';

const VideoSectionMyRating = React.memo(() => {
  const { myInfo } = useVideoDetailContext();
  const rating = myInfo && myInfo.rating ? myInfo.rating : 0;
  const ratingText = fRatingText(rating);
  const ratingColor = fRatingColor(rating);

  return (
    <section className="detail-my-rating-section">
      <h4 className="detail-main-title">평가하기</h4>
      <div className="detail-my-rating">
        <span className="my-rating-text number" data-color={ratingColor}>
          {ratingText}
        </span>
        <span className="my-rating-text">/</span>
        <span className="my-rating-text">5</span>
      </div>
      <RatingVideo />
    </section>
  );
});

export default VideoSectionMyRating;
