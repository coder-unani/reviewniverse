'use client';

import React, { useState } from 'react';

import { IReportProps } from '@/types/support';
import ReportModal from '@/components/ui/Modal/Report';

import InfoIcon from '@/resources/icons/outline-info.svg';
import styles from '@/styles/components/ReportButton.module.scss';

const ReportButton = ({ id, title }: IReportProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleReportModal = () => {
    setIsOpen((prev) => !prev);
  };

  const handleReportClick = () => {
    // TODO: 제보하기 모달 폼 띄우기
    toggleReportModal();
  };

  return (
    <>
      <button type="button" className={styles.inquiry__button} onClick={handleReportClick}>
        <InfoIcon width={20} height={20} />
        제보하기
      </button>

      <ReportModal id={id} title={title} isOpen={isOpen} onClose={toggleReportModal} />
    </>
  );
};

export default ReportButton;
