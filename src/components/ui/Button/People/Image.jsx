import Image from 'next/image';

const PeopleImage = ({ image, size, alt }) => {
  const style = size ? { width: `${size}px`, height: `${size}px` } : {};

  return (
    <div className="people__image__wrapper" style={style}>
      <Image className="people__image" src={image} width={100} height={100} alt={alt} />
    </div>
  );
};

export default PeopleImage;
