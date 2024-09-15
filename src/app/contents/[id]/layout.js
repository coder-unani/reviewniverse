'use client';

import React from 'react';
import { ContentsProvider } from '@/contexts/ContentsContext';

const ContentsLayout = ({ children, params }) => {
  const { id } = params;
  return <ContentsProvider id={id}>{children}</ContentsProvider>;
};

export default ContentsLayout;
