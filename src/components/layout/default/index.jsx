'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { ThemeContextProvider } from '@/contexts/ThemeContext';
import { AuthContextProvider } from '@/contexts/AuthContext';
import { ModalContextProvider } from '@/contexts/ModalContext';
import { ToastWrapper } from '@/components/ui/Toast';
import Footer from '@/components/layout/default/footer';

const Header = dynamic(() => import('@/components/layout/default/header'), { ssr: false });

const queryClient = new QueryClient();

const DefaultLayout = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeContextProvider>
        <AuthContextProvider>
          <ModalContextProvider>
            <div id="wrapper" className="wrapper">
              <Suspense fallback={''}>
                <Header />
              </Suspense>
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
