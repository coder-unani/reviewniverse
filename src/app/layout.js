import DefaultLayout from '@/components/layout/default';
import { SETTINGS } from '@/config/settings';
import { DEFAULT_IMAGES, SITE_KEYWORDS } from '@/config/constants';
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/effect-fade';
import 'swiper/css/thumbs';
import 'swiper/css/virtual';
import 'react-loading-skeleton/dist/skeleton.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-lazy-load-image-component/src/effects/blur.css';
import '@/styles/globals.scss';

// TODO: Suspense 사용

// 메타태그 설정
// TODO: 트위터, 페이스북, 카카오, 네이버 메타태그 설정
export const metadata = {
  metadataBase: new URL(SETTINGS.SITE_BASE_URL), // 기본 URL 설정
  title: '리뷰니버스',
  description: '리뷰니버스와 함께라면 보는 즐거움이 2배로, 생생한 리뷰를 확인해보세요!',
  keywords: SITE_KEYWORDS,
  openGraph: {
    type: 'website',
    url: SETTINGS.SITE_BASE_URL,
    title: '리뷰니버스',
    description: '리뷰니버스와 함께라면 보는 즐거움이 2배로, 생생한 리뷰를 확인해보세요!',
    siteName: '리뷰니버스',
    images: [
      {
        url: DEFAULT_IMAGES.logo,
        width: 800,
        height: 220,
        alt: '리뷰니버스 로고',
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <DefaultLayout>{children}</DefaultLayout>
        <div id="modal" />
      </body>
    </html>
  );
}
