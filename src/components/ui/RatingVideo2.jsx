'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useAuthContext } from '@/contexts/AuthContext';
import { useModalContext } from '@/contexts/ModalContext';
import { useVideoRating } from '@/hooks/useVideoRating';
import { showSuccessToast } from '@/components/ui/Toast';
import { Tooltip } from 'react-tooltip';
import { fRating, fRatingColor } from '@/utils/formatContent';
import { VIDEO_RATING_TEXT } from '@/config/constants';
import { SETTINGS } from '@/config/settings';
import { isEmpty } from 'lodash';
import StarIcon from '@/resources/icons/fill-star.svg';
import styles from '@/styles/components/RatingVideo2.module.scss';

const RatingVideo2 = ({ videoId, myInfo }) => {
  const { user } = useAuthContext();
  const { toggleEnjoyModal } = useModalContext();
  const { mutate: videoRating, isPending: isRatingPending } = useVideoRating();
  const [imgSrc, setImgSrc] = useState(`${SETTINGS.CDN_BASE_URL}/assets/images/rating/0.png`);
  const [isDragging, setIsDragging] = useState(false); // 평점 드래그 여부
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const emptyRatingRef = useRef(null);
  const fillRatingRef = useRef(null);
  const ratingImgRef = useRef(null);
  const ratingTextRef = useRef(null);

  useEffect(() => {
    const emptyRating = emptyRatingRef.current;
    const fillRating = fillRatingRef.current;
    if (!emptyRating || !fillRating) return;

    // 로그인이 되어 있고, myInfo가 있을 경우 평가하기 이미지 및 텍스트 설정
    if (!isEmpty(user) && myInfo) {
      handleRatingSet(myInfo.rating || 0);
    }

    // 비디오 평가하기 이벤트 설정
    emptyRating.addEventListener('mouseover', handleMouseOver);
    emptyRating.addEventListener('mouseout', handleMouseOut);
    emptyRating.addEventListener('click', handleClick);
    emptyRating.addEventListener('touchstart', handleTouchStart, { passive: true });
    emptyRating.addEventListener('touchmove', handleTouchMove, { passive: false });
    emptyRating.addEventListener('touchend', handleTouchEnd);

    return () => {
      emptyRating.removeEventListener('mouseover', handleMouseOver);
      emptyRating.removeEventListener('mouseout', handleMouseOut);
      emptyRating.removeEventListener('click', handleClick);
      emptyRating.removeEventListener('touchstart', handleTouchStart);
      emptyRating.removeEventListener('touchmove', handleTouchMove);
      emptyRating.removeEventListener('touchend', handleTouchEnd);
    };
  }, [user, myInfo, isRatingPending, isDragging]);

  // 마우스 올렸을 때 이벤트
  const handleMouseOver = (e) => {
    handleRatingMove(e.clientX);
  };

  // 마우스 벗어났을 때 이벤트
  const handleMouseOut = (e) => {
    // 마우스가 빈 별 영역을 벗어났을 경우
    const emptyRating = emptyRatingRef.current;
    if (emptyRating && !emptyRating.contains(e.relatedTarget)) {
      handleRatingSet(myInfo && myInfo.rating ? myInfo.rating : 0);
    }
  };

  // 클릭 이벤트
  const handleClick = async () => {
    if (isDragging) {
      return;
    }
    await saveRating();
  };

  // 터치 시작 이벤트
  const handleTouchStart = (e) => {
    // 드래그 시작
    setIsDragging(true);

    // 터치 시작 위치 저장
    setStartX(e.touches[0].clientX);
    setStartY(e.touches[0].clientY);
  };

  // 터치 이동 이벤트
  const handleTouchMove = (e) => {
    // 스크롤 방지
    e.preventDefault();

    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;

    // X, Y 좌표의 이동 거리 계산
    const deltaX = Math.abs(currentX - startX);
    const deltaY = Math.abs(currentY - startY);

    // X축 이동 거리가 Y축 이동 거리보다 클 경우 별점 이동
    if (deltaX > deltaY && isDragging) {
      // 터치 이동 시 별점 값 갱신
      const touchX = e.touches[0].clientX;
      handleRatingMove(touchX);
    } else {
      setIsDragging(false);
    }
  };

  // 터치 종료 이벤트
  const handleTouchEnd = async (e) => {
    if (isDragging) {
      e.preventDefault();
      // 터치가 끝난 위치로 최종 별점 갱신
      const touchX = e.changedTouches[0].clientX;
      handleRatingMove(touchX);
      // 드래그 종료
      setIsDragging(false);

      await saveRating();
    }
  };

  // 평점 이미지 및 텍스트 설정
  const handleRatingSet = (rating) => {
    const fillRating = fillRatingRef.current;
    const ratingText = ratingTextRef.current;

    if (fillRating && ratingText) {
      fillRating.dataset.rating = rating;
      fillRating.style.width = `${rating * 10}%`;
      ratingText.innerText = VIDEO_RATING_TEXT[rating];
    }

    setImgSrc(`${SETTINGS.CDN_BASE_URL}/assets/images/rating/${rating}.png`);
  };

  // 평점 너비 설정
  const handleRatingMove = (positionX) => {
    // 빈 별점 영역
    const emptyRating = emptyRatingRef.current;
    // 빈 별점 영역의 전체 너비
    const width = emptyRating.getBoundingClientRect().width;
    // 별점의 왼쪽에서부터 터치 위치까지의 거리
    const offsetX = positionX - emptyRating.getBoundingClientRect().left;
    // 0과 1 사이의 비율로 변환
    const ratio = Math.max(0, Math.min(offsetX / width, 1));
    // 비율을 별점으로 변환 (0에서 10까지)
    const rating = Math.ceil(ratio * 10);

    // 계산된 별점으로 너비 설정
    handleRatingSet(rating);
  };

  // 평점 저장
  const saveRating = async () => {
    if (isEmpty(user)) {
      toggleEnjoyModal();
      return;
    }

    // API 호출 중일 경우 리턴
    if (isRatingPending) {
      return;
    }

    const rating = fillRatingRef?.current.dataset.rating;
    if (!rating || rating === '0') {
      return;
    }

    await videoRating(
      { videoId, rating: rating, userId: user.id },
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

  /*
  // 툴팁 코멘트 설정
  const handleTooltipContent = (tRating) => {
    // myInfo가 있고, myInfo.rating이 마우스 오버한 rating과 같을 경우 취소하기 표시
    if (myInfo && myInfo.rating === tRating) {
      return '취소하기';
    } else {
      return `${fRating(tRating)}점`;
    }
  };
  */

  return (
    <article className={styles.rating__container}>
      <div className={styles.rating__image__wrapper}>
        <img className={styles.rating__image} src={imgSrc} alt="평점" ref={ratingImgRef} />
      </div>
      <div className={styles.rating__range__wrapper}>
        <span id="ratingText" className={styles.rating__text} ref={ratingTextRef}>
          {VIDEO_RATING_TEXT[0]}
        </span>

        <div className={styles.rating__range__container}>
          <div className={styles.rating__wrapper}>
            <div className={styles.empty__rating} ref={emptyRatingRef}>
              {Array(5)
                .fill()
                .map((_, i) => (
                  <StarIcon width={36} height={36} key={i} />
                ))}
            </div>
            <div className={styles.fill__rating} ref={fillRatingRef}>
              {Array(5)
                .fill()
                .map((_, i) => (
                  <StarIcon width={36} height={36} key={i} />
                ))}
            </div>
          </div>

          {/* {Array.from({ length: 5 }, (_, i) => (
            <Tooltip
              className={styles.rating__tooltip}
              anchorSelect={`#videoRating${i + 1}`}
              content={handleTooltipContent(i + 1)}
              place="bottom"
              key={i}
            />
          ))} */}
        </div>
      </div>
    </article>
  );
};

export default RatingVideo2;
