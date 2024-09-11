'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, notFound } from 'next/navigation';
import { useUserReviews } from '@/hooks/useUserReviews';
import ReviewItem from '@/components/ui/ReviewItem';
import { showErrorToast } from '@/components/ui/Toast';
import { MESSAGES } from '@/config/messages';
import { ENDPOINTS } from '@/config/endpoints';
import { fParseInt } from '@/utils/format';
import { isEmpty } from 'lodash';
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
  } = useUserReviews({
    userId: userId,
    page,
    pageSize,
    // orderBy: "created_at_desc",
    enabled: userId,
  });

  useEffect(() => {
    if (userId === 0) {
      notFound();
    }
  }, [userId]);

  useEffect(() => {
    if (reviewsIsLoading || !reviewsData) {
      return;
    }
    if (!reviewsData.status) {
      if (videosData.code === 'C001') {
        // TODO: 고도화 필요
        if (page > 1) setPage((prev) => prev - 1);
        // showErrorToast(MESSAGES["C001"]);
        return;
      } else {
        return router.push(ENDPOINTS.ERROR);
      }
    }
    if (page === 1) {
      setReviews(reviewsData.data);
    } else {
      setReviews((prev) => {
        if (prev.page === videosData.data.page) return prev;
        return {
          ...prev,
          count: reviewsData.data.count,
          page: reviewsData.data.page,
          data: prev.data ? [...prev.data, ...reviewsData.data.data] : [],
        };
      });
    }
  }, [reviewsIsLoading, reviewsData, page]);

  const handlePage = (newPage) => {
    setPage(newPage);
  };

  if (reviewsError) {
    return router.push(ENDPOINTS.ERROR);
  }

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
        {!isEmpty(reviews.data) &&
          reviews.data.map((review) => <ReviewItem key={review.id} user={reviews.user} review={review} />)}
      </section>
    </>
  );
};

export default UsersReviews;
