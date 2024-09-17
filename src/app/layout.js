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
import Script from 'next/script';
import { GoogleAnalytics } from '@next/third-parties/google';

// viewport 설정
export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
  maximumScale: 1,
  userScalable: 'no',
};

// 메타태그 설정
// TODO: 트위터, 페이스북, 카카오, 네이버 메타태그 설정
export const metadata = {
  metadataBase: new URL(SETTINGS.SITE_BASE_URL), // 기본 URL 설정
  alternates: {
    canonical: '/',
  },
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
  icons: {
    icon: '/favicon.ico',
  },
};

const NaverAnalytics = () => {
  return (
    <>
      <Script src="//wcs.naver.net/wcslog.js" strategy="afterInteractive" />
      <Script id="naver-logger" strategy="afterInteractive">
        {`
            if(!wcs_add) var wcs_add = {};
            wcs_add["wa"] = "2d238f1fd3cdc";
            if(window.wcs) {
              wcs_do();
            }
          `}
      </Script>
    </>
  );
};

const RootLayout = ({ children }) => {
  return (
    <html lang="ko">
      <head>
        <link rel="search" href="/opensearch.xml" title="리뷰니버스" type="application/opensearchdescription+xml" />
      </head>
      <GoogleAnalytics gaId="G-14KE5C52P1" />
      <NaverAnalytics />
      <body>
        <DefaultLayout>{children}</DefaultLayout>
        <div id="modal" />
      </body>
    </html>
  );
};

export default RootLayout;
