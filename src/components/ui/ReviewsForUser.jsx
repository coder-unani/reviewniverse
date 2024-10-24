import React, { useRef, useCallback } from 'react';
import { isEmpty } from 'lodash';

import ReviewWithVideo from '@/components/ui/ReviewWithVideo';

const ReviewsForUser = ({ reviews, handlePage, referrer = null, referrerKey = null }) => {
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
        <ReviewWithVideo
          user={reviews.user}
          review={review}
          referrer={referrer}
          referrerKey={referrerKey}
          key={review.id}
        />
      ))}
      {hasMore && <article ref={lastItemRef} />}
    </>
  );
};

export default ReviewsForUser;
