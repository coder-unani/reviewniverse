import { SETTINGS } from '@/config/settings';

export const NO_REVALIDATE_SEC = 0; // 캐시 사용 안함
export const DEFAULT_REVALIDATE_SEC = 60; // 1분
export const HOME_REVALIDATE_SEC = 600; // 10분
export const UPCOMING_REVALIDATE_SEC = 3600; // 1시간
export const GENRES_REVALIDATE_SEC = 3600; // 1시간
export const COUNTRIES_REVALIDATE_SEC = 3600; // 1시간
export const PRODUCTIONS_REVALIDATE_SEC = 3600; // 1시간
export const PEOPLE_REVALIDATE_SEC = 3600; // 1시간
export const COLLECTIONS_REVALIDATE_SEC = 3600; // 1시간
export const COLLECTION_REVALIDATE_SEC = 3600; // 1시간
export const REVIEWS_REVALIDATE_SEC = 600; // 10분
export const VIDEO_REVALIDATE_SEC = 600; // 10분
export const VIDEO_RELATED_REVALIDATE_SEC = 3600; // 1시간

// 메타태그 키워드 정보
export const SITE_KEYWORDS =
  '리뷰니버스, 리뷰, reviewniverse, flqbslqjtm, 커뮤니티, 영화, 드라마, TV, 작품, 인기, 추천, 검색, 통합검색, OTT, 평점, 정보';
export const VIDEO_KEYWORDS = '출연진, 등장인물, 공식영상, 보러가기, 후기, 평가';
export const UPCOMING_KEYWORDS =
  '플랫폼, 넷플릭스, 디즈니플러스, 티빙, 웨이브, 쿠팡플레이, 왓챠, 애플TV, 라프텔, 공개예정, 신작, 업데이트, 소식, 캘린더';
export const GENRES_KEYWORDS = '장르, genre';
export const COUNTRIES_KEYWORDS = '제작국가';
export const PRODUCTIONS_KEYWORDS = '제작, 제작사, production, productions, filmes, 참여작품';
export const PEOPLE_KEYWORDS =
  '필모그래피, filmography, 프로필, profile, 작품활동, 참여작품, 출연, 프로그램, 참여, 인물';
export const COLLECTION_KEYWORDS = '컬렉션, collection';

export const UPCOMING_PAGE_SIZE = 50; // Upcoming 페이지 사이즈
export const GENRES_PAGE_SIZE = 20; // 장르 페이지 사이즈
export const COUNTRIES_PAGE_SIZE = 20; // 국가 페이지 사이즈
export const PRODUCTIONS_PAGE_SIZE = 20; // 제작사 페이지 사이즈
export const PEOPLE_PAGE_SIZE = 20; // 인물 페이지 사이즈
export const COLLECTIONS_PAGE_SIZE = 20; // 컬렉션 페이지 사이즈
export const REVIEWS_PAGE_SIZE = 20; // 리뷰 페이지 사이즈
export const SEARCH_PAGE_SIZE = 20; // 검색 페이지 사이즈
export const VIDEO_REVIEW_PAGE_SIZE = 20; // 콘텐츠 리뷰 페이지 사이즈
export const USER_REVIEW_PAGE_SIZE = 20; // 사용자 리뷰 페이지 사이즈
export const USER_LIKE_PAGE_SIZE = 20; // 사용자 좋아요 페이지 사이즈
export const USER_RATING_PAGE_SIZE = 20; // 사용자 평가 페이지 사이즈

// 컬렉션 검색 코드 옵션
export const COLLECTION_CODE_OPTIONS = {
  SERIES: 10,
  RELATED: 20,
  COLLECTION: 30,
};

// 콘텐츠 정렬 조건 옵션
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

// 콘텐츠 검색 모드 옵션
export const VIDEO_MODE_OPTIONS = {
  KEYWORD: 'keyword',
  ID: 'id',
  CONDITION: 'condition',
};

// 콘텐츠 검색 코드 옵션
export const VIDEO_CODE_OPTIONS = {
  ALL: 'all',
  MOVIES: 'movies',
  SERIES: 'series',
};

// 콘텐츠 검색 대상 옵션
export const VIDEO_BY_OPTIONS = {
  ALL: 'all',
  TITLE: 'title',
  CODE: 'code',
  GENRE: 'genre',
  COUNTRY: 'country',
  PRODUCTION: 'production',
  PLATFORM: 'platform',
  PERSON: 'person',
};

// 콘텐츠 검색 기간 옵션
export const VIDEO_TERMS_OPTIONS = {
  RELEASED: 'released',
  CURRENT: 'current',
};

// 콘텐츠 검색 모델 옵션
export const VIDEO_MODEL_OPTIONS = {
  LIST: 'list',
  DETAIL: 'detail',
};

// TODO: 문구 정리 필요
// 콘텐츠 평가 점수 텍스트
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

// 프로필 이미지 파일 옵션
export const PROFILE_IMAGE_FILE_SIZE = 30;
export const PROFILE_IMAGE_FILE_TYPE = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
export const PROFILE_TEXT_MAX_LENGTH = 200;

// 기본 이미지
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
