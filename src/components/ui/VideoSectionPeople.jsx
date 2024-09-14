import React from 'react';
import Link from 'next/link';
import PeopleImage from '@/components/ui/Button/People/Image';
import { EndpointManager, ENDPOINTS } from '@/config/endpoints';
import { isEmpty } from 'lodash';
import ArrowLeftIcon from '@/resources/icons/arrow-left.svg';
import ArrowRightIcon from '@/resources/icons/arrow-right.svg';
import styles from '@/styles/pages/Contents.module.scss';

const VideoSectionPeople = ({ people, title, formatCode }) => {
  if (isEmpty(people)) {
    return null;
  }

  return (
    <section className={styles.detail__people__section}>
      <h4 className={styles.detail__main__title}>{title}</h4>
      <article className={styles.detail__people__wrapper} data-length={people.length}>
        <div className={`swiper ${styles.detail__people}`}>
          <div className="swiper-wrapper">
            {people.map((person, index) => (
              <div className="swiper-slide" key={index}>
                <Link
                  href={EndpointManager.generateUrl(ENDPOINTS.PEOPLE, { peopleId: person.id })}
                  className={styles.detail__people__link}
                >
                  <PeopleImage image={person.picture} size={60} />
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
          className={styles.people__prev__button}
          // onClick={() => swiperRef.current.slidePrev()}
          // disabled={isBeginning}
        >
          <ArrowLeftIcon width={28} height={28} />
        </button>
        <button
          type="button"
          className={styles.people__next__button}
          // onClick={() => swiperRef.current.slideNext()}
          // disabled={isEnd}
        >
          <ArrowRightIcon width={28} height={28} />
        </button>
      </article>
    </section>
  );
};

export default VideoSectionPeople;
