import ClearIcon from '@/resources/icons/clear.svg';

const ClearButton = ({ onClear }) => {
  const handleClear = () => {
    onClear?.();
  };

  return (
    <button type="reset" className="clear__button" onClick={handleClear}>
      <ClearIcon />
    </button>
  );
};

export default ClearButton;
