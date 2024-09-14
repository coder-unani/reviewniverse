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
  webpack(config, { isServer, buildId }) {
    // 자산 파일에 해시 추가하여 캐시 무효화
    if (!isServer) {
      config.output.filename = `static/js/[name].[contenthash].js`;
      config.output.chunkFilename = `static/js/[name].[contenthash].js`;
    }

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

  // Cache-Control 헤더를 통해 캐시 무효화
  async headers() {
    return [
      {
        source: '/(.*)', // 모든 경로에 적용
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
          },
        ],
      },
    ];
  },
};

export default withPlaiceholder(nextConfig);
