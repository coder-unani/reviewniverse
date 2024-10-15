import { SETTINGS } from '@/config/settings';

export const HOME_REVALIDATE_SEC = 300; // 5분
export const VIDEO_REVALIDATE_SEC = 600; // 10분
export const GENRES_REVALIDATE_SEC = 3600; // 1시간
export const PEOPLE_REVALIDATE_SEC = 3600; // 1시간
export const PRODUCTIONS_REVALIDATE_SEC = 3600; // 1시간
export const UPCOMING_REVALIDATE_SEC = 3600; // 1시간

export const SITE_KEYWORDS =
  '리뷰니버스, 리뷰, reviewniverse, flqbslqjtm, 커뮤니티, 영화, 드라마, TV, 작품, 인기, 추천, 검색, 통합검색, OTT, 평점, 정보';
export const VIDEO_KEYWORDS = '출연진, 등장인물, 공식영상, 보러가기, 후기, 평가';
export const GENRES_KEYWORDS = '장르, genre';
export const PEOPLE_KEYWORDS =
  '필모그래피, filmography, 프로필, profile, 작품활동, 참여작품, 출연, 프로그램, 참여, 인물';
export const PRODUCTIONS_KEYWORDS = '제작, 제작사, production, productions, filmes, 참여작품';
export const UPCOMING_KEYWORDS =
  '플랫폼, 넷플릭스, 디즈니플러스, 티빙, 웨이브, 쿠팡플레이, 왓챠, 애플TV, 라프텔, 공개예정, 신작, 업데이트, 소식, 캘린더';

export const GENRES_PAGE_SIZE = 20; // 장르 페이지 사이즈
export const PEOPLE_PAGE_SIZE = 20; // 인물 페이지 사이즈
export const PRODUCTIONS_PAGE_SIZE = 20; // 제작사 페이지 사이즈
export const UPCOMING_PAGE_SIZE = 50; // Upcoming 페이지 사이즈
export const SEARCH_PAGE_SIZE = 20; // 검색 페이지 사이즈

export const VIDEO_ORDER_OPTIONS = {
  VIEW_ASC: 'view_asc',
  VIEW_DESC: 'view_desc',
  RATING_ASC: 'rating_asc',
  RATING_DESC: 'rating_desc',
  LIKE_ASC: 'like_asc',
  LIKE_DESC: 'like_desc',
  REVIEW_ASC: 'review_asc',
  REVIEW_DESC: 'review_desc',
  RELEASE_ASC: 'release_asc',
  RELEASE_DESC: 'release_desc',
};

export const VIDEO_MODE_OPTIONS = {
  KEYWORD: 'keyword',
  ID: 'id',
  CONDITION: 'condition',
};

export const VIDEO_CODE_OPTIONS = {
  ALL: 'all',
  MOVIES: 'movies',
  SERIES: 'series',
};

export const VIDEO_BY_OPTIONS = {
  ALL: 'all',
  TITLE: 'title',
  CODE: 'code',
  PERSON: 'person',
  GENRE: 'genre',
  PLATFORM: 'platform',
  PRODUCTION: 'production',
  COUNTRY: 'country',
};

export const VIDEO_TERMS_OPTIONS = {
  RELEASED: 'released',
  CURRENT: 'current',
};

export const VIDEO_MODEL_OPTIONS = {
  LIST: 'list',
  DETAIL: 'detail',
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

export const DEFAULT_IMAGES = {
  logo: `${SETTINGS.CDN_BASE_URL}/assets/images/logo.svg`,
  logoWhite: `${SETTINGS.CDN_BASE_URL}/assets/images/logo-white.svg`,
  noActor: `${SETTINGS.CDN_BASE_URL}/assets/images/no-actor.png`,
  noImage: `${SETTINGS.CDN_BASE_URL}/assets/images/no-image.png`,
  noPreview: `${SETTINGS.CDN_BASE_URL}/assets/images/no-preview.png`,
  loading: `${SETTINGS.CDN_BASE_URL}/assets/images/loading.png`,
  userLogin: `${SETTINGS.CDN_BASE_URL}/assets/images/user-login.png`,
  userDelete: `${SETTINGS.CDN_BASE_URL}/assets/images/user-delete.png`,
  searchNotFound: `${SETTINGS.CDN_BASE_URL}/assets/images/search-not-found.png`,
  pageNotFound: `${SETTINGS.CDN_BASE_URL}/assets/images/page-not-found.png`,
  error: `${SETTINGS.CDN_BASE_URL}/assets/images/error.png`,
  kakao: `${SETTINGS.CDN_BASE_URL}/assets/images/kakao.png`,
  naver: `${SETTINGS.CDN_BASE_URL}/assets/images/naver.png`,
  google: `${SETTINGS.CDN_BASE_URL}/assets/images/google.png`,
  shareKakaoTalk: `${SETTINGS.CDN_BASE_URL}/assets/images/sns/kakaotalk.png`,
  shareFacebook: `${SETTINGS.CDN_BASE_URL}/assets/images/sns/facebook.png`,
  shareX: `${SETTINGS.CDN_BASE_URL}/assets/images/sns/X.png`,
  popup: `${SETTINGS.CDN_BASE_URL}/assets/images/popup.png`,
};
