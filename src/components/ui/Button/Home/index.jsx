'use client';

import { useRouter } from 'next/navigation';

import { ENDPOINTS } from '@/config/endpoints';

const HomeButton = () => {
  const router = useRouter();

  const handleGoHome = () => {
    router.push(ENDPOINTS.HOME);
  };

  return (
    <button type="button" className="home__button" onClick={handleGoHome}>
      리뷰니버스 홈
    </button>
  );
};

export default HomeButton;
