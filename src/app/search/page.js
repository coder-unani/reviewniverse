'use client';

import { useRouter } from 'next/navigation';

export default function page() {
  const router = useRouter();
  const { query } = router;

  return <div>search: {query}</div>;
}
