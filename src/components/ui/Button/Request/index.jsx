'use client';

import React from 'react';

import { cLog } from '@/utils/test';
import { useAuthContext } from '@/contexts/AuthContext';

const RequestButton = ({ query, total }) => {
  const { user } = useAuthContext();

  const handleRequestClick = () => {
    cLog('검색 쿼리:', query);
    cLog('검색 결과:', total);

    if (user) {
      cLog('유저 아이디:', user.id);
    }
  };

  return (
    <button type="button" className="home__button" onClick={handleRequestClick}>
      작품 정보 요청
    </button>
  );
};

export default RequestButton;
