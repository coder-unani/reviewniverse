import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const ScrollToTop = () => {
  const pathname = usePathname();

  // 페이지 이동 시 맨 위로 스크롤
  /*
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
 */

  useEffect(() => {
    // 스크롤 위치를 저장할 수 있도록 브라우저의 기본 스크롤 복원 동작을 비활성화합니다.
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // 페이지 이동 시 맨 위로 스크롤
    window.scrollTo(0, 0);

    // 클린업 함수로 scrollRestoration 기본 동작 복원
    return () => {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'auto';
      }
    };
  }, [pathname]);

  return null;
};

export default ScrollToTop;
