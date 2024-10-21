'use client';

import React, { useEffect, useRef, useState } from 'react';
import Modal from 'react-modal';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { Tooltip } from 'react-tooltip';
import DOMPurify from 'dompurify';
import { isEmpty } from 'lodash';

import { useAuthContext } from '@/contexts/AuthContext';
import { useModalContext } from '@/contexts/ModalContext';
import { showSuccessToast } from '@/components/ui/Toast';
import { useReviewCreate } from '@/hooks/useReviewCreate';
import { useReviewUpdate } from '@/hooks/useReviewUpdate';
import CloseButton from '@/components/ui/Button/Close';

import FillSpoilerIcon from '@/resources/icons/fill-spoiler.svg';
import OutlineSpoilerIcon from '@/resources/icons/outline-spoiler.svg';
import FillPrivateIcon from '@/resources/icons/fill-private.svg';
import OutlinePrivateIcon from '@/resources/icons/outline-private.svg';
import styles from '@/styles/components/ReviewModal.module.scss';

/**
 * TODO:
 * - 아이콘 넓이, 높이 명시적으로 지정
 */

// 이 파일에서만 아래 속성들의 eslint-disable를 적용
/* eslint-disable react/jsx-props-no-spreading */

const ReviewModal = React.memo(({ content, myReview, isOpen, onClose }) => {
  const modalRef = useRef();
  const { user } = useAuthContext();
  const { toggleConfirmModal } = useModalContext();
  const { mutate: reviewCreate, isPending: isCreatePending } = useReviewCreate();
  const { mutate: reviewUpdate, isPending: isUpdatePending } = useReviewUpdate();
  const [isSpoiler, setIsSpoiler] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);
  const textareaRef = useRef(null);

  // 리뷰 유효성 검사
  const reviewSchema = Yup.object().shape({
    title: Yup.string().required('리뷰를 입력해주세요.').max(200, '리뷰는 최대 200자까지 작성 가능합니다.'),
  });

  // 리뷰 폼 기본값 설정
  const defaultValues = {
    title: '',
  };

  // 리뷰 폼 설정
  const methods = useForm({
    resolver: yupResolver(reviewSchema),
    defaultValues,
    mode: 'onChange',
  });

  // 리뷰 폼 메소드
  const {
    handleSubmit,
    control,
    formState: { errors, isDirty, isValid },
    setValue,
    trigger,
  } = methods;

  // 리뷰 내용 감시
  const watchedTitle = useWatch({ control, name: 'title', defaultValue: '' });

  // 리뷰 닫기 전 확인 메시지
  const reviewCloseMessage = () => (
    <>
      작성중인 리뷰가 있어요.
      <br />
      정말 닫으시겠어요?
    </>
  );

  // 리뷰 닫기 전 확인 모달 띄우는 함수
  const confirmReviewClose = async () => {
    if (textareaRef.current.value) {
      const confirmed = await new Promise((resolve) => {
        toggleConfirmModal(reviewCloseMessage, resolve);
      });
      if (!confirmed) return false;
    }
    onClose();
    setValue('title', '');
    return true;
  };

  // 모달 클릭 이벤트
  const handleModalClose = (e) => {
    if (e.target === modalRef.current) {
      confirmReviewClose();
    }
  };

  // 리뷰 모달 닫기
  const handleClose = () => {
    confirmReviewClose();
  };

  // 텍스트 영역에 포커스를 설정하는 함수
  const handleFocus = (element) => {
    textareaRef.current = element; // ref에 요소 저장
    if (element) element.focus(); // 요소에 포커스 설정
  };

  // 리뷰 붙여넣기 방지
  const handlePaste = (e) => {
    e.preventDefault();
  };

  // 스포일러 버튼 토글
  const toggleSpoiler = () => {
    setIsSpoiler((prev) => !prev);
  };

  // 비공개 버튼 토글
  const togglePrivate = () => {
    setIsPrivate((prev) => !prev);
  };

  // 리뷰 폼 submit
  const onSubmit = handleSubmit(async (data) => {
    // 리뷰 등록 또는 수정 중일 경우 submit 방지
    if (isCreatePending || isUpdatePending) return;

    // DOMPurify로 입력된 리뷰 내용 XSS 방지
    const sanitizedTitle = DOMPurify.sanitize(data.title);

    if (isEmpty(myReview) || !myReview.id) {
      // 내 리뷰가 없을 경우 리뷰 등록
      reviewCreate(
        {
          videoId: content.id,
          title: sanitizedTitle,
          isSpoiler,
          isPrivate,
          userId: user.id,
        },
        {
          onSuccess: (res) => {
            if (res.status === 201) {
              showSuccessToast('리뷰가 등록되었습니다.');
              onClose();
            }
          },
        }
      );
    } else {
      // 내 리뷰가 있을 경우 리뷰 수정
      // 리뷰 내용이 변경되지 않았을 경우 리뷰 수정하지 않음
      if (myReview.title === sanitizedTitle && myReview.is_spoiler === isSpoiler && myReview.is_private === isPrivate) {
        showSuccessToast('리뷰가 수정되었습니다.');
        onClose();
        return;
      }

      reviewUpdate(
        {
          videoId: content.id,
          reviewId: myReview.id,
          title: sanitizedTitle,
          isSpoiler,
          isPrivate,
          userId: user.id,
        },
        {
          onSuccess: (res) => {
            if (res.status === 204) {
              showSuccessToast('리뷰가 수정되었습니다.');
              onClose();
            }
          },
        }
      );
    }
  });

  // 내 리뷰가 있을 경우 폼에 내용 채우기
  useEffect(() => {
    if (isEmpty(myReview) || !myReview.id) return;
    setValue('title', myReview.title, { shouldDirty: true });
    setIsSpoiler(myReview.is_spoiler);
    setIsPrivate(myReview.is_private);

    trigger();
  }, [myReview, setValue, trigger]);

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
      onRequestClose={handleClose}
      bodyOpenClassName="modal__open"
      className={styles.review__modal__wrapper}
      overlayClassName={styles.review__modal__overlay}
    >
      <div className={styles.review__modal} ref={modalRef} onClick={handleModalClose}>
        <section className={styles.review__section}>
          <section className={styles.review__header}>
            <CloseButton onClose={handleClose} />
            <h2 className={styles.review__title}>{content.title}</h2>
          </section>
          <section className={styles.review__body}>
            <form method={methods} onSubmit={onSubmit} className={styles.review__form}>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    id="title"
                    className={styles.review__textarea}
                    placeholder="이 작품에 대한 리뷰를 남겨보세요."
                    spellCheck="false"
                    onPaste={handlePaste}
                    ref={handleFocus}
                  />
                )}
              />
              {errors.title && <p className={styles.review__error}>{errors.title.message}</p>}
              <div className={styles.review__more__wrapper}>
                <div className={styles.review__check__wrapper}>
                  <button
                    type="button"
                    data-tooltip-id="reviewModalSpoilerTooltip"
                    data-tooltip-content="스포일러"
                    className={styles.review__spoiler__button}
                    onClick={toggleSpoiler}
                  >
                    {isSpoiler ? <FillSpoilerIcon /> : <OutlineSpoilerIcon />}
                  </button>
                  <Tooltip
                    id="reviewModalSpoilerTooltip"
                    className={styles.review__spoiler__tooltip}
                    place="bottom"
                    effect="solid"
                    globalEventOff="click"
                  />
                  <button
                    type="button"
                    data-tooltip-id="reviewModalPrivateTooltip"
                    data-tooltip-content="비공개"
                    className={styles.review__private__button}
                    onClick={togglePrivate}
                  >
                    {isPrivate ? <FillPrivateIcon /> : <OutlinePrivateIcon />}
                  </button>
                  <Tooltip
                    id="reviewModalPrivateTooltip"
                    className={styles.review__private__tooltip}
                    place="bottom"
                    effect="solid"
                    globalEventOff="click"
                  />
                </div>
                <div className={styles.review__button__wrapper}>
                  <p className={styles.review__text__count}>
                    <span>{watchedTitle.length}</span> / 200
                  </p>
                  <button
                    type="submit"
                    className={styles.review__save__button}
                    disabled={!isDirty || !isValid || isCreatePending || isUpdatePending}
                  >
                    {isEmpty(myReview) || !myReview.id ? '등록' : '수정'}
                  </button>
                </div>
              </div>
            </form>
          </section>
        </section>
      </div>
    </Modal>
  );
});

export default ReviewModal;
