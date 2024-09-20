'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { isEmpty } from 'lodash';

import { USER_WATCH_TYPE } from '@/config/codes';
import { ENDPOINTS } from '@/config/endpoints';
import { useAuthContext } from '@/contexts/AuthContext';
import { useWatchTypeCreate } from '@/hooks/useWatchTypeCreate';
import { showSuccessToast, showInfoToast } from '@/components/ui/Toast';

import CheckIcon from '@/resources/icons/check.svg';
import styles from '@/styles/pages/UsersWatchType.module.scss';

/**
 * TODO:
 * - 유저가 없을 경우 로그인 페이지로 이동
 * - 크기 줄이기
 */

const UsersWatchType = () => {
  const router = useRouter();
  const { user } = useAuthContext();
  const [selectedFavorites, setSelectedFavorites] = useState([]);
  const { mutate: watchTypeCreate, isPending } = useWatchTypeCreate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isPending) {
      return;
    }
    if (isEmpty(selectedFavorites)) {
      // showErrorToast("1개 이상 선택해주세요.");
      return;
    }
    const watchType = selectedFavorites.join(',');
    await watchTypeCreate(
      { userId: user.id, watchType },
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
          {USER_WATCH_TYPE.map((watchtype) => (
            <section
              key={watchtype.id}
              className={`${styles.favorite__card} ${selectedFavorites.includes(watchtype.id) ? styles.active : ''}`}
              onClick={() => handleFavorite(watchtype.id)}
            >
              <div className={styles.favorite__content}>
                <picture className={styles.favorite__image__wrapper}>
                  <Image
                    className={styles.favorite__image}
                    src={watchtype.image}
                    alt="취향 이미지"
                    width={200}
                    height={200}
                    priority
                  />
                </picture>
                <p className={styles.favorite__subtitle}>{watchtype.subtitle}</p>
                <p className={styles.favorite__title}>{watchtype.title}</p>
              </div>
              <button
                className={styles.favorite__check}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleFavorite(watchtype.id);
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

export default UsersWatchType;
