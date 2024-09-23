'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, notFound } from 'next/navigation';
import { isEmpty } from 'lodash';

import { ENDPOINTS } from '@/config/endpoints';
import { MESSAGES } from '@/config/messages';
import { fParseInt } from '@/utils/format';
import { useUserReviews } from '@/hooks/useUserReviews';
import { showErrorToast } from '@/components/ui/Toast';
import Reviews from '@/components/ui/Reviews';

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
      if (reviewsData.code === 'C001') {
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
        if (prev.page === reviewsData.data.page) return prev;
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
        <div className={styles.reviews__content__wrapper}>
          {!isEmpty(reviews.data) && <Reviews reviews={reviews} handlePage={handlePage} />}
        </div>
      </section>
    </>
  );
};

export default UsersReviews;
