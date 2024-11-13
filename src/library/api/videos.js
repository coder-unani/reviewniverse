import { SETTINGS } from '@/config/settings';
import FetchClient from '@/utils/FetchClient';
import { cError } from '@/utils/test';

const baseURL = SETTINGS.API_BASE_URL;
const endpoints = {
  screens: `${baseURL}/v1/screens`,
  collections: `${baseURL}/v1/collections`,
  collectionDetail: `${baseURL}/v1/collections/:collectionId`,
  collectionLike: `${baseURL}/v1/collections/:collectionId/like`,
  videos: `${baseURL}/v1/videos`,
  videosUpcoming: `${baseURL}/v1/videos/upcoming`,
  videoDetail: `${baseURL}/v1/videos/:videoId`,
  videoMyInfo: `${baseURL}/v1/videos/:videoId/myinfo`,
  videoReviews: `${baseURL}/v1/videos/:videoId/reviews`,
  videoRelated: `${baseURL}/v1/videos/:videoId/related`,
  videoLike: `${baseURL}/v1/videos/:videoId/like`,
  videoWatched: `${baseURL}/v1/videos/:videoId/watched`,
  videoExpect: `${baseURL}/v1/videos/:videoId/expect`,
  videoRating: `${baseURL}/v1/videos/:videoId/rating`,
};

// Screen 콘텐츠 리스트
export const fetchScreenVideos = async ({ code, display = null, revalidate = null }) => {
  try {
    const client = new FetchClient();
    if (revalidate) {
      client.setNextOptions({ revalidate });
    }
    const res = await client.get(endpoints.screens, {
      code,
      ...(display && { dp: display }),
    });
    return res;
  } catch (error) {
    cError(error);
    return null;
  }
};

// Collection 콘텐츠 리스트
export const fetchCollectionVideos = async ({ page = null, size = null, code = null, revalidate = null }) => {
  try {
    const client = new FetchClient();
    if (revalidate) {
      client.setNextOptions({ revalidate });
    }
    const res = await client.get(endpoints.collections, {
      ...(page && { p: page }),
      ...(size && { ps: size }),
      ...(code && { cd: code }),
    });
    return res;
  } catch (error) {
    cError(error);
    return null;
  }
};

// Collection 콘텐츠 상세정보
export const fetchCollectionDetail = async ({ collectionId, revalidate = null }) => {
  try {
    const client = new FetchClient();
    if (revalidate) {
      client.setNextOptions({ revalidate });
    }
    const res = await client.get(endpoints.collectionDetail.replace(':collectionId', collectionId));
    return res;
  } catch (error) {
    cError(error);
    return null;
  }
};

// Collection 좋아요
export const fetchCollectionLike = async ({ collectionId }) => {
  try {
    const client = new FetchClient();
    const res = await client.post(endpoints.collectionLike.replace(':collectionId', collectionId));
    return res;
  } catch (error) {
    cError(error);
    return null;
  }
};

// 기본 콘텐츠 리스트
/**
 * PARAMS:
 * - page: 페이지 번호
 * - size: 페이지 사이즈
 * - orderBy: 정렬 조건
 * - mode: 검색 모드
 * - code: 검색 코드
 * - by: 검색 대상
 * - terms: 검색 기간
 * - model: 검색 모델
 * - query: 검색키워드
 */
export const fetchVideos = async ({
  page = null,
  size = null,
  orderBy = null,
  mode = null,
  code = null,
  by = null,
  terms = null,
  model = null,
  query = null,
  revalidate = null,
}) => {
  try {
    const client = new FetchClient();
    if (revalidate) {
      client.setNextOptions({ revalidate });
    }
    const res = await client.get(endpoints.videos, {
      ...(page && { p: page }),
      ...(size && { ps: size }),
      ...(orderBy && { ob: orderBy }),
      ...(mode && { m: mode }),
      ...(code && { cd: code }),
      ...(by && { by }),
      ...(terms && { tm: terms }),
      ...(model && { md: model }),
      ...(query && { q: query }),
    });
    return res;
  } catch (error) {
    cError(error);
    return null;
  }
};

// Upcoming 콘텐츠 리스트
export const fetchUpcomingVideos = async ({ page = null, size = null, revalidate = null }) => {
  try {
    const client = new FetchClient();
    if (revalidate) {
      client.setNextOptions({ revalidate });
    }
    const res = await client.get(endpoints.videosUpcoming, {
      ...(page && { p: page }),
      ...(size && { ps: size }),
    });
    return res;
  } catch (error) {
    cError(error);
    return null;
  }
};

// 콘텐츠 상세 정보
export const fetchVideoDetail = async ({ videoId, revalidate = null }) => {
  try {
    const client = new FetchClient();
    if (revalidate) {
      client.setNextOptions({ revalidate });
    }
    const res = await client.get(endpoints.videoDetail.replace(':videoId', videoId));
    return res;
  } catch (error) {
    cError(error);
    return null;
  }
};

// 콘텐츠 내 정보
export const fetchVideoMyInfo = async ({ videoId, referrer = null, referrerKey = null }) => {
  try {
    const client = new FetchClient();
    const res = await client.get(endpoints.videoMyInfo.replace(':videoId', videoId), {
      ...(referrer && { ref: referrer }),
      ...(referrerKey && { ref_key: referrerKey }),
    });
    return res;
  } catch (error) {
    cError(error);
    return null;
  }
};

// 콘텐츠 리뷰 리스트
export const fetchVideoReviews = async ({ videoId, page = null, size = null, metadata = null }) => {
  try {
    const client = new FetchClient();
    const res = await client.get(endpoints.videoReviews.replace(':videoId', videoId), {
      ...(page && { p: page }),
      ...(size && { ps: size }),
      ...(metadata && { metadata }),
    });
    return res;
  } catch (error) {
    cError(error);
    return null;
  }
};

// 콘텐츠 연관 리스트
export const fetchRelatedVideos = async ({ videoId, revalidate = null }) => {
  try {
    const client = new FetchClient();
    if (revalidate) {
      client.setNextOptions({ revalidate });
    }
    const res = await client.get(endpoints.videoRelated.replace(':videoId', videoId));
    return res;
  } catch (error) {
    cError(error);
    return null;
  }
};

// 콘텐츠 좋아요
export const fetchVideoLike = async ({ videoId }) => {
  try {
    const client = new FetchClient();
    const res = await client.post(endpoints.videoLike.replace(':videoId', videoId));
    return res;
  } catch (error) {
    cError(error);
    return null;
  }
};

// 콘텐트 봤어요
export const fetchVideoWatched = async ({ videoId }) => {
  try {
    const client = new FetchClient();
    const res = await client.post(endpoints.videoWatched.replace(':videoId', videoId));
    return res;
  } catch (error) {
    cError(error);
    return null;
  }
};

// 콘텐츠 기대돼요
export const fetchVideoExpect = async ({ videoId }) => {
  try {
    const client = new FetchClient();
    const res = await client.post(endpoints.videoExpect.replace(':videoId', videoId));
    return res;
  } catch (error) {
    cError(error);
    return null;
  }
};

// 콘텐츠 평점
export const fetchVideoRating = async ({ videoId, rating }) => {
  try {
    const client = new FetchClient();
    const res = await client.post(endpoints.videoRating.replace(':videoId', videoId), {}, { rating });
    return res;
  } catch (error) {
    cError(error);
    return null;
  }
};
