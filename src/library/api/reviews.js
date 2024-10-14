import { SETTINGS } from '@/config/settings';
import AxiosClient from '@/utils/AxiosClient';
import { cError } from '@/utils/test';

const baseURL = SETTINGS.API_BASE_URL;
const endpoints = {
  reviewCreate: `${baseURL}/v1/videos/:videoId/reviews`,
  reviewUpdate: `${baseURL}/v1/videos/:videoId/reviews/:reviewId`,
  reviewDelete: `${baseURL}/v1/videos/:videoId/reviews/:reviewId`,
  reviewLike: `${baseURL}/v1/videos/:videoId/reviews/:reviewId/like`,
};

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
