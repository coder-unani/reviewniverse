'use client';

import React from 'react';

import { ISuggestProps } from '@/types/support';
import { useSuggest } from '@/hooks/useSuggest';
import { showSuccessToast } from '@/components/ui/Toast';

import styles from '@/styles/components/SuggestButton.module.scss';

const SuggestButton = ({ query, total }: ISuggestProps) => {
  const { mutate: suggest, isPending: isSuggestPending } = useSuggest();

  const handleSuggestClick = () => {
    // API 호출 중일 경우 리턴
    if (isSuggestPending) return;
    const decodeQuery = decodeURIComponent(query);
    suggest(
      { query: decodeQuery, total },
      {
        onSuccess: (res) => {
          if (res && res.status === 201) {
            showSuccessToast(`[${decodeQuery}] 작품이 요청되었습니다.`);
          }
        },
      }
    );
  };

  return (
    <button type="button" className={styles.suggest__button} onClick={handleSuggestClick}>
      작품 정보 요청
    </button>
  );
};

export default SuggestButton;
