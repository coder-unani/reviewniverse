'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const ModalContainer = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // 컴포넌트가 클라이언트에서 마운트되면 `mounted`를 true로 설정
    setMounted(true);

    return () => setMounted(false); // 컴포넌트 언마운트 시 정리
  }, []);

  if (!mounted) return null;

  return createPortal(children, document.getElementById('modal'));
};

export default ModalContainer;
