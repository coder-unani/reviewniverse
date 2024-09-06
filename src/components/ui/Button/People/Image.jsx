import Image from 'next/image';
import { DEFAULT_IMAGES } from '@/config/constants';
import styles from '@/styles/components/PeopleImage.module.scss';

const PeopleImage = ({ image, size }) => {
  const peopleImage = image || DEFAULT_IMAGES.noActor;
  const style = size ? { width: `${size}px`, height: `${size}px` } : {};

  return (
    <div className={styles.people__image__wrapper} style={style}>
      <Image
        className={styles.people__image}
        src={peopleImage}
        alt="프로필 이미지"
        sizes="(max-width: 768px) 100%, (max-width: 1200px) 100%"
        fill
        priority
      />
    </div>
  );
};

export default PeopleImage;
