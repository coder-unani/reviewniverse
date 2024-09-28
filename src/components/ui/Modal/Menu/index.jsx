'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { isEmpty } from 'lodash';

import { DEFAULT_IMAGES } from '@/config/constants';
import { ENDPOINTS } from '@/config/endpoints';
import { useAuthContext } from '@/contexts/AuthContext';
import Modal from '@/components/ui/Modal';
import CloseButton from '@/components/ui/Button/Close';
import ProfileButton from '@/components/ui/Button/Profile';

import ArrowRightIcon from '@/resources/icons/arrow-right.svg';
import styles from '@/styles/components/MenuModal.module.scss';

/**
 * TODO:
 * - 아이콘 넓이 높이 지정
 * - 메뉴 애니메이션 추가
 */

const MenuModal = ({ onClose }) => {
  const { user } = useAuthContext();
  const modalRef = useRef();

  // 메뉴 모달 바깥 영역 클릭시 모달 닫기
  const handleModalClose = (e) => {
    if (e.target === modalRef.current) {
      onClose();
    }
  };

  // 프로필 버튼 렌더링
  const RenderProfileButton = () => <ProfileButton user={user} size={28} onClose={onClose} />;

  // 로그인 버튼 렌더링
  const RenderLoginButton = () => (
    <Link href={ENDPOINTS.USER_LOGIN} className={styles.menu__header__login} onClick={onClose}>
      <Image
        className={styles.menu__profile__image}
        src={DEFAULT_IMAGES.noActor}
        alt="프로필 이미지"
        width={28}
        height={28}
        loading="lazy"
      />
      로그인 해주세요
      <ArrowRightIcon width={24} height={24} />
    </Link>
  );

  // 로그인 여부에 따라 프로필 또는 로그인 버튼 렌더링
  return (
    <Modal>
      <div className={styles.menu__modal__wrapper} ref={modalRef} onClick={handleModalClose}>
        <main className={styles.menu__modal}>
          <div className={styles.menu__header}>
            <CloseButton onClose={onClose} />
            <div className={styles.menu__header__user}>
              {isEmpty(user) ? <RenderLoginButton /> : <RenderProfileButton />}
            </div>
          </div>
          <div className={styles.menu__body}>
            <p className={styles.menu__body__title}>메뉴</p>
            <ul className={styles.menu__body__list}>
              <li className={styles.menu__body__item}>
                <Link href={ENDPOINTS.HOME} className={styles.menu__body__link} onClick={onClose}>
                  홈
                </Link>
              </li>
            </ul>
          </div>
        </main>
      </div>
    </Modal>
  );
};

export default MenuModal;
