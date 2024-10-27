import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { nanoid } from 'nanoid';
import { isEmpty } from 'lodash';

import ReviewWithVideo from '@/components/ui/ReviewWithVideo';

import ArrowLeftIcon from '@/resources/icons/arrow-left.svg';
import ArrowRightIcon from '@/resources/icons/arrow-right.svg';
// import styles from '@/styles/components/GenresSwiper.module.scss';
import vhStyles from '@/styles/components/VideosSwiper.module.scss';

const ReviewsSwiperClient = dynamic(() => import('@/components/ui/Client/ReviewsSwiper'), { ssr: false });

const ReviewsSwiper = ({ children, reviews }) => {
  if (isEmpty(reviews)) return null;

  const uniqueId = nanoid();

  return (
    <>
      <section className={vhStyles.horizontal__videos__section}>
        {children}
        <div className={vhStyles.horizontal__videos__wrapper}>
          <div className={`swiper ${vhStyles.horizontal__videos}`} data-swiper-id={uniqueId}>
            <div className="swiper-wrapper">
              {reviews.map((review) => (
                <div
                  className={`swiper-slide review-template ${vhStyles.horizontal__video__item}`}
                  data-v-id={review.video.id}
                  key={review.id}
                >
                  <ReviewWithVideo user={review.user} review={review} isDate={false} isShort />
                </div>
              ))}
            </div>
          </div>
          <button
            type="button"
            className={`swiper-prev-button ${vhStyles.horizontal__prev__button}`}
            data-swiper-id={uniqueId}
            disabled // 초기 비활성화
          >
            <ArrowLeftIcon width={28} height={28} />
          </button>
          <button
            type="button"
            className={`swiper-next-button ${vhStyles.horizontal__next__button}`}
            data-swiper-id={uniqueId}
          >
            <ArrowRightIcon width={28} height={28} />
          </button>
        </div>
      </section>

      {/* 클라이언트 컴포넌트에서 Swiper 제어 */}
      <Suspense fallback="">
        <ReviewsSwiperClient uniqueId={uniqueId} />
      </Suspense>
    </>
  );
};

export default ReviewsSwiper;
