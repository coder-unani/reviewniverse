import React, { useCallback, useEffect, useRef, useState } from 'react';
import Modal from 'react-modal';
import { isEmpty } from 'lodash';

import { IReportModalProps } from '@/types/modal';
import { ReqInquiry } from '@/types/request';
import { useInquiry } from '@/hooks/useInquiry';
import { useModalContext } from '@/contexts/ModalContext';
import CloseButton from '@/components/ui/Button/Close';

import styles from '@/styles/components/ReportModal.module.scss';

const ReportModal = React.memo(({ id, title, isOpen, onClose }: IReportModalProps) => {
  const { openInfoModal } = useModalContext();
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const { mutate: inquiry, isPending: isInquiryPending } = useInquiry();
  const reportTitle: string = `[${id}] ${title}`;
  const reportOptions: Record<string, string> = {
    typo: '오타 및 맞춤법 오류',
    info: '정보 오류',
    add: '정보 추가 요청',
    image: '이미지 오류',
    link: '링크 오류',
    content: '부적절한 콘텐츠',
    duplicate: '중복 콘텐츠',
    other: '기타',
  };

  // 모달창 클릭 이벤트
  const handleModalClose = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (modalRef.current && e.target === modalRef.current) onClose();
    },
    [onClose]
  );

  // 체크박스 변경
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    if (checked) {
      // 체크되었으면 배열에 추가
      setSelectedValues((prev) => [...prev, value]);
    } else {
      // 체크 해제되었으면 배열에서 제거
      setSelectedValues((prev) => prev.filter((v) => v !== value));
    }
  };

  // 폼 제출
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 선택된 값이 없을 경우 리턴
    if (isEmpty(selectedValues)) return;
    // API 호출 중일 경우 리턴
    if (isInquiryPending) return;

    const content = `${reportTitle} - ${selectedValues.join(', ')}`;

    const inquiryData: ReqInquiry = {
      topic: '16',
      title: reportTitle,
      content,
      email: '',
      is_agree_provide_email: false,
    };

    inquiry(inquiryData, {
      onSuccess: (res) => {
        if (res && res.status === 201) {
          const message = () => (
            <>
              제보해 주셔서 감사합니다!
              <br />
              <span>
                고객님의 소중한 의견이 정상적으로 접수되었습니다.
                <br />
                제보해 주신 내용을 바탕으로 더 나은 정보를 제공할 수 있도록 최선을 다하겠습니다.
              </span>
            </>
          );
          openInfoModal(message);
        }
      },
    });
  };

  // Modal.setAppElement 설정
  useEffect(() => {
    const wrapperElement = document.getElementById('wrapper');
    if (wrapperElement) {
      Modal.setAppElement(wrapperElement);
    }
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      bodyOpenClassName="modal__open"
      className={styles.report__modal__wrapper}
      overlayClassName={styles.report__modal__overlay}
    >
      <div className={styles.report__modal} ref={modalRef} onClick={handleModalClose}>
        <section className={styles.report__section}>
          <section className={styles.report__header}>
            <CloseButton onClose={onClose} />
            <h4 className={styles.report__title}>제보하기</h4>
          </section>
          <section className={styles.report__body}>
            <form className={styles.report__form} onSubmit={handleSubmit}>
              <p className={styles.report__subtitle}>
                제보사유 <span>여러 개 선택 가능해요.</span>
              </p>
              <div className={styles.report__input__wrapper}>
                {Object.entries(reportOptions).map(([key, value]) => (
                  <label htmlFor={key} className={styles.report__label} key={key}>
                    <input
                      type="checkbox"
                      id={key}
                      className={styles.report__input}
                      name={key}
                      value={value}
                      onChange={handleCheckboxChange}
                    />
                    {value}
                  </label>
                ))}
              </div>
              <div className={styles.report__button__wrppaer}>
                <button type="submit" className={styles.report__submit__button} disabled={isEmpty(selectedValues)}>
                  보내기
                </button>
              </div>
            </form>
          </section>
          <section className={styles.report__footer} />
        </section>
      </div>
    </Modal>
  );
});

export default ReportModal;
