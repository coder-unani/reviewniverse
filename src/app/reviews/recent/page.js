import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { isEmpty } from 'lodash';

import { REVIEWS_REVALIDATE_SEC, REVIEWS_PAGE_SIZE } from '@/config/constants';
import { fetchReviews } from '@/library/api/reviews';
import ReviewWithVideo from '@/components/ui/ReviewWithVideo';

import styles from '@/styles/pages/Reviews.module.scss';

const ReviewsComponent = dynamic(() => import('@/components/ui/Reviews'), { ssr: false });

// ISR 재생성 주기 설정
export const revalidate = REVIEWS_REVALIDATE_SEC;

const initReviews = (result) => {
  const reviews = {
    total: 0,
    count: 0,
    page: 1,
    data: [],
  };

  if (!isEmpty(result)) {
    reviews.total = result.total || 0;
    reviews.count = result.count || 0;
    reviews.page = result.page || 1;
    reviews.data = result.data || [];
  }

  return reviews;
};

const getReviews = async () => {
  const options = {
    page: 1,
    size: REVIEWS_PAGE_SIZE,
  };
  // Reviews API 호출
  const res = await fetchReviews({ ...options });
  if (res.status === 200) {
    return res.data;
  }
  return [];
};

// TODO: 메타태그 설정

const RecentReviews = async () => {
  const result = await getReviews();
  const reviews = initReviews(result);
  const subtitle = '최근 리뷰';
  const referrer = 'reviews';
  const referrerKey = 'recent';
  // page 1의 데이터가 size(20)보다 작으면 enabled를 false로 설정
  const enabled = reviews.total > REVIEWS_PAGE_SIZE;

  return (
    <main className={styles.reviews__main}>
      <section className={styles.reviews__title__section}>
        <div className={styles.reviews__title__wrapper}>
          {/* <p className={styles.reviews__subtitle}>{subtitle}</p> */}
          <h2 className={styles.reviews__title}>{subtitle}</h2>
        </div>
      </section>

      <section className={styles.reviews__content__section}>
        <div className={styles.reviews__content}>
          {reviews.data.map((review) => (
            <ReviewWithVideo
              user={review.user}
              review={review}
              referrer={referrer}
              referrerKey={referrerKey}
              key={review.id}
            />
          ))}
          <Suspense fallback="">
            <ReviewsComponent enabled={enabled} referrer={referrer} referrerKey={referrerKey} />
          </Suspense>
        </div>
      </section>
    </main>
  );
};

export default RecentReviews;
