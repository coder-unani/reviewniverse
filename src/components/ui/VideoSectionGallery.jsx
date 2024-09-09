import React from 'react';
import GalleryVertical from '@/components/ui/GalleryVertical';
import { isEmpty } from 'lodash';
import styles from '@/styles/pages/Contents.module.scss';

const VideoSectionGallery = React.memo(({ content }) => {
  const gallery = content.data.thumbnail || [];
  if (isEmpty(gallery)) {
    return null;
  }

  return (
    <section className={styles.detail__gallery__section}>
      <h4 className={styles.detail__main__title}>갤러리</h4>
      <GalleryVertical content={content} />
    </section>
  );
});

export default VideoSectionGallery;
