import { SETTINGS } from '@/config/settings';
import FetchClient from '@/utils/FetchClient';
import AxiosClient from '@/utils/AxiosClient';
import { cError } from '@/utils/test';

const baseURL = SETTINGS.API_BASE_URL;
const endpoints = {
  reviews: `${baseURL}/v1/reviews`,
  reviewCreate: `${baseURL}/v1/videos/:videoId/reviews`,
  reviewUpdate: `${baseURL}/v1/videos/:videoId/reviews/:reviewId`,
  reviewDelete: `${baseURL}/v1/videos/:videoId/reviews/:reviewId`,
  reviewLike: `${baseURL}/v1/videos/:videoId/reviews/:reviewId/like`,
};

// 리뷰 전체 리스트
export const fetchReviews = async ({ page = null, size = null }) => {
  try {
    const client = new FetchClient();
    const res = await client.get(endpoints.reviews, {
      ...(page && { page }),
      ...(size && { size }),
    });
    return res;
  } catch (error) {
    cError(error);
    return null;
  }
};

// 리뷰 작성
export const fetchReviewCreate = async ({ videoId, title, isSpoiler = false, isPrivate = false }) => {
  try {
    const client = new AxiosClient();
    const res = await client.post(endpoints.reviewCreate.replace(':videoId', videoId), {
      title,
      is_spoiler: isSpoiler,
      is_private: isPrivate,
    });
    return res;
  } catch (error) {
    cError(error);
    return null;
  }
};

// 리뷰 수정
export const fetchReviewUpdate = async ({ videoId, reviewId, title, isSpoiler = false, isPrivate = false }) => {
  try {
    const client = new AxiosClient();
    const res = await client.put(endpoints.reviewUpdate.replace(':videoId', videoId).replace(':reviewId', reviewId), {
      title,
      is_spoiler: isSpoiler,
      is_private: isPrivate,
    });
    return res;
  } catch (error) {
    cError(error);
    return null;
  }
};

// 리뷰 삭제
export const fetchReviewDelete = async ({ videoId, reviewId }) => {
  try {
    const client = new AxiosClient();
    const res = await client.delete(endpoints.reviewDelete.replace(':videoId', videoId).replace(':reviewId', reviewId));
    return res;
  } catch (error) {
    cError(error);
    return null;
  }
};

// 리뷰 좋아요
export const fetchReviewLike = async ({ videoId, reviewId }) => {
  try {
    const client = new AxiosClient();
    const res = await client.post(endpoints.reviewLike.replace(':videoId', videoId).replace(':reviewId', reviewId));
    return res;
  } catch (error) {
    cError(error);
    return null;
  }
};
