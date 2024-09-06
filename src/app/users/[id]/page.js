'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname, notFound } from 'next/navigation';
import Image from 'next/image';
import { useUser } from '@/hooks/useUser';
import { useAuthContext } from '@/contexts/AuthContext';
import ProfileImage from '@/components/ui/Button/Profile/Image';
import SettingButton from '@/components/ui/Button/Setting';
import { showErrorToast } from '@/components/ui/Toast';
import { DEFAULT_IMAGES } from '@/config/constants';
import { EndpointManager, ENDPOINTS } from '@/config/endpoints';
import { fParseInt, fNumberWithCommas } from '@/utils/format';
import styles from '@/styles/pages/Users.module.scss';

export default function page({ params }) {
  // const location = useLocation();
  const router = useRouter();
  const pathname = usePathname();
  const { id } = params;
  const userId = fParseInt(id);
  const { user, handleSetUser, handleRemoveUser } = useAuthContext();
  const { mutateAsync: userFetch } = useUser();
  const [isLogin, setIsLogin] = useState(false);
  const [profile, setProfile] = useState(null);
  const pathRating = EndpointManager.generateUrl(ENDPOINTS.USER_RATINGS, {
    userId,
  });
  const pathReview = EndpointManager.generateUrl(ENDPOINTS.USER_REVIEWS, {
    userId,
  });
  const pathLike = EndpointManager.generateUrl(ENDPOINTS.USER_LIKES, {
    userId,
  });

  useEffect(() => {
    // 유저 아이디가 숫자가 아니라면 404페이지로 이동
    if (userId === 0) {
      notFound();
    }

    // 유저 정보 수정 후 전달받는 state 값
    // const { isUserUpdate } = location.state || false;
    // 유저 정보 조회
    const getUser = async () => {
      const res = await userFetch({ userId: userId });
      if (res.status) {
        setProfile(res.data);

        // 유저 정보 수정 후 유저 정보 갱신
        // TODO: 고도화 필요
        if (isUserUpdate) {
          handleSetUser({ user: res.data });
          // router.push(location.pathname, { replace: true, state: {} });
        }
      } else {
        if (user && user.id === userId) {
          handleRemoveUser();
        }
        router.back();
        showErrorToast(res.code);
      }
    };

    getUser();
  }, [userId]);

  useEffect(() => {
    // TODO: 고도화 필요
    // 로그인한 유저가 있다면 userId와 로그인한 유저 id가 같은지 확인
    if (user && user.id === userId) {
      // 세팅 버튼 표시
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [pathname, user, userId]);

  return (
    <main className={styles.user__main}>
      <section className={styles.user__section}>
        {profile && (
          <div className={styles.user__wrapper}>
            <section className={styles.user__info}>
              {isLogin && <SettingButton />}
              <div className={styles.user__background}>
                <Image
                  className={styles.user__background__image}
                  src={DEFAULT_IMAGES.noImage}
                  alt="배경 이미지"
                  sizes="(max-width: 768px) 100%, (max-width: 1200px) 100%"
                  fill
                  priority
                />
              </div>
              <div className={styles.user__profile}>
                <ProfileImage image={profile.profile_image} size={100} />
                <h1 className={styles.user__nickname}>{profile.nickname}</h1>
                {profile.profile_text && (
                  <p className={styles.user__introduction}>
                    {profile.profile_text}
                  </p>
                )}
              </div>
              <div className={styles.user__content}>
                <Link href={pathRating}>
                  <p className={styles.user__content__count}>
                    {fNumberWithCommas(profile.rating_count)}
                  </p>
                  <p className={styles.user__content__label}>평가</p>
                </Link>
                <Link href={pathReview}>
                  <p className={styles.user__content__count}>
                    {fNumberWithCommas(profile.review_count)}
                  </p>
                  <p className={styles.user__content__label}>리뷰</p>
                </Link>
                <Link href={pathLike}>
                  <p className={styles.user__content__count}>
                    {fNumberWithCommas(profile.like_count)}
                  </p>
                  <p className={styles.user__content__label}>좋아요</p>
                </Link>
              </div>
            </section>
          </div>
        )}
      </section>
    </main>
  );
}
