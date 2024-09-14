import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

const ContentsProvider = dynamic(() => import('@/contexts/ContentsContext').then((mod) => mod.ContentsProvider), {
  ssr: false,
});

const ContentsLayout = ({ children, params }) => {
  const { id } = params;
  return (
    <Suspense fallback={''}>
      <ContentsProvider id={id}>{children}</ContentsProvider>
    </Suspense>
  );
};

export default ContentsLayout;
