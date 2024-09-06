import CloseIcon from '@/resources/icons/close.svg';

const CloseButton = ({ onClose }) => {
  const handleClose = () => {
    onClose?.();
  };

  return (
    <button className="modal__close__button" onClick={handleClose}>
      <CloseIcon width={24} height={24} />
    </button>
  );
};

export default CloseButton;
