import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

import styles from '@/styles/pages/Inquiry.module.scss';

const InquiryForm = dynamic(() => import('@/components/ui/InquiryForm'));

const Inquiry = () => {
  return (
    <main className={styles.inquiry__main}>
      <Suspense fallback="">
        <InquiryForm />
      </Suspense>
    </main>
  );
};

export default Inquiry;
