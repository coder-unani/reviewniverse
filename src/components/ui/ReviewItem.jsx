'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { EndpointManager, ENDPOINTS } from '@/config/endpoints';
import { fYear, fDiffDate } from '@/utils/format';
import { fVideoCode, fThumbnail } from '@/utils/formatContent';
import ProfileImage from '@/components/ui/Button/Profile/Image';
import RatingReview from '@/components/ui/RatingReview';
import ReviewLikeButton from '@/components/ui/Button/ReviewLike';

import MoreIcon from '@/resources/icons/more.svg';
import styles from '@/styles/components/ReviewItem.module.scss';

/**
 * TODO:
 * 1. 리뷰 스포일러 기능
 * 2. 리뷰 클릭시 리뷰 모달 열기
 */

const ReviewItem = ({ user, review }) => {
  const [data, setData] = useState(review);
  const [active, setActive] = useState(review.is_spoiler);
  // TODO: data.video.id로 videoId를 받아오는 방법 찾기
  const path = EndpointManager.generateUrl(ENDPOINTS.VIDEO_DETAIL, { videoId: review.video.id });

  useEffect(() => {
    setData(review);
    setActive(review.is_spoiler);
  }, [review]);

  const handleSpoiler = () => {
    if (!active) return;
    setActive((prev) => !prev);
  };

  return (
    <div className={styles.review__item}>
      <div className={styles.review__profile__wrapper}>
        <ProfileImage image={user.profile_image} size={36} />
        <div className={styles.review__profile__info__wrapper}>
          <div className={styles.review__nickname__wrapper}>
            <span className={styles.review__nickname}>{user.nickname}</span>
            {data.rating && <RatingReview rating={data.rating} />}
          </div>
          <span className={styles.review__date}>{fDiffDate(data.created_at)}</span>
        </div>
        {/* <button className={styles.review__more__button}>
          <MoreIcon />
        </button> */}
      </div>
      <div className={styles.review__video__wrapper}>
        <Link href={path} className={styles.review__video__link}>
          <picture className={styles.review__thumbnail__wrapper}>
            <LazyLoadImage
              className={styles.review__thumbnail}
              src={fThumbnail(data.video.thumbnail)}
              srcSet={fThumbnail(data.video.thumbnail)}
              alt={data.video.title}
              effect="blur"
            />
          </picture>
        </Link>
        <div className={styles.review__wrapper}>
          <div className={styles.review__content__wrapper}>
            <div className={styles.review__video__info__wrapper}>
              <span className={styles.review__video__title}>{data.video.title}</span>
              <span className={styles.review__video__release}>
                <span>{fVideoCode(data.video.code)}</span>
                <span>|</span>
                <span>{fYear(data.video.release)}</span>
              </span>
            </div>
            <div className={styles.review__comment__wrapper} data-spoiler={data.is_spoiler}>
              {data.is_spoiler ? (
                <p className={styles.review__comment} data-active={active} onClick={handleSpoiler}>
                  {data.title}
                </p>
              ) : (
                <p className={styles.review__comment}>{data.title}</p>
              )}
            </div>
          </div>
          <div className={styles.review__more__wrapper}>
            <ReviewLikeButton videoId={data.video.id} review={data} setReview={setData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;
