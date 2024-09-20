'use client';

import { useEffect } from 'react';

const FacebookShareButton = ({ title, desc, link = null, image = null }) => {
  const fbAppId = 'your_facebook_app_id'; // 페이스북 앱 ID

  useEffect(() => {
    // Facebook SDK 스크립트 동적 로드
    const script = document.createElement('script');
    script.src = 'https://connect.facebook.net/en_US/sdk.js';
    script.async = true;
    script.defer = true;
    script.crossOrigin = 'anonymous';
    script.onload = () => {
      if (!window.FB) {
        window.fbAsyncInit = function () {
          window.FB.init({
            appId: fbAppId,
            autoLogAppEvents: true,
            xfbml: true,
            version: 'v13.0',
          });
        };
      }
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleClick = (e) => {
    e.preventDefault();

    // const shareTitle = title || '리뷰니버스';
    // const shareDesc = desc || '리뷰니버스와 함께라면 보는 즐거움이 2배로, 생생한 리뷰를 확인해보세요!';
    // const shareLinkUrl = link ? String(link) : window.location.href;
    // const shareImageUrl = image || 'https://www.your-domain.com/path/image.jpg'; // 기본 이미지 URL

    // if (window.FB) {
    //   window.FB.ui(
    //     {
    //       method: 'share',
    //       href: shareLinkUrl, // 공유할 URL
    //       quote: shareDesc, // 공유할 설명
    //       hashtag: '#리뷰니버스',
    //     },
    //     function (response) {
    //       if (response && !response.error_message) {
    //         console.log('Posting completed.');
    //       } else {
    //         console.error('Error while posting.');
    //       }
    //     }
    //   );
    // } else {
    //   console.error('Facebook SDK가 로드되지 않았습니다.');
    // }
    window.open('http://www.facebook.com/sharer/sharer.php?u=' + location.href);
  };

  return (
    <a id="btn-facebook-share" href="#" onClick={handleClick}>
      <img
        src="https://www.facebook.com/images/fb_icon_325x325.png"
        alt="페이스북 공유하기 버튼"
        style={{ width: '40px', height: '40px' }}
      />
    </a>
  );
};

export default FacebookShareButton;
