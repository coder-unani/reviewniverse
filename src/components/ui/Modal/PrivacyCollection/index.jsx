'use client';

import React, { useEffect, useRef } from 'react';
import Modal from 'react-modal';

import CloseButton from '@/components/ui/Button/Close';

import styles from '@/styles/components/PolicyModal.module.scss';

const PrivacyCollectionModal = React.memo(({ isOpen, onClose }) => {
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
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      bodyOpenClassName="modal__open"
      className={styles.policy__modal__wrapper}
      overlayClassName={styles.policy__modal__overlay}
      ariaHideApp={false} // 중복 생성 방지
    >
      <div className={styles.policy__modal} ref={modalRef} onClick={handleModalClose}>
        <section className={styles.policy__section}>
          <section className={styles.policy__header__section}>
            <CloseButton onClose={onClose} />
            <h1 className={styles.policy__header__title}>개인정보 수집 및 이용 동의</h1>
          </section>
          <section className={styles.policy__content__section}>
            <div className={styles.policy__version__wrapper}>
              <select className={styles.policy__version__select} name="이전 버전 보기">
                {/* option 기본값 */}
                <option value="2024-08-22">2024-08-22</option>
                <option value="2024-05-24">2024-05-24</option>
              </select>
            </div>
            <div className={styles.policy__content__wrapper}>
              <p>1) 필수 개인정보 수집 항목</p>
              <table className={styles.policy__table}>
                <thead>
                  <tr>
                    <th>수집 및 이용 목적</th>
                    <th colSpan={2}>수집 및 이용 항목</th>
                    <th>보유 및 이용기간</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td rowSpan={3}>SNS ID 회원 가입 및 회원 관리</td>
                    <td>카카오</td>
                    <td>이름, 이메일주소, 닉네임, 프로필 사진</td>
                    <td rowSpan={3}>회원 탈퇴 시까지</td>
                  </tr>
                  <tr>
                    <td>네이버</td>
                    <td>이름, 이메일주소, 닉네임, 프로필 사진</td>
                  </tr>
                  <tr>
                    <td>구글</td>
                    <td>이름, 이메일주소, 프로필 사진</td>
                  </tr>
                  <tr>
                    <td>만 14세 미만 회원가입 법정대리인 동의</td>
                    <td colSpan={2}>법정대리인의 이름, 생년월일, 성별, 중복가입확인정보, 휴대전화번호</td>
                    <td>회원 탈퇴 시까지</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className={styles.policy__content__wrapper}>
              <ul className={styles.policy__privacy__more__list}>
                <li>
                  법률의 특별한 규정 또는 법령상 의무 준수를 위해 불가피한 경우에는 정보주체의 동의 없이 개인정보를 수집
                  ∙ 이용할 수 있습니다.
                </li>
                <li>
                  회원은 개인정보의 수집 및 이용 동의를 거부할 권리가 있습니다. 회원가입 시 수집하는 최소한의 개인정보,
                  즉, 필수 항목에 대한 수집 및 이용 동의를 거부하실 경우, 회원가입이 어려울 수 있습니다.
                </li>
              </ul>
            </div>
          </section>
        </section>
      </div>
    </Modal>
  );
});

export default PrivacyCollectionModal;
