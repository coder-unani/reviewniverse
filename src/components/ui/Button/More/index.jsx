import React from 'react';
import Link from 'next/link';

import ArrowRightIcon from '@/resources/icons/arrow-right.svg';
import vhStyles from '@/styles/components/VideosSwiper.module.scss';

const MoreButton = ({ link, title, subtitle }) => {
  return (
    <Link href={link} className={vhStyles.horizontal__more__wrapper} aria-label={subtitle}>
      <span className={vhStyles.horizontal__more}>{title}</span>
      <ArrowRightIcon width={24} height={24} />
    </Link>
  );
};

export default MoreButton;
