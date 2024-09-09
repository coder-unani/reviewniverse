import React from 'react';
import Link from 'next/link';
import PeopleImage from '@/components/ui/Button/People/Image';
import { EndpointManager, ENDPOINTS } from '@/config/endpoints';
import styles from '@/styles/components/PeopleItem.module.scss';

const PeopleItem = ({ crew, target, formatCode }) => {
  const path = EndpointManager.generateUrl(ENDPOINTS.PEOPLE, {
    peopleId: crew.id,
  });

  return (
    <Link
      href={path}
      state={{ people: crew, target }}
      className={styles.detail__people__link}
      key={crew.id}
    >
      <PeopleImage image={crew.picture} size={60} />
      <div className={styles.detail__people__info__wrapper}>
        <p className={styles.detail__people__name}>{crew.name}</p>
        <div className={styles.detail__people__role__wrapper}>
          <span className={styles.detail__people__role}>
            {formatCode(crew.code)}
          </span>
          {crew.role && (
            <>
              <span className={styles.detail__people__role}>|</span>
              <span className={styles.detail__people__role}>{crew.role}</span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};

export default PeopleItem;
