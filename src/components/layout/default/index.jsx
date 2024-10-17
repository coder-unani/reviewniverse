'use client';

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { ThemeContextProvider } from '@/contexts/ThemeContext';
import { AuthContextProvider } from '@/contexts/AuthContext';
import { ModalContextProvider } from '@/contexts/ModalContext';
import { ToastWrapper } from '@/components/ui/Toast';
import Header from '@/components/layout/default/header';
import Footer from '@/components/layout/default/footer';

const queryClient = new QueryClient();

const DefaultLayout = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeContextProvider>
        <AuthContextProvider>
          <ModalContextProvider>
            <div id="wrapper" className="wrapper">
              <Header />
              {children}
              <Footer />
            </div>
            <ToastWrapper />
            <ReactQueryDevtools />
          </ModalContextProvider>
        </AuthContextProvider>
      </ThemeContextProvider>
    </QueryClientProvider>
  );
};

export default DefaultLayout;
