import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import SkeletonContents from '@/components/ui/Skeleton/Contents';

const VideoDetailProvider = dynamic(
  () => import('@/contexts/VideoDetailContext').then((mod) => mod.VideoDetailProvider),
  { ssr: false }
);
const ContentsComponent = dynamic(() => import('@/components/ui/Contents'), { ssr: false });

/*
// 메타 태그 설정
// TODO: 트위터, 페이스북, 카카오, 네이버 메타태그 설정
// TODO: og태그 이미지 사이즈 고려
export const metadata = ({ params }) => {
  const title = `${content.data.title} (${fYear(content.data.release)}) - 리뷰니버스`;
  const description = isEmpty(content.data.synopsis)
    ? ''
    : content.data.synopsis;
  const imageUrl = fThumbnail(content.data.thumbnail);
  const path = EndpointManager.generateUrl(ENDPOINTS.VIDEO_DETAIL, {
    videoId: videoId,
  });
  const url = `${SETTINGS.DOMAIN_URL}${path}`;
  const keywords = isEmpty(content.data.tag)
    ? ''
    : `${SITE_KEYWORDS}, ${content.data.tag}`;

  return {
    title,
    description,
    keywords,
    openGraph: {
      url,
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 600,
          alt: title,
        },
      ],
    },
  };
};
*/

const Contents = ({ params }) => {
  const { id } = params;
  return (
    <Suspense fallback={<SkeletonContents />}>
      <VideoDetailProvider id={id}>
        <ContentsComponent />
      </VideoDetailProvider>
    </Suspense>
  );
};

export default Contents;
