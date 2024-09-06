'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Modal from '@/components/ui/Modal';
import styles from '@/styles/components/PhotoModal.module.scss';

const PhotoModal = React.memo(({ url, onClose }) => {
  const modalRef = useRef();

  const handleModalClose = (e) => {
    if (e.target === modalRef.current) onClose();
  };

  return (
    <Modal>
      <div
        className={styles.photo__modal}
        ref={modalRef}
        onClick={handleModalClose}
      >
        <Image
          className={styles.photo__image}
          src={url}
          alt="스틸컷"
          fill
          placeholder="blur"
        />
      </div>
    </Modal>
  );
});

export default PhotoModal;
