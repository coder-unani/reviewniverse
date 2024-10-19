'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isEmpty } from 'lodash';

import { ENDPOINTS } from '@/config/endpoints';
import { useUserReviews } from '@/hooks/useUserReviews';
import ReviewsForUser from '@/components/ui/ReviewsForUser';

import styles from '@/styles/pages/UsersReviews.module.scss';

const UsersReviews = ({ userId, referrer }) => {
  const router = useRouter();
  const [reviews, setReviews] = useState(null);
  const [page, setPage] = useState(1);
  const pageSize = 20;
  const {
    data: reviewsData,
    error: reviewsError,
    isLoading: reviewsIsLoading,
  } = useUserReviews({ userId, page, pageSize, enabled: userId });

  // 리뷰 데이터 처리
  useEffect(() => {
    // API 호출 중이거나 데이터가 없는 경우
    if (reviewsIsLoading || !reviewsData) return;

    // API 호출 결과가 실패인 경우
    if (!reviewsData.status) {
      if (reviewsData.code === 'C001' && page > 1) {
        // 429 에러이고, 첫 페이지가 아닌 경우 이전 페이지 번호로 변경
        setPage((prev) => prev - 1);
      } else {
        // 그 외의 경우 에러 페이지로 이동
        router.push(ENDPOINTS.ERROR);
      }
      return;
    }

    setReviews((prev) => {
      const newData = reviewsData.data;
      // 첫 페이지인 경우
      if (!prev) return { ...newData };
      // 같은 페이지인 경우
      if (prev.page === newData.page) return prev;
      // 첫 페이지가 아닌 경우 데이터 추가
      return {
        ...prev,
        total: newData.total,
        count: newData.count,
        page: newData.page,
        data: prev.data ? [...prev.data, ...newData.data] : [...newData.data],
      };
    });
  }, [reviewsIsLoading, reviewsData, page]);

  // 페이지 변경
  const handlePage = (newPage) => {
    setPage(newPage);
  };

  // 에러 발생 시 에러 페이지로 이동
  if (reviewsError) {
    router.push(ENDPOINTS.ERROR);
    return null;
  }

  // 리뷰 데이터가 없는 경우
  if (isEmpty(reviews)) return null;

  return (
    <>
      <section className={styles.reviews__title__section}>
        <strong className={styles.reviews__title}>
          <em>{reviews.user.nickname}</em> 님이 기록한 리뷰가 {reviews.total} 개 있어요
        </strong>
      </section>
      <section className={styles.reviews__content__section}>
        <div className={styles.reviews__content}>
          {!isEmpty(reviews.data) && (
            <ReviewsForUser reviews={reviews} handlePage={handlePage} referrer={referrer} referrerKey={userId} />
          )}
        </div>
      </section>
    </>
  );
};

export default UsersReviews;
