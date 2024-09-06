import HttpClient from '@/utils/HttpClient';
import { SETTINGS } from '@/config/settings';
import { cLog, cError } from '@/utils/test';

const baseURL = SETTINGS.API_BASE_URL;
const endpoints = {
  videos: baseURL + '/v1/videos',
  videoDetail: baseURL + '/v1/videos/:videoId',
  videoReviews: baseURL + '/v1/videos/:videoId/reviews',
  videoMyInfo: baseURL + '/v1/videos/:videoId/myinfo',
  videoLike: baseURL + '/v1/videos/:videoId/like',
  videoRating: baseURL + '/v1/videos/:videoId/rating',
};

// Video List API
/**
 * PARAMS:
 * - query: 검색키워드
 * - page: 페이지 번호
 * - size: 페이지 사이즈
 * - display: 디스플레이
 * - mode: 검색 모드
 * - target: 검색 타겟
 * - orderBy: 정렬
 * - terms: release 상태
 */
export const fetchVideos = async ({
  query = null,
  page = null,
  size = null,
  display = null,
  mode = null,
  target = null,
  orderBy = null,
  terms = null,
}) => {
  try {
    const client = new HttpClient();
    const res = await client.get(endpoints.videos, {
      ...(query && { q: query }),
      ...(page && { p: page }),
      ...(size && { s: size }),
      ...(display && { dp: display }),
      ...(mode && { m: mode }),
      ...(target && { tg: target }),
      ...(orderBy && { ob: orderBy }),
      ...(terms && { tm: terms }),
    });
    return res;
  } catch (error) {
    cError(error);
  }
};

export const fetchVideoDetail = async ({ videoId }) => {
  try {
    const client = new HttpClient();
    const res = await client.get(
      endpoints.videoDetail.replace(':videoId', videoId)
    );
    return res;
  } catch (error) {
    cError(error);
  }
};

export const fetchVideoReviews = async ({
  videoId,
  page = null,
  pageSize = null,
}) => {
  try {
    const client = new HttpClient();
    const res = await client.get(
      endpoints.videoReviews.replace(':videoId', videoId),
      {
        ...(page && { p: page }),
        ...(pageSize && { ps: pageSize }),
      }
    );
    return res;
  } catch (error) {
    cError(error);
  }
};

export const fetchVideoMyInfo = async ({ videoId }) => {
  try {
    const client = new HttpClient();
    const res = await client.post(
      endpoints.videoMyInfo.replace(':videoId', videoId)
    );
    return res;
  } catch (error) {
    cError(error);
  }
};

export const fetchVideoLike = async ({ videoId }) => {
  try {
    const client = new HttpClient();
    const res = await client.post(
      endpoints.videoLike.replace(':videoId', videoId)
    );
    return res;
  } catch (error) {
    cError(error);
  }
};

export const fetchVideoRating = async ({ videoId, rating }) => {
  try {
    const client = new HttpClient();
    const res = await client.post(
      endpoints.videoRating.replace(':videoId', videoId),
      {},
      { rating }
    );
    return res;
  } catch (error) {
    cError(error);
  }
};
