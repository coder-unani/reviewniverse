'use client';

import React from 'react';

import { cLog } from '@/utils/test';
import { useAuthContext } from '@/contexts/AuthContext';

/**
 * TODO: 작품 정보 요청 버튼
 * - request 모달 폼 추가
 * - 찾는 작품의 제목 입력
 * - 작품의 어떤 정보가 궁금한지 입력
 * - 로그인 여부 및 로그인 유저 아이디 전달
 * - 검색 작품 total 전달
 */

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
