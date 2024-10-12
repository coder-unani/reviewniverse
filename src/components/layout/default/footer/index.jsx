'use client';

import React from 'react';
import Link from 'next/link';

import { SETTINGS } from '@/config/settings';
import { ENDPOINTS } from '@/config/endpoints';
import { useModalContext } from '@/contexts/ModalContext';

import styles from '@/styles/components/Footer.module.scss';

const Footer = () => {
  const year = new Date().getFullYear();
  const { toggleTermsModal, togglePrivacyModal } = useModalContext();

  return (
    <footer className={styles.footer}>
      <section className={styles.footer__wrapper}>
        <div>
          <ul className={styles.footer__service__list}>
            <li onClick={toggleTermsModal}>서비스 이용약관</li>
            <li onClick={togglePrivacyModal}>개인정보 처리방침</li>
          </ul>
        </div>
        <div>
          <ul className={styles.footer__contact__list}>
            <li>고객센터</li>
            <li>help@orbitcode.kr</li>
          </ul>
          <ul className={styles.footer__contact__list}>
            <li>제휴 및 협력 문의</li>
            <li>
              <Link href={ENDPOINTS.INQUIRY}>{`${SETTINGS.SITE_BASE_URL}${ENDPOINTS.INQUIRY}`}</Link>
            </li>
          </ul>
        </div>
        <div>
          <ul className={styles.footer__copyright__list}>
            <li className={styles.footer__copyright__item}>© {year}. Orbitcode Co. All rights reserved.</li>
          </ul>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
