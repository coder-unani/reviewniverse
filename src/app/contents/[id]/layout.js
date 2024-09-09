'use client';

import { VideoDetailProvider } from '@/contexts/VideoDetailContext';

export default function ContentLayout({ children, params }) {
  const { id } = params;
  return <VideoDetailProvider id={id}>{children}</VideoDetailProvider>;
}
