import React, { useState, useRef, useCallback, useEffect } from 'react';
import { isEmpty } from 'lodash';

import Review from '@/components/ui/Review';

const ReviewsVerticalForVideo = ({ children, videoId, reviews, handlePage }) => {
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  // hasMore 상태 변경
  useEffect(() => {
    if (reviews.data && reviews.total <= reviews.data.length) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }
  }, [reviews]);

  // 무한 스크롤 처리
  const lastItemRef = useCallback(
    (node) => {
      if (!hasMore) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          handlePage(reviews.page + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [hasMore, reviews]
  );

  // 리뷰 데이터가 없는 경우
  if (isEmpty(reviews.data)) {
    return;
  }

  return (
    <>
      {reviews.data.map((review) => (
        <Review videoId={videoId} review={review} key={review.id} />
      ))}
      {hasMore && <article ref={lastItemRef}></article>}
    </>
  );
};

export default ReviewsVerticalForVideo;
