import React, { useMemo } from 'react';
import Image from 'next/image';
import { useVideoDetailContext } from '@/contexts/VideoDetailContext';
import { fThumbnail } from '@/utils/formatContent';

const VideoSectionPoster = React.memo(() => {
  const { content } = useVideoDetailContext();
  const poster = useMemo(
    () => fThumbnail(content.data.thumbnail, false),
    [content.data.thumbnail]
  );

  return (
    <section className="detail-poster-section">
      <picture className="detail-poster-wrapper">
        <Image
          className="detail-poster"
          src={poster}
          alt="포스터"
          fill
          priority
        />
      </picture>
    </section>
  );
});

export default VideoSectionPoster;
