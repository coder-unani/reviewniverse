'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { Tooltip } from 'react-tooltip';
import { isEmpty } from 'lodash';

import { VIDEO_RATING_TEXT } from '@/config/constants';
import { SETTINGS } from '@/config/settings';
import { fRating, fRatingColor } from '@/utils/formatContent';
import { useAuthContext } from '@/contexts/AuthContext';
import { useModalContext } from '@/contexts/ModalContext';
import { useVideoRating } from '@/hooks/useVideoRating';
import { showSuccessToast } from '@/components/ui/Toast';

import styles from '@/styles/components/RatingVideo.module.scss';

const RatingVideo = ({ videoId, myInfo }) => {
  const { user } = useAuthContext();
  const { toggleEnjoyModal } = useModalContext();
  const { mutate: videoRating, isPending: isRatingPending } = useVideoRating();
  const [imgSrc, setImgSrc] = useState(`${SETTINGS.CDN_BASE_URL}/assets/images/rating/0.png`);
  const ratingRef = useRef(null);
  const ratingImgRef = useRef(null);
  const ratingTextRef = useRef(null);

  // 비디오 평가하기 이미지 및 텍스트 설정
  const handleRatingSet = (rating) => {
    if (ratingRef.current && ratingTextRef.current) {
      ratingRef.current.dataset.rating = rating;
      ratingTextRef.current.innerText = VIDEO_RATING_TEXT[rating];
    }
    setImgSrc(`${SETTINGS.CDN_BASE_URL}/assets/images/rating/${rating}.png`);
  };

  // 비디오 평가하기 마우스 올렸을 때 이벤트
  const handleRatingMouseOver = (e) => {
    // API 호출 중일 경우 리턴
    if (isRatingPending) return;

    // rating이 없을 경우 리턴
    const { rating } = e.target.dataset;
    if (!rating) return;

    handleRatingSet(rating);
  };

  // 비디오 평가하기 마우스 벗어났을 때 이벤트
  const handleRatingMouseOut = (e) => {
    // API 호출 중일 경우 리턴
    if (isRatingPending) return;

    if (ratingRef.current && !ratingRef.current.contains(e.relatedTarget)) {
      handleRatingSet(myInfo && myInfo.rating ? myInfo.rating : 0);
    }
  };

  // 비디오 평가하기 클릭 이벤트
  const handleRatingClick = (e) => {
    // 로그인 안했을 경우 Enjoy 모달 띄우기
    if (isEmpty(user)) {
      toggleEnjoyModal();
      return;
    }
    // API 호출 중일 경우 리턴
    if (isRatingPending) return;

    // rating이 없을 경우 리턴
    const { rating } = e.target.dataset;
    if (!rating) return;

    // 평가하기 API 호출
    videoRating(
      { videoId, rating, userId: user.id },
      {
        onSuccess: (res) => {
          if (res.status === 200) {
            const resRating = res.data.data.rating;
            if (resRating) {
              showSuccessToast(`평점 ${resRating / 2}점이 입력되었습니다.`);
            } else {
              showSuccessToast('입력된 평점이 삭제되었습니다.');
            }
          }
        },
      }
    );
  };

  // 툴팁 코멘트 설정
  const handleTooltipContent = (tRating) => {
    // myInfo가 있고, myInfo.rating이 마우스 오버한 rating과 같을 경우 취소하기 표시
    if (myInfo && myInfo.rating === tRating) {
      return '취소하기';
    }
    return `${fRating(tRating)}점`;
  };

  // 비디오 평가하기 이벤트 설정
  useEffect(() => {
    const barRating = ratingRef.current;
    if (!barRating) return undefined;

    // 로그인이 되어 있고, myInfo가 있을 경우 평가하기 이미지 및 텍스트 설정
    if (!isEmpty(user) && myInfo) {
      handleRatingSet(myInfo.rating || 0);
    }

    barRating.addEventListener('mouseover', handleRatingMouseOver);
    barRating.addEventListener('mouseout', handleRatingMouseOut);
    barRating.addEventListener('click', handleRatingClick);

    // clean up
    return () => {
      barRating.removeEventListener('mouseover', handleRatingMouseOver);
      barRating.removeEventListener('mouseout', handleRatingMouseOut);
      barRating.removeEventListener('click', handleRatingClick);
    };
  }, [user, myInfo, isRatingPending]);

  return (
    <article className={styles.rating__container}>
      <div className={styles.rating__image__wrapper}>
        <Image
          className={styles.rating__image}
          src={imgSrc}
          alt="평점"
          width={45}
          height={45}
          priority
          ref={ratingImgRef}
        />
      </div>
      <div className={styles.rating__range__wrapper}>
        <span id="ratingText" className={styles.rating__text} ref={ratingTextRef}>
          {VIDEO_RATING_TEXT[0]}
        </span>
        <div className={styles.rating__range} ref={ratingRef}>
          {Array.from({ length: 10 }, (_, i) => (
            <div
              id={`videoRating${i + 1}`}
              className={styles.rating__fill}
              data-rating={i + 1}
              data-color={fRatingColor(i + 1)}
              key={i}
            />
          ))}
        </div>
        {Array.from({ length: 10 }, (_, i) => (
          <Tooltip
            className={styles.rating__tooltip}
            anchorSelect={`#videoRating${i + 1}`}
            content={handleTooltipContent(i + 1)}
            place="bottom"
            key={i}
          />
        ))}
      </div>
    </article>
  );
};

export default RatingVideo;
