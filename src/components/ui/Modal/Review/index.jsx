'use client';

import React, { useEffect, useRef, useState } from 'react';
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
import Modal from '@/components/ui/Modal';
import CloseButton from '@/components/ui/Button/Close';

import SpoilerActivateIcon from '@/resources/icons/spoiler-activate.svg';
import SpoilerDeactivateIcon from '@/resources/icons/spoiler-deactivate.svg';
import PrivateActivateIcon from '@/resources/icons/private-activate.svg';
import PrivateDeactivateIcon from '@/resources/icons/private-deactivate.svg';
import styles from '@/styles/components/ReviewModal.module.scss';

/**
 * TODO:
 * - 아이콘 넓이, 높이 명시적으로 지정
 */

const ReviewModal = React.memo(({ content, myReview }) => {
  const modalRef = useRef();
  const { user } = useAuthContext();
  const { toggleReviewModal } = useModalContext();
  const { mutate: reviewCreate, isPending: isCreatePending } = useReviewCreate();
  const { mutate: reviewUpdate, isPending: isUpdatePending } = useReviewUpdate();
  const [isSpoiler, setIsSpoiler] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);

  // 모달 바깥 클릭 시 모달 닫기
  const handleModalClose = (e) => {
    if (e.target === modalRef.current) toggleReviewModal();
  };

  // 리뷰 붙여넣기 방지
  const handlePaste = (e) => {
    e.preventDefault();
  };

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
    register,
    handleSubmit,
    control,
    formState: { isDirty, isValid },
    setValue,
    trigger,
  } = methods;

  // 리뷰 내용 감시
  const watchedTitle = useWatch({ control, name: 'title', defaultValue: '' });

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
    if (isCreatePending || isUpdatePending) {
      return;
    }

    // DOMPurify로 입력된 리뷰 내용을 정화 (XSS 방지)
    const sanitizedTitle = DOMPurify.sanitize(data.title);

    if (isEmpty(myReview)) {
      // 내 리뷰가 없을 경우 리뷰 등록
      await reviewCreate(
        {
          videoId: content.id,
          title: sanitizedTitle,
          is_spoiler: isSpoiler,
          is_private: isPrivate,
          userId: user.id,
        },
        {
          onSuccess: (res) => {
            if (res.status === 201) {
              showSuccessToast('리뷰가 등록되었습니다.');
              toggleReviewModal();
            }
          },
        }
      );
    } else {
      // 내 리뷰가 있을 경우 리뷰 수정
      if (myReview.title === sanitizedTitle && myReview.is_spoiler === isSpoiler && myReview.is_private === isPrivate) {
        showSuccessToast('리뷰가 수정되었습니다.');
        toggleReviewModal();
        return;
      }
      await reviewUpdate(
        {
          videoId: content.id,
          reviewId: myReview.id,
          title: sanitizedTitle,
          is_spoiler: isSpoiler,
          is_private: isPrivate,
          userId: user.id,
        },
        {
          onSuccess: (res) => {
            if (res.status === 204) {
              showSuccessToast('리뷰가 수정되었습니다.');
              toggleReviewModal();
            }
          },
        }
      );
    }
  });

  // 내 리뷰가 있을 경우 폼에 내용 채우기
  useEffect(() => {
    if (isEmpty(myReview)) return;

    setValue('title', myReview.title, { shouldDirty: true });
    setIsSpoiler(myReview.is_spoiler);
    setIsPrivate(myReview.is_private);

    trigger();
  }, [myReview, setValue, trigger]);

  return (
    <Modal>
      <div className={styles.review__modal__wrapper} ref={modalRef} onClick={handleModalClose}>
        <main className={styles.review__modal}>
          <section className={styles.review__section}>
            <h2 className={styles.review__title}>{content.title}</h2>
            <CloseButton onClose={toggleReviewModal} />
            <form method={methods} onSubmit={onSubmit} className={styles.review__form}>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    autoFocus // 리뷰 모달 열릴 때 textarea에 포커스
                    id="title"
                    className={styles.review__textarea}
                    placeholder="이 작품에 대한 리뷰를 남겨보세요."
                    spellCheck="false"
                    onPaste={handlePaste}
                  />
                )}
              />
              <div className={styles.review__more__wrapper}>
                <div className={styles.review__check__wrapper}>
                  <button
                    type="button"
                    data-tooltip-id="reviewModalSpoilerTooltip"
                    data-tooltip-content="스포일러"
                    className={styles.review__spoiler__button}
                    onClick={toggleSpoiler}
                  >
                    {isSpoiler ? <SpoilerActivateIcon /> : <SpoilerDeactivateIcon />}
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
                    {isPrivate ? <PrivateActivateIcon /> : <PrivateDeactivateIcon />}
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
                    <span>{watchedTitle.length}</span> / 100
                  </p>
                  <button
                    type="submit"
                    className={styles.review__save__button}
                    disabled={!isDirty || !isValid || isCreatePending || isUpdatePending}
                  >
                    {isEmpty(myReview) ? '등록' : '수정'}
                  </button>
                </div>
              </div>
            </form>
          </section>
        </main>
      </div>
    </Modal>
  );
});

export default ReviewModal;
