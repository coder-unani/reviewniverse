import Image from 'next/image';
import { SETTINGS } from '@/config/settings';
import { DEFAULT_IMAGES } from '@/config/constants';

const PeopleImage = ({ image, size, alt }) => {
  const peopleImage = image ? `${SETTINGS.CDN_BASE_URL}/${image}` : DEFAULT_IMAGES.noActor;
  const style = size ? { width: `${size}px`, height: `${size}px` } : {};

  return (
    <div className="people__image__wrapper" style={style}>
      <Image className="people__image" src={peopleImage} width={100} height={100} alt={alt} />
    </div>
  );
};

export default PeopleImage;
