import { DEFAULT_IMAGES } from '@/config/constants';

const PeopleImage = ({ image, size, alt }) => {
  const peopleImage = image || DEFAULT_IMAGES.noActor;
  const style = size ? { width: `${size}px`, height: `${size}px` } : {};

  return (
    <div className="people__image__wrapper" style={style}>
      <img className="people__image" src={peopleImage} srcSet={peopleImage} alt={alt} />
    </div>
  );
};

export default PeopleImage;
