import React, { useRef, useCallback } from 'react';
import { isEmpty } from 'lodash';

import Review from '@/components/ui/Review';

const ReviewsForVideo = ({ videoId, reviews, handlePage }) => {
  const hasMore = reviews.data && reviews.total > reviews.data.length;
  const observer = useRef();

  // 무한 스크롤 처리
  const lastItemRef = useCallback(
    (node) => {
      if (!hasMore) {
        if (observer.current) observer.current.disconnect();
        return;
      }

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          handlePage(reviews.page + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [hasMore, reviews, handlePage]
  );

  if (isEmpty(reviews.data)) return null;

  return (
    <>
      {reviews.data.map((review) => (
        <Review videoId={videoId} review={review} key={review.id} />
      ))}
      {hasMore && <article ref={lastItemRef} />}
    </>
  );
};

export default ReviewsForVideo;
