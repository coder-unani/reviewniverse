'use client';

import React, { useEffect } from 'react';

const UsersLayout = ({ children }) => {
  useEffect(() => {
    // 외부 스크립트 삽입
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2.js';
    script.async = true;

    // 스크립트를 head에 추가
    document.head.appendChild(script);

    // 컴포넌트가 언마운트될 때 스크립트 제거
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return children;
};

export default UsersLayout;
