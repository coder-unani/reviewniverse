'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { set } from 'lodash';

import { useModalContext } from '@/contexts/ModalContext';

import styles from '@/styles/components/JoinAgree.module.scss';

// 이 파일에서만 아래 속성들의 eslint-disable를 적용
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */

const JoinAgree = ({ setIsAgree, setAgreeValues }) => {
  const { toggleTermsModal, togglePrivacyCollectionModal } = useModalContext();
  const agrees = ['terms', 'privacy', 'age', 'marketing'];

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { isValid },
  } = useForm();

  const onSubmit = handleSubmit(() => {
    setIsAgree(isValid);

    // 선택한 약관 동의 전달하기
    const values = getValues();
    const agreeValues = {};
    agrees.forEach((agree) => {
      set(agreeValues, agree, values[agree]);
    });
    setAgreeValues(agreeValues);
  });

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      agrees.forEach((agree) => {
        setValue(agree, true, { shouldValidate: true });
      });
    } else {
      agrees.forEach((agree) => {
        setValue(agree, false, { shouldValidate: false });
      });
    }
  };

  const handleTermsClick = () => {
    toggleTermsModal();
  };

  const handlePrivacyClick = () => {
    togglePrivacyCollectionModal();
  };

  // 동의 항목 중 하나라도 체크 해제 시, 모두 동의하기 체크 해제
  const allAgrees = watch(agrees);

  useEffect(() => {
    const allChecked = allAgrees.every((agree) => agree === true);
    setValue('all', allChecked, { shouldValidate: false });
  }, [allAgrees, setValue]);

  return (
    <section className={styles.join__agree__section}>
      <h3 className={styles.join__agree__title}>약관 동의</h3>
      <form onSubmit={onSubmit} className={styles.join__agree__form}>
        <div className={styles.join__agree__all}>
          <input
            className={styles.join__agree__input}
            type="checkbox"
            name="all"
            id="all"
            {...register('all')}
            onClick={handleSelectAll}
          />
          <label className={styles.join__agree__label} htmlFor="all">
            모두 동의합니다.
          </label>
        </div>
        <div className={styles.join__agree__terms}>
          <div>
            <input
              className={styles.join__agree__input}
              id="terms"
              type="checkbox"
              name="terms"
              {...register('terms', { required: true })}
            />
            <label className={styles.join__agree__label} htmlFor="terms">
              [필수] 이용약관에 동의합니다.
            </label>
          </div>
          <button type="button" className={styles.join__terms__button} onClick={handleTermsClick}>
            보기
          </button>
        </div>
        <div className={styles.join__agree__privacy}>
          <div>
            <input
              className={styles.join__agree__input}
              id="privacy"
              type="checkbox"
              name="privacy"
              {...register('privacy', { required: true })}
            />
            <label className={styles.join__agree__label} htmlFor="privacy">
              [필수] 개인정보 수집 및 이용에 동의합니다.
            </label>
          </div>
          <button type="button" className={styles.join__privacy__button} onClick={handlePrivacyClick}>
            보기
          </button>
        </div>
        <div className={styles.join__agree__age}>
          <input
            className={styles.join__agree__input}
            id="age"
            type="checkbox"
            name="age"
            {...register('age', { required: true })}
          />
          <label className={styles.join__agree__label} htmlFor="age">
            [필수] 본인은 만 14세 이상입니다.
          </label>
        </div>
        <div className={styles.join__agree__marketing}>
          <input
            className={styles.join__agree__input}
            id="marketing"
            type="checkbox"
            name="marketing"
            {...register('marketing')}
          />
          <label className={styles.join__agree__label} htmlFor="marketing">
            [선택] 이벤트 및 기타 혜택 등에 대한 알림 수신에 동의합니다.
          </label>
        </div>
        <button type="submit" className={styles.join__agree__button} disabled={!isValid}>
          {/* 다음 */}
          완료
        </button>
      </form>
    </section>
  );
};

export default JoinAgree;
