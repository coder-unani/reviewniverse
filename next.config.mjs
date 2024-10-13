/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  // 외부 이미지 도메인 추가
  images: {
    unoptimized: true, // 최적화하지 않음
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

  // ETag 사용 설정
  generateEtags: true, // ETag 헤더를 활성화

  // X-powered-by 헤더 비활성화
  poweredByHeader: false,

  // Cache-Control 헤더 설정 추가
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, max-age=0, must-revalidate', // 캐시를 사용하지 않도록 설정
          },
        ],
      },
    ];
  },
};

export default nextConfig;
