'use client';

import React, { useRef, useCallback } from 'react';
import Link from 'next/link';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { isEmpty } from 'lodash';

import { EndpointManager, ENDPOINTS } from '@/config/endpoints';
import { cLog } from '@/utils/test';
import { fYear } from '@/utils/format';
import { fThumbnail, fCountry, fRatingColor, fRatingText } from '@/utils/formatContent';

import defStyles from '@/styles/components/Video.module.scss';

const VideosForPeople = ({ videos, handlePage, pageSize }) => {
  const hasMore = videos.count === pageSize;
  const observer = useRef();

  const lastItemRef = useCallback(
    (node) => {
      if (!hasMore) {
        cLog('마지막 페이지입니다.');
        if (observer.current) observer.current.disconnect(); // 관찰 중지
        return;
      }

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            handlePage(videos.page + 1);
          }
        },
        { threshold: 0.5 } // 요소가 절반 이상 보일 때만 실행
      );

      if (node) observer.current.observe(node);
    },
    [hasMore, videos]
  );

  if (isEmpty(videos.data)) {
    return null;
  }

  return (
    <>
      {videos.data.map((video) => (
        <Link
          href={EndpointManager.generateUrl(ENDPOINTS.CONTENTS, { videoId: video.id })}
          className={defStyles.default__video__item}
          aria-label={video.title}
          key={video.id}
        >
          <div className={defStyles.default__thumbnail__container}>
            <picture className={defStyles.default__thumbnail__wrapper}>
              <LazyLoadImage
                className={defStyles.default__thumbnail}
                src={fThumbnail(video.thumbnail)}
                srcSet={fThumbnail(video.thumbnail)}
                alt={video.title}
                effect="blur"
              />
            </picture>
            <div className={defStyles.default__code__wrapper}>
              <div className={defStyles.default__code}>{video.code_string}</div>
            </div>
          </div>
          <div className={defStyles.default__info__container}>
            <p className={defStyles.default__title}>{video.title}</p>
            <div className={defStyles.default__subtitle__wrapper}>
              <div className={defStyles.default__subtitle}>
                <span>{fYear(video.release)}</span>
                {video.country && (
                  <>
                    <span>|</span>
                    <span>{fCountry(video.country)}</span>
                  </>
                )}
              </div>
              <div className={defStyles.default__rating__wrapper} data-color={fRatingColor(video.rating)}>
                <div className={defStyles.default__rating__square}></div>
                <span className={defStyles.default__rating}>{fRatingText(video.rating)}</span>
              </div>
            </div>
          </div>
        </Link>
      ))}
      {hasMore && <article ref={lastItemRef}></article>}
    </>
  );
};

export default VideosForPeople;
