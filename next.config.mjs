import withPlaiceholder from '@plaiceholder/next';
/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  // 외부 이미지 도메인 추가
  images: {
    // domains: ['storage.reviewniverse.net'], // 도메인 전체 허용
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.reviewniverse.net',
        port: '', // 포트 번호가 있을 경우 추가
        pathname: '/**', // 모든 하위 경로 허용
      },
    ],
  },

  // Webpack 설정 추가
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/, // .svg 파일을 처리하기 위한 규칙 추가
      use: ['@svgr/webpack'], // @svgr/webpack 로더 사용
    });
    return config;
  },

  // 프로덕션 환경에서 소스 맵 비활성화
  productionBrowserSourceMaps: false,
};

export default withPlaiceholder(nextConfig);
