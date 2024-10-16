'use client';

import React from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import DOMPurify from 'dompurify';

import { INQUIRY_CODE } from '@/config/codes';
import { ReqInquiry } from '@/types/request';
// import { IInquiryProps } from '@/types/inquiry';
import { useModalContext } from '@/contexts/ModalContext';
import { fetchInquiry } from '@/library/api/support';

import styles from '@/styles/pages/Inquiry.module.scss';

// TODO: 제목 기본값 설정

// 이 파일에서만 아래 속성들의 eslint-disable를 적용
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */

// 유효성 검사 스키마
const InquirySchema = Yup.object().shape({
  topic: Yup.string().required('문의/제보 유형을 선택해주세요.'),
  title: Yup.string()
    .required('문의/제보 제목을 입력해주세요.')
    .max(200, '문의/제보 제목은 200자 이내로 입력해주세요.'),
  content: Yup.string()
    .required('문의/제보 내용을 입력해주세요.')
    .max(1000, '문의/제보 내용은 1000자 이내로 입력해주세요.'),
  email: Yup.string().email('이메일 형식이 올바르지 않습니다.').required('이메일 주소를 입력해주세요.'),
  is_agree_provide_email: Yup.boolean()
    .oneOf([true], '이메일 정보 제공에 동의해주세요.')
    .required('이메일 정보 제공에 동의해주세요.'),
});

// const InquiryForm = ({ videoId }: IInquiryProps) => {
const InquiryForm = () => {
  const { openInfoModal } = useModalContext();

  // 폼 기본값 설정
  const defaultValues: ReqInquiry = {
    topic: '10',
    title: '',
    content: '',
    email: '',
    is_agree_provide_email: false,
  };

  // 폼 메소드 설정
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<ReqInquiry>({
    resolver: yupResolver(InquirySchema),
    defaultValues,
    mode: 'onChange',
  });

  // 폼 제출
  const onSubmit = handleSubmit(async (data: ReqInquiry) => {
    // DOMPurify로 제목, 내용 XSS 방지
    const inquiryData: ReqInquiry = {
      topic: data.topic,
      title: DOMPurify.sanitize(data.title),
      content: DOMPurify.sanitize(data.content),
      email: data.email,
      is_agree_provide_email: data.is_agree_provide_email,
    };

    const resInquiry = await fetchInquiry({ inquiryData });
    if (resInquiry?.status === 201) {
      const message = () => (
        <>
          문의/제보가 정상적으로 접수되었습니다.
          <br />
          <span>
            문의하신 내용에 대한 답변은 담당자가 확인 후 기재하신 이메일로 빠른 시간내에 답변 드리겠습니다.
            <br />
            감사합니다.
          </span>
        </>
      );
      openInfoModal(message);
    }
  });

  return (
    <section className={styles.inquiry__section}>
      <div className={styles.inquiry__title__wrapper}>
        <h2 className={styles.inquiry__title}>문의 및 제보하기</h2>
      </div>

      <form onSubmit={onSubmit} className={styles.inquiry__form} encType="multipart/form-data">
        <div className={styles.inquiry__input__wrapper}>
          <label className={styles.inquiry__label} htmlFor="topic">
            문의/제보 유형
          </label>
          <select id="topic" className={styles.inquiry__select} defaultValue={10} {...register('topic')}>
            {Object.entries(INQUIRY_CODE).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
          {errors.topic && <p className={styles.inquiry__error}>{errors.topic.message}</p>}
        </div>

        <div className={`${styles.inquiry__input__wrapper} ${styles.title}`}>
          <label className={styles.inquiry__label} htmlFor="title">
            문의/제보 제목
          </label>
          <input
            className={styles.inquiry__input}
            type="text"
            id="title"
            placeholder="제목을 입력해주세요."
            spellCheck="false"
            {...register('title')}
          />
          {errors.title && <p className={styles.inquiry__error}>{errors.title.message}</p>}
        </div>

        <div className={`${styles.inquiry__input__wrapper} ${styles.content}`}>
          <label className={styles.inquiry__label} htmlFor="content">
            문의/제보 내용
          </label>
          <textarea
            id="content"
            className={styles.inquiry__textarea}
            placeholder="문의 및 제보하실 내용을 입력해주세요."
            spellCheck="false"
            {...register('content')}
          />
          {errors.content && <p className={styles.inquiry__error}>{errors.content.message}</p>}
        </div>

        <div className={`${styles.inquiry__input__wrapper} ${styles.email}`}>
          <label className={styles.inquiry__label} htmlFor="email">
            회신 받을 이메일
          </label>
          <input
            className={styles.inquiry__input}
            type="email"
            id="email"
            placeholder="이메일 주소를 입력해주세요."
            spellCheck="false"
            {...register('email')}
          />
          {errors.email && <p className={styles.inquiry__error}>{errors.email.message}</p>}
        </div>

        <div className={styles.inquiry__input__wrapper}>
          <div className={styles.inquiry__email__agree}>
            <input
              className={styles.inquiry__input}
              type="checkbox"
              id="is_agree_provide_email"
              {...register('is_agree_provide_email')}
            />
            <label className={styles.inquiry__label} htmlFor="is_agree_provide_email">
              이메일 정보 제공에 동의합니다.
            </label>
          </div>
          {errors.is_agree_provide_email && (
            <p className={styles.inquiry__error}>{errors.is_agree_provide_email.message}</p>
          )}
        </div>

        <button className={styles.inquiry__submit__button} type="submit" disabled={!isDirty || !isValid}>
          보내기
        </button>
      </form>
    </section>
  );
};

export default InquiryForm;
