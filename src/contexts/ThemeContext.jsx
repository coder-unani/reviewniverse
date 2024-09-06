'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

const ThemeContextProvider = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  let vh = 0;

  useEffect(() => {
    window.innerWidth < 768 ? setIsMobile(true) : setIsMobile(false);

    vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768 && !isMobile) {
        setIsMobile(true);
      } else if (window.innerWidth >= 768 && isMobile) {
        setIsMobile(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile]);

  return (
    <ThemeContext.Provider value={{ isMobile, setIsMobile }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error(
      'useThemeContext must be used within an ThemeContextProvider'
    );
  }
  return context;
};

export { ThemeContextProvider, useThemeContext };
