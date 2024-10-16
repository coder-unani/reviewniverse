'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { isEmpty } from 'lodash';

import { USER_WATCH_TYPE_CODE } from '@/config/codes';
import { ENDPOINTS } from '@/config/endpoints';
import { useAuthContext } from '@/contexts/AuthContext';
import { useWatchtypeCreate } from '@/hooks/useWatchtypeCreate';
import { showSuccessToast, showInfoToast } from '@/components/ui/Toast';

import CheckIcon from '@/resources/icons/check.svg';
import styles from '@/styles/pages/UsersWatchtype.module.scss';

/**
 * TODO:
 * - 유저가 없을 경우 로그인 페이지로 이동
 * - 크기 줄이기
 */

const UsersWatchtype = () => {
  const router = useRouter();
  const { user } = useAuthContext();
  const [selectedFavorites, setSelectedFavorites] = useState([]);
  const { mutate: watchtypeCreate, isPending } = useWatchtypeCreate();

  const handleFavorite = (id) => {
    if (selectedFavorites.length >= 3 && !selectedFavorites.includes(id)) {
      showInfoToast('3개까지 선택 가능합니다.');
      return;
    }

    setSelectedFavorites((prev) => {
      const isSelected = prev.includes(id);
      if (isSelected) {
        return prev.filter((favoriteId) => favoriteId !== id);
      }
      return [...prev, id];
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // API 호출 중일 경우 리턴
    if (isPending) return;
    // 선택된 취향이 없을 경우 리턴
    if (isEmpty(selectedFavorites)) return;

    const watchtype = selectedFavorites.join(',');
    watchtypeCreate(
      { userId: user.id, watchtype },
      {
        onSuccess: (res) => {
          if (res.status === 201) {
            router.push(ENDPOINTS.HOME);
            showSuccessToast('회원성향이 등록되었습니다.');
          }
        },
      }
    );
  };

  return (
    <section className={styles.favorite__section}>
      <form className={styles.favorite__form} onSubmit={handleSubmit}>
        <h2>회원님의 취향을 선택해주세요.👀</h2>
        <p>
          <em>3개</em>까지 선택 가능합니다.
        </p>
        <div className={styles.favorite__content__wrapper}>
          {Object.entries(USER_WATCH_TYPE_CODE).map(([key, value]) => (
            <section
              key={key}
              className={`${styles.favorite__card} ${selectedFavorites.includes(key) ? styles.active : ''}`}
              onClick={() => handleFavorite(key)}
              role="presentation"
            >
              <div className={styles.favorite__content}>
                <picture className={styles.favorite__image__wrapper}>
                  <Image
                    className={styles.favorite__image}
                    src={value.image}
                    alt="취향 이미지"
                    width={200}
                    height={200}
                    priority
                  />
                </picture>
                <p className={styles.favorite__subtitle}>{value.subtitle}</p>
                <p className={styles.favorite__title}>{value.title}</p>
              </div>
              <button
                className={styles.favorite__check}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleFavorite(key);
                }}
              >
                <CheckIcon width={30} height={30} />
              </button>
            </section>
          ))}
        </div>
        <button
          className={styles.favorite__submit__button}
          type="submit"
          disabled={isEmpty(selectedFavorites) || isPending}
        >
          완료
        </button>
      </form>
    </section>
  );
};

export default UsersWatchtype;
