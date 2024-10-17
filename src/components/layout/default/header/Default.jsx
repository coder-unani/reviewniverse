'use client';

import React from 'react';
import Link from 'next/link';
import { isEmpty } from 'lodash';

import { EndpointManager, ENDPOINTS } from '@/config/endpoints';
import { useAuthContext } from '@/contexts/AuthContext';
import ProfileImage from '@/components/ui/Button/Profile/Image';
import SearchForm from '@/components/ui/SearchForm';

import styles from '@/styles/components/Header.module.scss';

const DefaultHeader = () => {
  const { user } = useAuthContext();

  return (
    <>
      <section className={styles.search__container}>
        <SearchForm />
      </section>
      <section className={styles.toolbar__container}>
        {isEmpty(user) ? (
          // 로그인 버튼 렌더링
          <Link href={ENDPOINTS.USER_LOGIN} className={styles.toolbar__login}>
            로그인
          </Link>
        ) : (
          // 프로필 이미지 렌더링
          <Link
            href={EndpointManager.generateUrl(ENDPOINTS.USER, { userId: user.id })}
            className={styles.toolbar__user}
          >
            <ProfileImage image={user.profile_image} size={34} />
          </Link>
        )}
      </section>
    </>
  );
};

export default DefaultHeader;
