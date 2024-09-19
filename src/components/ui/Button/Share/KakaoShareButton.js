'use client';

import { useEffect } from 'react';
import { fMakeImageUrl } from '@/utils/formatContent';

const KakaoShareButton = ({ title, desc, link, image = null }) => {
  const kakaoAppKey = '6d737e11368f0332f12198070cbd0ef4';
  //   const kakaoAppKey = '9a3a161ac1ce4723485924eba0ef8342';

  // 디바이스 구분 함수
  const isMobile = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    return /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
  };

  useEffect(() => {
    // Kakao SDK 스크립트 동적 로드
    const script = document.createElement('script');
    script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js';
    script.integrity = 'sha384-TiCUE00h649CAMonG018J2ujOgDKW/kVWlChEuu4jK2vxfAAD0eZxzCKakxg55G4';
    script.crossOrigin = 'anonymous';
    script.onload = () => {
      if (!window.Kakao.isInitialized()) {
        // Kakao SDK 초기화
        window.Kakao.init(kakaoAppKey);
      }
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleClick = (e) => {
    e.preventDefault();

    const shareTitle = title || '리뷰니버스';
    const shareDesc = desc || '리뷰니버스와 함께라면 보는 즐거움이 2배로, 생생한 리뷰를 확인해보세요!';
    const shareImageUrl = fMakeImageUrl(image);
    const shareLinkUrl = link ? String(link) : window.location.href;

    const mobileLink = shareLinkUrl; // 모바일 웹 URL
    const pcLink = shareLinkUrl; // PC 웹 URL

    if (window.Kakao && window.Kakao.Share) {
      window.Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: shareTitle,
          description: shareDesc,
          imageUrl: shareImageUrl,
          link: {
            mobileWebUrl: mobileLink, // 모바일 카톡에서 사용할 URL
            webUrl: pcLink, // PC 카톡에서 사용할 URL
          },
        },
        buttons: [
          {
            title: '웹으로 보기',
            link: {
              mobileWebUrl: mobileLink,
              webUrl: pcLink,
            },
          },
        ],
      });
    } else {
      console.error('Kakao SDK가 로드되지 않았습니다.');
    }
  };

  return (
    <a id="btn-kakaotalk-share-feed" href="#" onClick={handleClick}>
      <img
        src="https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png"
        alt="카카오톡 공유하기 버튼"
      />
    </a>
  );
};

export { KakaoShareButton };
