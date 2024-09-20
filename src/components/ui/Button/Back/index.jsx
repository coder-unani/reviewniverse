import { useRouter } from 'next/navigation';

import ArrowLeftIcon from '@/resources/icons/arrow-left.svg';

const BackButton = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <button type="button" className="back__button" onClick={handleBack}>
      <ArrowLeftIcon width={40} height={40} />
    </button>
  );
};

export default BackButton;
