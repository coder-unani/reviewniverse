'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { showSuccessToast, showErrorToast } from '@/components/ui/Toast';

import { DEFAULT_IMAGES } from '@/config/constants';

import styles from '@/styles/components/ShareModal.module.scss';

const FacebookShareButton = ({ title, desc, link = null, image = null }) => {
  useEffect(() => {
    // Facebook SDK 스크립트 동적 로드
    const script = document.createElement('script');
    script.src = 'https://connect.facebook.net/en_US/sdk.js';
    script.async = true;
    script.defer = true;
    script.crossOrigin = 'anonymous';
    script.onload = () => {
      console.log('Facebook SDK loaded');
      console.log(FB);
      window.fbAsyncInit = function () {
        console.log('Facebook SDK initializing');
        window.FB.init({
          appId: '804111484996493',
          xfbml: true,
          version: 'v13.0',
        });
      };
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // 공유 버튼 클릭
  const handleClick = (e) => {
    e.preventDefault();
    if (window.FB) {
      window.FB.ui(
        {
          method: 'share',
          href: window.location.href,
        },
        function (response) {
          if (response && !response.error_message) {
            showSuccessToast('공유 완료되었습니다.');
          } else {
            console.log(response);
            showErrorToast('공유 중 오류가 발생했습니다.');
          }
        }
      );
    } else {
      showErrorToast('공유 중 오류가 발생했습니다.');
    }
  };

  return (
    <Link id="btn-facebook-share" className={styles.share__button} href="#" onClick={handleClick}>
      <picture className={styles.share__button__image__wrapper}>
        <Image
          className={styles.share__button__image}
          src={DEFAULT_IMAGES.shareFacebook}
          alt="페이스북 공유하기 버튼"
          width={60}
          height={60}
          loading="lazy"
        />
      </picture>
      <p className={styles.share__button__name}>Facebook</p>
    </Link>
  );
};

export default FacebookShareButton;
