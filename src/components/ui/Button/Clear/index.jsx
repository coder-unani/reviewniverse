import React from 'react';

import ClearIcon from '@/resources/icons/clear.svg';

const ClearButton = ({ onClear }) => {
  const handleClear = () => {
    onClear?.();
  };

  return (
    <button type="button" className="clear__button" onClick={handleClear}>
      <ClearIcon />
    </button>
  );
};

export default ClearButton;
