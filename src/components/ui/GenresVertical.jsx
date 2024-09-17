import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import { EndpointManager, ENDPOINTS } from '@/config/endpoints';
import { fMakeThumbnailUrl } from '@/utils/formatContent';
import { nanoid } from 'nanoid';
import { isEmpty } from 'lodash';
import ArrowLeftIcon from '@/resources/icons/arrow-left.svg';
import ArrowRightIcon from '@/resources/icons/arrow-right.svg';
import styles from '@/styles/components/GenresVertical.module.scss';
import vhStyles from '@/styles/components/VideosHorizontal.module.scss';

const GenresVerticalSwiper = dynamic(() => import('@/components/ui/Swiper/GenresVertical'), { ssr: false });

const GenresVertical = ({ children, genres }) => {
  if (isEmpty(genres)) {
    return null;
  }

  const uniqueId = nanoid();

  return (
    <>
      <section className={vhStyles.horizontal__videos__section}>
        {children}
        <div className={vhStyles.horizontal__videos__wrapper}>
          <div className={`swiper ${vhStyles.horizontal__videos}`} data-swiper-id={uniqueId}>
            <div className="swiper-wrapper">
              {genres.map((genre) => (
                <div className={`swiper-slide genre-margin-right ${vhStyles.horizontal__video__item}`} key={genre.id}>
                  <Link
                    href={EndpointManager.generateUrl(ENDPOINTS.GENRE, { genreId: genre.id })}
                    className={styles.genre__video__link}
                    aria-label={genre.name}
                  >
                    <picture className={styles.genre__thumbnail__wrapper}>
                      <Image
                        className={styles.genre__thumbnail__image}
                        src={fMakeThumbnailUrl(genre.image)}
                        alt={genre.name}
                        width={254}
                        height={382}
                        quality={100}
                        loading="lazy"
                      />
                    </picture>
                    <p className={styles.genre__video__title}>#{genre.name}</p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <button
            type="button"
            className={`swiper-prev-button ${vhStyles.horizontal__prev__button} ${vhStyles.genre}`}
            data-swiper-id={uniqueId}
            disabled // 초기 비활성화
          >
            <ArrowLeftIcon width={28} height={28} />
          </button>
          <button
            type="button"
            className={`swiper-next-button ${vhStyles.horizontal__next__button} ${vhStyles.genre}`}
            data-swiper-id={uniqueId}
          >
            <ArrowRightIcon width={28} height={28} />
          </button>
        </div>
      </section>

      {/* 클라이언트 컴포넌트에서 Swiper 제어 */}
      <GenresVerticalSwiper uniqueId={uniqueId} />
    </>
  );
};

export default GenresVertical;
