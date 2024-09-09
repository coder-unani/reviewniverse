import Link from 'next/link';
import ProfileImage from '@/components/ui/Button/Profile/Image';
import { DEFAULT_IMAGES } from '@/config/constants';
import { EndpointManager, ENDPOINTS } from '@/config/endpoints';
import { isEmpty } from 'lodash';
import styles from '@/styles/components/ProfileButton.module.scss';

const ProfileButton = ({ user, size, onClose }) => {
  const profilePath = isEmpty(user)
    ? ''
    : EndpointManager.generateUrl(ENDPOINTS.USER, { userId: user.id });
  const profileImage = isEmpty(user)
    ? DEFAULT_IMAGES.noActor
    : user.profile_image;
  const profileNickname = isEmpty(user) ? '탈퇴한 회원 입니다.' : user.nickname;

  const handleMobileMenuClose = () => {
    onClose?.();
  };

  return (
    <Link
      href={profilePath}
      className={styles.profile}
      data-active={!isEmpty(user)}
      onClick={handleMobileMenuClose}
    >
      <ProfileImage image={profileImage} size={size} />
      <span className={styles.profile__nickname}>{profileNickname}</span>
    </Link>
  );
};

export default ProfileButton;
