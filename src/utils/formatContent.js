import { isEmpty } from 'lodash';

import {
  USER_CODE,
  USER_WATCH_TYPE_CODE,
  SCREEN_MAIN_ID,
  VIDEO_ACTOR_CODE,
  VIDEO_STAFF_CODE,
  VIDEO_PLATFORM_CODE,
  VIDEO_TRAILER_CODE,
} from '@/config/codes';
import { DEFAULT_IMAGES } from '@/config/constants';
import { SETTINGS } from '@/config/settings';

// 유저 코드 포맷
export const fUserCode = (code) => {
  const userCode = USER_CODE[code];
  return userCode || '10';
};

// 유저 시청 타입 포맷
export const fUserWatchtype = (code) => {
  const watchType = USER_WATCH_TYPE_CODE[code];
  return watchType || {};
};

// 비디오 코드 포맷
export const fVideoCode = (code) => {
  return code === '10' ? '영화' : '시리즈';
};

// 스크린 데이터 포맷
export const fExportScreenDataByCode = (screens, code) => {
  // SCREEN_MAIN_ID에 code가 포함되어 있는지 확인
  if (!SCREEN_MAIN_ID.includes(code)) return {};
  return screens.find((screen) => screen.code === code);
};

// provider 포맷
export const fProviderCode = (provider) => {
  const providerCode = Object.keys(USER_CODE).find((key) => USER_CODE[key] === provider);
  return providerCode || '';
};

// 플랫폼 포맷
export const fPlatformNameByCode = (code) => {
  const platformType = VIDEO_PLATFORM_CODE[code];
  return platformType || '';
};

// 플랫폼 배열에서 코드가 50미만인 것만 필터링
export const fPlatformFilter = (platforms) => {
  if (isEmpty(platforms)) return [];
  // platforms 배열에서 code가 10이상 50미만인 것만 필터링
  return platforms.filter((platform) => Number(platform.code) >= 10 && Number(platform.code) < 50);
  // return platforms.filter((platform) => Number(platform.code) < 50);
};

// 출연진 역할 코드 포맷
export const fActorCode = (code) => {
  const actorType = VIDEO_ACTOR_CODE[code];
  return actorType || '출연';
};

// 제작진 역할 코드 포맷
export const fStaffCode = (code) => {
  const staffType = VIDEO_STAFF_CODE[code];
  return staffType || '제작';
};

// 트레일러 코드 포맷
export const fTrailerCode = (code) => {
  const trailerType = VIDEO_TRAILER_CODE[code];
  return trailerType || '예고편';
};

// 이미지 URL 포맷
export const fMakeImageUrl = (image, defaultImage = DEFAULT_IMAGES.noImage) => {
  // image에 http가 포함되어 있으면 그대로 반환
  if (isEmpty(image)) return defaultImage;
  if (image.includes('http')) return image;
  return `${SETTINGS.CDN_BASE_URL}/${image}`;
};

// 썸네일 URL 포맷 (리사이즈 URL)
export const fMakeThumbnailUrl = (image) => {
  const resizeImage = `r5/${image}`;
  return fMakeImageUrl(resizeImage);
};

// 프리뷰 썸네일 포맷
export const fPreviewThumbnail = (images, isThumb = false) => {
  let result = DEFAULT_IMAGES.noImage;
  if (isEmpty(images)) return result;
  if (Array.isArray(images)) {
    if (images[2]) {
      result = isThumb ? fMakeThumbnailUrl(images[2]) : fMakeImageUrl(images[2]);
    } else if (images[1]) {
      result = isThumb ? fMakeThumbnailUrl(images[1]) : fMakeImageUrl(images[1]);
    } else {
      result = isThumb ? fMakeThumbnailUrl(images[0]) : fMakeImageUrl(images[0]);
    }
  } else {
    result = isThumb ? fMakeThumbnailUrl(images) : fMakeImageUrl(images);
  }
  return result;
};

// 썸네일 이미지 포맷
export const fThumbnail = (images, isThumb = true) => {
  let result = DEFAULT_IMAGES.noImage;
  if (isEmpty(images)) return result;
  if (Array.isArray(images)) {
    result = isThumb ? fMakeThumbnailUrl(images[0]) : fMakeImageUrl(images[0]);
  } else {
    result = isThumb ? fMakeThumbnailUrl(images) : fMakeImageUrl(images);
  }
  return result;
};

// 배경 이미지 포맷
export const fBackgroundImage = (images, isThumb = false) => {
  const defaultImage = DEFAULT_IMAGES.noPreview;
  let result = defaultImage;
  if (isEmpty(images)) return result;
  if (Array.isArray(images)) {
    const url = images[1] || images[0];
    result = isThumb ? fMakeThumbnailUrl(url) : fMakeImageUrl(url, defaultImage);
  } else {
    result = isThumb ? fMakeThumbnailUrl(images) : fMakeImageUrl(images, defaultImage);
  }
  return result;
};

// 평점 포맷
export const fRating = (rating) => {
  return parseFloat(rating / 2).toFixed(1);
};

// 평점 컬러 포맷
export const fRatingColor = (rating) => {
  const colors = ['red', 'yellow', 'green'];
  const formatRating = parseFloat(fRating(rating));
  if (formatRating === 0) return 'default';
  if (formatRating > 3.5) return colors[2];
  if (formatRating > 1.5) return colors[1];
  return colors[0];
};

// 평점 텍스트 포맷
export const fRatingText = (rating) => {
  return rating ? fRating(rating) : '-';
};

// 개봉일자, 공개일자 텍스트 포맷
export const fReleaseText = (code) => {
  return code === '10' ? '개봉일자' : '공개일자';
};

// 날짜 포맷: 어떤 날짜 형식이 들어와도 월, 일만 반환 (MM.DD)
export const fReleaseDate = (date) => {
  if (!date) return '';
  return date.split('-').slice(1).join('.');
};

// 국가 포맷: 여러 나라일 경우 (한국, 일본, 미국)
export const fCountry = (country) => {
  if (isEmpty(country)) return '';
  if (!Array.isArray(country)) return country;
  const countryAll = country.map((item) => item.name_ko).join(', ');
  return countryAll;
};

// 상영시간, 시리즈 텍스트 포맷
export const fRuntimeText = (code) => {
  return code === '10' ? '상영시간' : '시리즈';
};

// 이미지 에러 처리 포맷: 이미지가 없을 경우 대체 이미지로 변경
export const fReplaceImageOnError = (selector) => {
  const images = document.querySelectorAll(selector);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const testImage = new Image();
        testImage.src = img.src;

        // 이미지 로드 에러 시 대체 이미지로 변경
        testImage.onerror = () => {
          img.style.display = 'none'; // 이미지 태그를 숨김
        };

        // 관찰 중지
        observer.unobserve(img);
      }
    });
  });

  images.forEach((img) => observer.observe(img));

  return () => {
    // 컴포넌트 언마운트 시 관찰 해제
    images.forEach((img) => observer.unobserve(img));
  };
};

// upcoming videos를 release date로 그룹핑
export const fGroupDataByRelease = (videosData) => {
  return videosData.reduce((acc, video) => {
    const { release } = video.upcoming[0];
    if (!acc[release]) {
      acc[release] = [];
    }
    acc[release].push(video);
    return acc;
  }, {});
};
