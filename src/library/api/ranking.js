import { SETTINGS } from '@/config/settings';
import FetchClient from '@/utils/FetchClient';
import { cError } from '@/utils/test';

const baseURL = SETTINGS.API_BASE_URL;
const endpoints = {
  rankingVideos: `${baseURL}/v1/ranking/videos`,
  rankingGenres: `${baseURL}/v1/ranking/genres`,
};

// 랭킹 콘텐츠 리스트
export const fetchRankingVideos = async ({ code, count }) => {
  try {
    const client = new FetchClient();
    const res = await client.get(endpoints.rankingVideos, { code, count });
    return res;
  } catch (error) {
    cError(error);
    return null;
  }
};

// 랭킹 장르 리스트
export const fetchRankingGenres = async ({ count }) => {
  try {
    const client = new FetchClient();
    const res = await client.get(endpoints.rankingGenres, { count });
    return res;
  } catch (error) {
    cError(error);
    return null;
  }
};
