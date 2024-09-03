import { Inter } from 'next/font/google';
// import localFont from 'next/font/local';
// import { SETTINGS } from '@/config/settings';
import '@/styles/globals.scss';

const inter = Inter({ subsets: ['latin'] });
// const font = localFont({
//   src: '/fonts/SUIT-Variable.woff2',
// });

// metatags 설정
export const metadata = {
  title: '리뷰니버스',
  description:
    '리뷰니버스와 함께라면 보는 즐거움이 2배로, 생생한 리뷰를 확인해보세요!',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
