import { AxiosClient } from '@/utils/HttpClient';
import { SETTINGS } from '@/config/settings';
import { cLog, cError } from '@/utils/test';

const baseURL = SETTINGS.API_BASE_URL;
const endpoints = {
  token: baseURL + '/v1/token',
};

export const fetchToken = async () => {
  try {
    const client = new AxiosClient();
    const res = await client.get(endpoints.token);
    return res;
  } catch (error) {
    cError(error);
  }
};
