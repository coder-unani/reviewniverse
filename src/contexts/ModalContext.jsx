'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

import { EndpointManager, ENDPOINTS } from '@/config/endpoints';
import { setStorageHasVisited, getStorageHasVisited, getStorageHidePopupBanner } from '@/utils/formatStorage';
import PopupBanner from '@/components/ui/Banner/Popup';
import EnjoyModal from '@/components/ui/Modal/Enjoy';
import ConfirmModal from '@/components/ui/Modal/Confirm';
import TermsModal from '@/components/ui/Modal/Terms';
import PrivacyModal from '@/components/ui/Modal/Privacy';
import PrivacyCollectionModal from '@/components/ui/Modal/PrivacyCollection';

/**
 * TODO:
 * - 팝업 모달
 */

const ModalContext = createContext();

const ModalContextProvider = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  // 팝업 모달
  const [isPopupBanner, setIsPopupBanner] = useState(false);
  // 로그인 모달
  const [isEnjoyModal, setIsEnjoyModal] = useState(false);
  // 리뷰 모달
  const [isReviewModal, setIsReviewModal] = useState(false);
  // 약관 모달
  const [isTermsModal, setIsTermsModal] = useState(false);
  // 개인정보 처리방침 모달
  const [isPrivacyModal, setIsPrivacyModal] = useState(false);
  // 개인정보 수집 및 이용 동의 모달
  const [isPrivcayCollectionModal, setIsPrivacyCollectionModal] = useState(false);
  // 확인 모달
  const [isConfirmModal, setIsConfirmModal] = useState(false);
  // 확인 모달 메세지
  const [confirmMessage, setConfirmMessage] = useState('');
  // 확인 모달 결과 처리 함수
  const [confirmResolve, setConfirmResolve] = useState(null);

  /*
  // 팝업 배너
  useEffect(() => {
    // router.pathname이 /users 하위일 경우 팝업 모달창 띄우지 않기
    if (pathname.includes('/users')) return;

    const hidePopupBanner = getStorageHidePopupBanner();
    if (hidePopupBanner) return;

    const hasVisited = getStorageHasVisited();
    if (pathname !== ENDPOINTS.HOME && hasVisited) {
      if (isPopupBanner) setIsPopupBanner(false);
      return;
    }

    setIsPopupBanner(true);
    setStorageHasVisited(true);
  }, [pathname]);
  */

  useEffect(() => {
    // 페이지 이동 시 모달창 닫기
    if (isEnjoyModal) setIsEnjoyModal(false);
    if (isReviewModal) setIsReviewModal(false);
    if (isTermsModal) setIsTermsModal(false);
    if (isPrivacyModal) setIsPrivacyModal(false);
    if (isPrivcayCollectionModal) setIsPrivacyCollectionModal(false);
    if (isConfirmModal) setIsConfirmModal(false);
  }, [pathname]);

  // 팝업 배너 토글
  const togglePopupBanner = () => {
    setIsPopupBanner((prev) => !prev);
  };

  // 로그인 모달창 토글
  const toggleEnjoyModal = () => {
    setIsEnjoyModal((prev) => !prev);
  };

  // 리뷰 모달창 토글
  const toggleReviewModal = () => {
    setIsReviewModal((prev) => !prev);
  };

  // 약관 모달창 토글
  const toggleTermsModal = () => {
    setIsTermsModal((prev) => !prev);
  };

  // 개인정보 처리방침 모달창 토글
  const togglePrivacyModal = () => {
    setIsPrivacyModal((prev) => !prev);
  };

  // 개인정보 수집 및 이용 동의 모달창 토글
  const togglePrivacyCollectionModal = () => {
    setIsPrivacyCollectionModal((prev) => !prev);
  };

  // 확인 모달창 토글
  const toggleConfirmModal = (message, resolve) => {
    // 메세지 설정
    setConfirmMessage(message);
    // 확인 결과를 처리할 함수 설정
    setConfirmResolve(() => resolve);
    // 확인 모달창 열기
    setIsConfirmModal(true);
  };

  // 확인 모달창 닫기
  const handleConfirm = (result) => {
    if (confirmResolve) {
      confirmResolve(result);
      setConfirmResolve(null);
    }
    setIsConfirmModal(false);
  };

  const values = useMemo(
    () => ({
      isReviewModal,
      toggleEnjoyModal,
      toggleReviewModal,
      toggleTermsModal,
      togglePrivacyModal,
      togglePrivacyCollectionModal,
      toggleConfirmModal,
    }),
    [isReviewModal]
  );

  return (
    <ModalContext.Provider value={values}>
      {children}
      {isPopupBanner && <PopupBanner onClose={togglePopupBanner} />}
      {isEnjoyModal && <EnjoyModal onClose={toggleEnjoyModal} />}
      {isTermsModal && <TermsModal onClose={toggleTermsModal} />}
      {isPrivacyModal && <PrivacyModal onClose={togglePrivacyModal} />}
      {isPrivcayCollectionModal && <PrivacyCollectionModal onClose={togglePrivacyCollectionModal} />}
      <ConfirmModal isOpen={isConfirmModal} onClose={() => handleConfirm(false)} onConfirm={() => handleConfirm(true)}>
        {confirmMessage}
      </ConfirmModal>
    </ModalContext.Provider>
  );
};

const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModalContext must be used within an ModalContextProvider');
  }
  return context;
};

export { ModalContextProvider, useModalContext };
