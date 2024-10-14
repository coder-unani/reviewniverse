import { SETTINGS } from '@/config/settings';
import FetchClient from '@/utils/FetchClient';
import AxiosClient from '@/utils/AxiosClient';
import { cError } from '@/utils/test';

const baseURL = SETTINGS.API_BASE_URL;
const endpoints = {
  videos: `${baseURL}/v1/videos`,
  videosUpcoming: `${baseURL}/v1/videos/upcoming`,
  videoDetail: `${baseURL}/v1/videos/:videoId`,
  videoReviews: `${baseURL}/v1/videos/:videoId/reviews`,
  videoMyInfo: `${baseURL}/v1/videos/:videoId/myinfo`,
  videoLike: `${baseURL}/v1/videos/:videoId/like`,
  videoRating: `${baseURL}/v1/videos/:videoId/rating`,
};

// Video List API
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
}) => {
  try {
    const client = new FetchClient();
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

export const fetchUpcomingVideos = async ({ page = null, size = null }) => {
  try {
    const client = new FetchClient();
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

export const fetchVideoDetail = async ({ videoId }) => {
  try {
    const client = new FetchClient();
    const res = await client.get(endpoints.videoDetail.replace(':videoId', videoId));
    return res;
  } catch (error) {
    cError(error);
    return null;
  }
};

export const fetchVideoReviews = async ({ videoId, page = null, pageSize = null, metadata = null }) => {
  try {
    const client = new AxiosClient();
    const res = await client.get(endpoints.videoReviews.replace(':videoId', videoId), {
      ...(page && { p: page }),
      ...(pageSize && { ps: pageSize }),
      ...(metadata && { metadata }),
    });
    return res;
  } catch (error) {
    cError(error);
    return null;
  }
};

export const fetchVideoMyInfo = async ({ videoId }) => {
  try {
    const client = new AxiosClient();
    const res = await client.post(endpoints.videoMyInfo.replace(':videoId', videoId));
    return res;
  } catch (error) {
    cError(error);
    return null;
  }
};

export const fetchVideoLike = async ({ videoId }) => {
  try {
    const client = new AxiosClient();
    const res = await client.post(endpoints.videoLike.replace(':videoId', videoId));
    return res;
  } catch (error) {
    cError(error);
    return null;
  }
};

export const fetchVideoRating = async ({ videoId, rating }) => {
  try {
    const client = new AxiosClient();
    const res = await client.post(endpoints.videoRating.replace(':videoId', videoId), {}, { rating });
    return res;
  } catch (error) {
    cError(error);
    return null;
  }
};
