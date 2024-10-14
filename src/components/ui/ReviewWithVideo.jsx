'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { EndpointManager, ENDPOINTS } from '@/config/endpoints';
import { fYear, fDiffDate } from '@/utils/format';
import { fVideoCode, fThumbnail } from '@/utils/formatContent';
import ProfileImage from '@/components/ui/Button/Profile/Image';
import RatingScore from '@/components/ui/RatingScore';
import ReviewLikeButton from '@/components/ui/Button/ReviewLike';

// import MoreIcon from '@/resources/icons/more.svg';
import styles from '@/styles/components/Review.module.scss';

/**
 * TODO:
 * 1. 리뷰 스포일러 기능
 * 2. 리뷰 클릭시 리뷰 모달 열기
 */

const ReviewWithVideo = ({ user, review }) => {
  const [data, setData] = useState(review);
  const [active, setActive] = useState(review.is_spoiler);
  // TODO: data.video.id로 videoId를 받아오는 방법 찾기
  const videoPath = EndpointManager.generateUrl(ENDPOINTS.CONTENTS, { videoId: review.video.id });
  const userPath = EndpointManager.generateUrl(ENDPOINTS.USER, { userId: user.id });

  // 리뷰 데이터 state 설정
  useEffect(() => {
    setData(review);
    setActive(review.is_spoiler);
  }, [review]);

  // 스포일러 처리
  const handleSpoiler = () => {
    if (!active) return;
    setActive((prev) => !prev);
  };

  return (
    <div className={styles.review__item}>
      <div className={styles.review__profile__wrapper}>
        <Link href={userPath} className={styles.review__profile__link}>
          <ProfileImage image={user.profile_image} size={36} />
          <div className={styles.review__profile__info__wrapper}>
            <div className={styles.review__nickname__wrapper}>
              <span className={styles.review__nickname}>{user.nickname}</span>
              {data.rating && <RatingScore rating={data.rating} />}
            </div>
            <span className={styles.review__date}>{fDiffDate(data.created_at)}</span>
          </div>
        </Link>
        {/* <button className={styles.review__more__button}>
          <MoreIcon />
        </button> */}
      </div>
      <div className={styles.review__video__wrapper}>
        <Link href={videoPath} className={styles.review__video__link}>
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
                <button
                  type="button"
                  className={styles.review__comment__spoiler}
                  data-active={active}
                  onClick={handleSpoiler}
                >
                  <p className={styles.review__comment}>{data.title}</p>
                </button>
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

export default ReviewWithVideo;
