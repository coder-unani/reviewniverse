'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Modal from 'react-modal';
import { isEmpty } from 'lodash';

import { DEFAULT_IMAGES } from '@/config/constants';
import { ENDPOINTS } from '@/config/endpoints';
import { useAuthContext } from '@/contexts/AuthContext';
import CloseButton from '@/components/ui/Button/Close';
import ProfileButton from '@/components/ui/Button/Profile';

import ArrowRightIcon from '@/resources/icons/arrow-right.svg';
import styles from '@/styles/components/MenuModal.module.scss';

/**
 * TODO:
 * - 아이콘 넓이 높이 지정
 * - 메뉴 애니메이션 추가
 */

const MenuModal = ({ isOpen, onClose }) => {
  const { user } = useAuthContext();
  const [isAnimating, setIsAnimating] = useState(false);
  const modalRef = useRef();

  // 모달창 클릭 이벤트
  const handleModalClose = (e) => {
    if (e.target === modalRef.current) onClose();
  };

  // 클라이언트 사이드에서만 Modal.setAppElement 설정
  useEffect(() => {
    // window 객체가 존재할 때만 실행
    if (typeof window !== 'undefined') {
      // Next.js에서는 #__next가 최상위 요소, #__next 인식하지 못해 대신 wrapper로 변경
      // Modal.setAppElement(document.getElementById('__next'));
      Modal.setAppElement(document.getElementById('wrapper'));
    }

    if (isOpen) {
      // 모달이 열릴 때 애니메이션을 적용하기 위해 딜레이를 주어 클래스를 설정
      setTimeout(() => {
        setIsAnimating(true);
      }, 10);
    } else {
      // 모달이 닫힐 때는 애니메이션을 바로 해제
      setIsAnimating(false);
    }
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      bodyOpenClassName="modal__open"
      className={`${styles.menu__modal__wrapper} ${isAnimating ? styles.open : styles.close}`}
      overlayClassName={styles.menu__modal__overlay}
      closeTimeoutMS={300} // 애니메이션 지속 시간과 일치시켜 닫기 애니메이션 추가
    >
      <div className={styles.menu__modal} ref={modalRef} onClick={handleModalClose}>
        <section className={styles.menu__header}>
          <CloseButton onClose={onClose} />
          <div className={styles.menu__header__user}>
            {/* 로그인 여부에 따라 프로필 또는 로그인 버튼 렌더링 */}
            {isEmpty(user) ? (
              <Link href={ENDPOINTS.USER_LOGIN} className={styles.menu__header__login} onClick={onClose}>
                <Image
                  className={styles.menu__profile__image}
                  src={DEFAULT_IMAGES.noActor}
                  alt="프로필 이미지"
                  width={28}
                  height={28}
                />
                로그인 해주세요
                <ArrowRightIcon width={24} height={24} />
              </Link>
            ) : (
              <ProfileButton user={user} size={28} onClose={onClose} />
            )}
          </div>
        </section>
        <section className={styles.menu__body}>
          <p className={styles.menu__body__title}>메뉴</p>
          <ul className={styles.menu__body__list}>
            <li className={styles.menu__body__item}>
              <Link href={ENDPOINTS.HOME} className={styles.menu__body__link} onClick={onClose}>
                홈
              </Link>
              <Link href={ENDPOINTS.UPCOMING} className={styles.menu__body__link} onClick={onClose}>
                공개 예정작
              </Link>
            </li>
          </ul>
        </section>
      </div>
    </Modal>
  );
};

export default MenuModal;
