import DefaultLayout from '@/components/layout/default';
import '@/styles/globals.scss';

// 메타태그 설정
export const metadata = {
  title: '리뷰니버스',
  description:
    '리뷰니버스와 함께라면 보는 즐거움이 2배로, 생생한 리뷰를 확인해보세요!',
};

export default function RootLayout({ children }) {
  return <DefaultLayout>{children}</DefaultLayout>;
}
