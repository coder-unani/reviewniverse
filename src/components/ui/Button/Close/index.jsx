import React from 'react';

import CloseIcon from '@/resources/icons/close.svg';

const CloseButton = ({ onClose }) => {
  const handleClose = () => {
    onClose?.();
  };

  return (
    <button type="button" className="modal__close__button" onClick={handleClose}>
      <CloseIcon width={32} height={32} />
    </button>
  );
};

export default CloseButton;
