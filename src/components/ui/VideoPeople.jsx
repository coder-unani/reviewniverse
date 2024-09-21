import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { nanoid } from 'nanoid';
import { isEmpty } from 'lodash';

import { DEFAULT_IMAGES } from '@/config/constants';
import { EndpointManager, ENDPOINTS } from '@/config/endpoints';
import { fMakeImageUrl } from '@/utils/formatContent';
import PeopleImage from '@/components/ui/Button/People/Image';

import ArrowLeftIcon from '@/resources/icons/arrow-left.svg';
import ArrowRightIcon from '@/resources/icons/arrow-right.svg';
import styles from '@/styles/pages/Contents.module.scss';

const VideoPeopleSwiper = dynamic(() => import('@/components/ui/Swiper/VideoPeople'), { ssr: false });

const VideoPeople = ({ people, title, formatCode }) => {
  if (isEmpty(people)) {
    return null;
  }

  const uniqueId = nanoid();

  return (
    <>
      <section className={styles.detail__people__section}>
        <div className={styles.detail__main__title}>{title}</div>
        <article className={styles.detail__people__wrapper} data-length={people.length}>
          <div className={`swiper ${styles.detail__people}`} data-swiper-id={uniqueId}>
            <div className="swiper-wrapper people-template">
              {people.map((person, index) => (
                <div className="swiper-slide" key={index}>
                  <Link
                    href={EndpointManager.generateUrl(ENDPOINTS.PEOPLE, { peopleId: person.id })}
                    className={styles.detail__people__link}
                    aria-label={`${person.name} 작품 보러가기`}
                  >
                    <PeopleImage
                      image={fMakeImageUrl(person.picture, DEFAULT_IMAGES.noActor)}
                      size={60}
                      alt={person.name}
                    />
                    <div className={styles.detail__people__info__wrapper}>
                      <p className={styles.detail__people__name}>{person.name}</p>
                      <div className={styles.detail__people__role__wrapper}>
                        <span className={styles.detail__people__role}>{formatCode(person.code)}</span>
                        {person.role && (
                          <>
                            <span className={styles.detail__people__role}>|</span>
                            <span className={styles.detail__people__role}>{person.role}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <button
            type="button"
            className={`swiper-prev-button ${styles.people__prev__button}`}
            data-swiper-id={uniqueId}
            disabled // 초기 비활성화
          >
            <ArrowLeftIcon width={28} height={28} />
          </button>
          <button
            type="button"
            className={`swiper-next-button ${styles.people__next__button}`}
            data-swiper-id={uniqueId}
          >
            <ArrowRightIcon width={28} height={28} />
          </button>
        </article>
      </section>

      {/* 클라이언트 컴포넌트에서 Swiper 제어 */}
      <VideoPeopleSwiper uniqueId={uniqueId} />
    </>
  );
};

export default VideoPeople;
