'use client';

import React, { useRef } from 'react';
import Modal from '@/components/ui/Modal';
import styles from '@/styles/components/PhotoModal.module.scss';

// TODO: Image 컴포넌트로 변경

const PhotoModal = React.memo(({ url, alt, onClose }) => {
  const modalRef = useRef();

  const handleModalClose = (e) => {
    if (e.target === modalRef.current) onClose();
  };

  return (
    <Modal>
      <div className={styles.photo__modal} ref={modalRef} onClick={handleModalClose}>
        <img className={styles.photo__image} src={url} alt={alt} loading="lazy" />
      </div>
    </Modal>
  );
});

export default PhotoModal;
