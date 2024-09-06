import { isEmpty } from 'lodash';
import {
  USER_CODE,
  SCREEN_MAIN_ID,
  VIDEO_ACTOR_CODE,
  VIDEO_STAFF_CODE,
  COUNTRY_CODE,
  VIDEO_PLATFORM_CODE,
} from '@/config/codes';
import { DEFAULT_IMAGES } from '@/config/constants';
import { SETTINGS } from '@/config/settings';

// 유저 코드 포맷
export const fUserCode = (code) => {
  const userCode = USER_CODE[code];
  return userCode || '10';
};

// 비디오 코드 포맷
export const fVideoCode = (code) => {
  return code === '10' ? '영화' : '시리즈';
};

// 스크린 데이터 포맷
export const fScreenCode = (screens, code) => {
  // SCREEN_MAIN_ID에 code가 포함되어 있는지 확인
  if (!SCREEN_MAIN_ID.includes(code)) return null;
  return screens.find((screen) => screen.code === code);
};

// provider 포맷
export const fProviderCode = (provider) => {
  const providerCode = Object.keys(USER_CODE).find(
    (key) => USER_CODE[key] === provider
  );
  return providerCode || '';
};

// 플랫폼 포맷
export const fPlatformCode = (code) => {
  const platformType = VIDEO_PLATFORM_CODE[code];
  return platformType || '플랫폼';
};

// 플랫폼 배열에서 코드가 50미만인 것만 필터링
export const fPlatformFilter = (platforms) => {
  if (isEmpty(platforms)) return [];
  return platforms.filter((platform) => parseInt(platform.code) < 50);
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

// 이미지 URL 포맷
export const fMakeImageUrl = (image) => {
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
      result = isThumb
        ? fMakeThumbnailUrl(images[2])
        : fMakeImageUrl(images[2]);
    } else if (images[1]) {
      result = isThumb
        ? fMakeThumbnailUrl(images[1])
        : fMakeImageUrl(images[1]);
    } else {
      result = isThumb
        ? fMakeThumbnailUrl(images[0])
        : fMakeImageUrl(images[0]);
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
  let result = DEFAULT_IMAGES.noImage;
  if (isEmpty(images)) return result;
  if (Array.isArray(images)) {
    result = isThumb ? fMakeThumbnailUrl(images[1]) : fMakeImageUrl(images[1]);
  } else {
    result = isThumb ? fMakeThumbnailUrl(images) : fMakeImageUrl(images);
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
  if (isEmpty(country)) return '국가';
  if (!Array.isArray(country)) return country;
  const countryAll = country.map((item) => item.name_ko).join(', ');
  return countryAll;
};

// 상영시간, 시리즈 텍스트 포맷
export const fRuntimeText = (code) => {
  return code === '10' ? '상영시간' : '시리즈';
};
