import React from 'react';
import Image from 'next/image';

const PeopleImage = ({ image, size, alt, priority = false }) => {
  const style = size ? { width: `${size}px`, height: `${size}px` } : {};

  return (
    <div className="people__image__wrapper" style={style}>
      <Image className="people__image" src={image} width={100} height={100} alt={alt} priority={priority} />
    </div>
  );
};

export default PeopleImage;
