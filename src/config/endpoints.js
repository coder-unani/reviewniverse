export class EndpointManager {
  static generateUrl(endpoint, params = {}) {
    let url = endpoint;

    Object.entries(params).forEach(([key, value]) => {
      url = url.replace(`:${key}`, value);
    });

    return url;
  }
}

export const ENDPOINTS = {
  HOME: '/',
  UPCOMING: '/upcoming',
  GENRES: '/genres/:genreId',
  PEOPLE: '/people/:peopleId',
  COUNTRIES: '/countries/:countryId',
  PRODUCTIONS: '/productions/:productionId',
  COLLECTIONS: '/collections',
  COLLECTION: '/collections/:collectionId',
  RECENTREVIEWS: '/reviews/recent',
  SEARCH: '/search',
  CONTENTS: '/contents/:videoId',
  CONTENTS_REVIEWS: '/contents/:videoId/reviews',
  USER_AUTH_KAKAO_CALLBACK: '/users/auth/kakao/callback',
  USER_AUTH_NAVER_CALLBACK: '/users/auth/naver/callback',
  USER_AUTH_GOOGLE_CALLBACK: '/users/auth/google/callback',
  USER_LOGIN: '/users/login',
  USER_WATCHTYPE: '/users/watchtype',
  USER: '/users/:userId',
  USER_ME: '/users/me',
  USER_EDIT: '/users/edit',
  USER_PROFILE: '/users/profile',
  USER_RATINGS: '/users/:userId/contents/ratings',
  USER_REVIEWS: '/users/:userId/contents/reviews',
  USER_LIKES: '/users/:userId/contents/likes',
  USER_DELETE: '/users/delete',
  INQUIRY: '/support/inquiry',
  ERROR: '/error',
  // NOT_FOUND: '/_not-found',
  DENIED_ALL: '/*',
};
