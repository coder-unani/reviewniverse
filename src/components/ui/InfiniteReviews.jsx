import React, { useRef, useCallback } from 'react';
import { isEmpty } from 'lodash';

import Review from '@/components/ui/Review';
import ReviewWithVideo from '@/components/ui/ReviewWithVideo';

// 템플릿에 따른 리뷰 아이템 렌더링
const RenderReviewItems = ({ videoId, user, review, template, referrer, referrerKey }) => {
  switch (template) {
    case 'video':
      // 커밍순 아이템 렌더링
      return <ReviewWithVideo user={user} review={review} referrer={referrer} referrerKey={referrerKey} />;
    case 'default':
      // 기본 리뷰 아이템 렌더링
      return <Review videoId={videoId} review={review} referrer={referrer} referrerKey={referrerKey} />;
    default:
      // 기본 리뷰 아이템 렌더링
      return <Review videoId={videoId} review={review} referrer={referrer} referrerKey={referrerKey} />;
  }
};

const InfiniteReviews = ({
  videoId = null,
  reviews,
  template = 'default',
  pageSize,
  handlePage,
  referrer = null,
  referrerKey = null,
}) => {
  const hasMore = reviews.count === pageSize;
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
        <RenderReviewItems
          videoId={videoId}
          user={review.user || reviews.user}
          review={review}
          template={template}
          referrer={referrer}
          referrerKey={referrerKey}
          key={review.id}
        />
      ))}
      {hasMore && <article ref={lastItemRef} />}
    </>
  );
};

export default InfiniteReviews;
