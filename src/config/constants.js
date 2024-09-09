import { SETTINGS } from '@/config/settings';

export const DEFAULT_IMAGES = {
  logo: `${SETTINGS.CDN_BASE_URL}/assets/images/logo.svg`,
  logoWhite: `${SETTINGS.CDN_BASE_URL}/assets/images/logo-white.svg`,
  kakao: `${SETTINGS.CDN_BASE_URL}/assets/images/kakao.png`,
  naver: `${SETTINGS.CDN_BASE_URL}/assets/images/naver.png`,
  google: `${SETTINGS.CDN_BASE_URL}/assets/images/google.png`,
  noActor: `${SETTINGS.CDN_BASE_URL}/assets/images/no-actor.png`,
  noImage: `${SETTINGS.CDN_BASE_URL}/assets/images/no-image.png`,
  popup: `${SETTINGS.CDN_BASE_URL}/assets/images/popup.png`,
  userLogin: `${SETTINGS.CDN_BASE_URL}/assets/images/user-login.png`,
  userDelete: `${SETTINGS.CDN_BASE_URL}/assets/images/user-delete.png`,
  loading: `${SETTINGS.CDN_BASE_URL}/assets/images/loading.png`,
  searchNotFound: `${SETTINGS.CDN_BASE_URL}/assets/images/search-not-found.png`,
  pageNotFound: `${SETTINGS.CDN_BASE_URL}/assets/images/page-not-found.png`,
  error: `${SETTINGS.CDN_BASE_URL}/assets/images/error.png`,
};

export const SITE_KEYWORDS =
  '리뷰니버스, 리뷰, reviewniverse, flqbslqjtm, 커뮤니티, 영화, 드라마, 인기, 추천, 검색, 통합검색, OTT, 평점';

export const HOME_REVALIDATE_SEC = 300;

export const VIDEO_ORDER_OPTIONS = {
  RELEASE_ASC: 'release_asc',
  RELEASE_DESC: 'release_desc',
  VIEW_ASC: 'view_asc',
  VIEW_DESC: 'view_desc',
  RATING_ASC: 'rating_asc',
  RATING_DESC: 'rating_desc',
  LIKE_ASC: 'like_asc',
  LIKE_DESC: 'like_desc',
  REVIEW_ASC: 'review_asc',
  REVIEW_DESC: 'review_desc',
};

export const VIDEO_TERMS_OPTIONS = {
  ALREADY: 'already',
  COMING_SOON: 'coming_soon',
  CURRENT: 'current',
};

// TODO: 문구 정리 필요
export const VIDEO_RATING_TEXT = [
  '어떠셨나요?',
  '최악이에요!',
  '싫어요',
  '별로에요',
  '그저 그래요',
  '보통이에요',
  '그냥 볼만했어요',
  '그럭저럭 괜찮아요',
  '좋아요',
  '꽤 좋아요',
  '최고에요!',
];

export const PROFILE_IMAGE_FILE_SIZE = 30;

export const PROFILE_IMAGE_FILE_TYPE = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

export const PROFILE_TEXT_MAX_LENGTH = 200;
