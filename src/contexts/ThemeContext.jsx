'use client';

import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';

const ThemeContext = createContext();

const ThemeContextProvider = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const vh = useRef(0);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);

    vh.current = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh.current}px`);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768 && !isMobile) {
        setIsMobile(true);
      } else if (window.innerWidth >= 768 && isMobile) {
        setIsMobile(false);
      }

      // vh 값을 다시 계산하고 업데이트
      vh.current = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh.current}px`);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile]);

  // useMemo로 value 객체 메모이제이션
  const value = useMemo(() => ({ isMobile, setIsMobile }), [isMobile]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within an ThemeContextProvider');
  }
  return context;
};

export { ThemeContextProvider, useThemeContext };
