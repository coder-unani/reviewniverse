import React from 'react';

import LogoIcon from '@/resources/icons/logo-white.svg';
import styles from '@/styles/components/Header.module.scss';

const Logo = () => {
  return (
    <h1 className={styles.header__logo}>
      <LogoIcon width={145} height={40} />
    </h1>
  );
};

export default Logo;
