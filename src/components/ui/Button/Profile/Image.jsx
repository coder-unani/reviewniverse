import Image from 'next/image';
import { DEFAULT_IMAGES } from '@/config/constants';
import styles from '@/styles/components/ProfileImage.module.scss';

const ProfileImage = ({ image, size }) => {
  const profileImage = image || DEFAULT_IMAGES.noActor;
  const style = size ? { width: `${size}px`, height: `${size}px` } : {};

  return (
    <div className={styles.profile__image__wrapper} style={style}>
      <Image
        className={styles.profile__image}
        src={profileImage}
        alt="프로필 이미지"
        sizes="(max-width: 768px) 100%, (max-width: 1200px) 100%"
        fill
        placeholder="blur"
        blurDataURL={profileImage}
      />
    </div>
  );
};

export default ProfileImage;
