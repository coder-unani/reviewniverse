export class EndpointManager {
  static generateUrl(endpoint, params = {}) {
    let url = endpoint;
    for (const key in params) {
      url = url.replace(`:${key}`, params[key]);
    }
    return url;
  }
}

export const ENDPOINTS = {
  HOME: '/',
  VIDEO_DETAIL: '/contents/:videoId',
  PEOPLE: '/people/:peopleId',
  GENRE: '/genres/:genreId',
  PRODUCTION: '/productions/:productionId',
  SEARCH: '/search',
  USER_AUTH_KAKAO_CALLBACK: '/users/auth/kakao/callback',
  USER_AUTH_NAVER_CALLBACK: '/users/auth/naver/callback',
  USER_AUTH_GOOGLE_CALLBACK: '/users/auth/google/callback',
  USER_LOGIN: '/users/login',
  USER_WATCHTYPE: '/users/watchtype',
  USER: '/users/:userId',
  USER_RATINGS: '/users/:userId/contents/ratings',
  USER_REVIEWS: '/users/:userId/contents/reviews',
  USER_LIKES: '/users/:userId/contents/likes',
  USER_PROFILE: '/users/profile',
  USER_DELETE: '/users/delete',
  // ERROR: '/500',
  ERROR: '/error',
  NOT_FOUND: '/_not-found',
  DENIED_ALL: '/*',
};
