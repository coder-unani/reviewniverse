import React from 'react';
import SwiperGallery from '@/components/ui/SwiperGallery';
import { useVideoDetailContext } from '@/contexts/VideoDetailContext';
import { isEmpty } from 'lodash';

const VideoSectionGallery = React.memo(() => {
  const { content } = useVideoDetailContext();
  const gallery = content.data.thumbnail;

  const renderGallery = () => (
    <section className="detail-gallery-section">
      <h4 className="detail-main-title">갤러리</h4>
      <SwiperGallery />
    </section>
  );

  return isEmpty(gallery) ? null : renderGallery();
});

export default VideoSectionGallery;
