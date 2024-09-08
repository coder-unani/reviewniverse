'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/contexts/AuthContext';
import { useModalContext } from '@/contexts/ModalContext';
import { showSuccessToast, showErrorToast } from '@/components/ui/Toast';
import { MESSAGES } from '@/config/messages';
import { ENDPOINTS } from '@/config/endpoints';
import SettingIcon from '@/resources/icons/setting.svg';
import styles from '@/styles/components/SettingButton.module.scss';

const SettingButton = () => {
  const router = useRouter();
  const { logout } = useAuthContext();
  const { toggleConfirmModal } = useModalContext();
  const [isMenuModal, setIsMenuModal] = useState(false);
  const menuRef = useRef();

  // 메뉴 바깥 영역 클릭시 메뉴 닫기
  useEffect(() => {
    const button = document.querySelector(`.${styles.setting__button}`);

    window.addEventListener('click', (e) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target) && !button.contains(e.target)) {
        setIsMenuModal(false);
      }
    });
  }, []);

  // 메뉴 모달 토글
  const toggleMenuModal = () => {
    setIsMenuModal((prev) => !prev);
  };

  // 회원정보 수정 페이지로 이동
  const handleEditClick = () => {
    router.push(ENDPOINTS.USER_PROFILE);
  };

  // 로그아웃
  const handleLogoutClick = async () => {
    toggleMenuModal();

    const confirmed = await new Promise((resolve) => {
      toggleConfirmModal('로그아웃 하시겠어요?', resolve);
    });

    if (confirmed) {
      const res = await logout();
      if (res.status) {
        showSuccessToast(MESSAGES[res.code]);
        router.push(ENDPOINTS.HOME);
      } else {
        showErrorToast(MESSAGES[res.code]);
      }
    }
  };

  // 회원탈퇴 페이지로 이동
  const handleDeleteClick = () => {
    router.push(ENDPOINTS.USER_DELETE);
  };

  return (
    <>
      <button
        type="button"
        className={styles.setting__button}
        onClick={toggleMenuModal}
      >
        <SettingIcon />
      </button>
      {isMenuModal && (
        <div className={styles.setting__menu} ref={menuRef}>
          <ul>
            <li onClick={handleEditClick}>회원정보 수정</li>
            <li onClick={handleLogoutClick}>로그아웃</li>
            <li className={styles.delete} onClick={handleDeleteClick}>
              회원탈퇴
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default SettingButton;
