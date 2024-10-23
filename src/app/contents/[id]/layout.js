'use client';

import React, { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';

import { ContentsProvider } from '@/contexts/ContentsContext';

const ContentsLayout = ({ children, params }) => {
  const { id } = params;
  const searchParams = useSearchParams();
  // useMemo로 필요할 때만 계산되도록 최적화
  const referrer = useMemo(() => searchParams?.get('ref') || null, [searchParams]);
  const referrerKey = useMemo(() => searchParams?.get('ref_key') || null, [searchParams]);

  return (
    <ContentsProvider id={id} referrer={referrer} referrerKey={referrerKey}>
      {children}
    </ContentsProvider>
  );
};

export default ContentsLayout;
