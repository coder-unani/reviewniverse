import { SETTINGS } from '@/config/settings';
import FetchClient from '@/utils/FetchClient';
import { cError } from '@/utils/test';

const baseURL = SETTINGS.API_BASE_URL;
const endpoints = {
  screens: `${baseURL}/v1/screens`,
};

// Screen 콘텐츠 리스트
export const fetchScreenVideos = async ({ code, display = null }) => {
  try {
    const client = new FetchClient();
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
