import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

// import { IInquirySearchProps } from '@/types/inquiry';

import styles from '@/styles/pages/Inquiry.module.scss';

const InquiryForm = dynamic(() => import('@/components/ui/InquiryForm'));

// const Inquiry = ({ searchParams }: IInquirySearchProps) => {
const Inquiry = () => {
  // videoId가 있을수도 있고 없을수도 있음
  // const videoId = searchParams?.v ?? null;
  return (
    <main className={styles.inquiry__main}>
      <Suspense fallback="">
        {/* <InquiryForm videoId={videoId} /> */}
        <InquiryForm />
      </Suspense>
    </main>
  );
};

export default Inquiry;
