'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, notFound } from 'next/navigation';
import { isEmpty } from 'lodash';

import { ENDPOINTS } from '@/config/endpoints';
import { fParseInt } from '@/utils/format';
import { useUserReviews } from '@/hooks/useUserReviews';
import ReviewsForUser from '@/components/ui/ReviewsForUser';

import styles from '@/styles/pages/UsersReviews.module.scss';

const UsersReviews = ({ id }) => {
  const router = useRouter();
  const userId = fParseInt(id);
  const [reviews, setReviews] = useState(null);
  const [page, setPage] = useState(1);
  const pageSize = 20;
  const {
    data: reviewsData,
    error: reviewsError,
    isLoading: reviewsIsLoading,
  } = useUserReviews({ userId, page, pageSize, enabled: userId });

  // 숫자가 아닌 경우 notFound 페이지로 이동
  useEffect(() => {
    if (userId === 0) {
      notFound();
    }
  }, [userId]);

  // 리뷰 데이터 처리
  useEffect(() => {
    // API 호출 중이거나 데이터가 없는 경우
    if (reviewsIsLoading || !reviewsData) {
      return;
    }

    // API 호출 결과가 실패인 경우
    if (!reviewsData.status) {
      // 429 에러인 경우
      if (reviewsData.code === 'C001') {
        // TODO: 고도화 필요
        if (page > 1) setPage((prev) => prev - 1);
        return;
      } else {
        return router.push(ENDPOINTS.ERROR);
      }
    }

    if (page === 1) {
      // 첫 페이지인 경우
      setReviews(reviewsData.data);
    } else {
      // 첫 페이지가 아닌 경우 데이터 추가
      setReviews((prev) => {
        if (prev.page === reviewsData.data.page) return prev;
        return {
          ...prev,
          total: reviewsData.data.total,
          count: reviewsData.data.count,
          page: reviewsData.data.page,
          data: prev.data ? [...prev.data, ...reviewsData.data.data] : [...reviewsData.data.data],
        };
      });
    }
  }, [reviewsIsLoading, reviewsData, page]);

  // 페이지 변경
  const handlePage = (newPage) => {
    setPage(newPage);
  };

  // 에러 발생 시 에러 페이지로 이동
  if (reviewsError) {
    return router.push(ENDPOINTS.ERROR);
  }

  // 리뷰 데이터가 없는 경우
  if (isEmpty(reviews)) {
    return null;
  }

  return (
    <>
      <section className={styles.reviews__title__section}>
        <strong className={styles.reviews__title}>
          <em>{reviews.user.nickname}</em> 님이 기록한 리뷰가 {reviews.total} 개 있어요
        </strong>
      </section>
      <section className={styles.reviews__content__section}>
        <div className={styles.reviews__content}>
          {!isEmpty(reviews.data) && <ReviewsForUser reviews={reviews} handlePage={handlePage} />}
        </div>
      </section>
    </>
  );
};

export default UsersReviews;
