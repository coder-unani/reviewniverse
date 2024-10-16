import { SETTINGS } from '@/config/settings';
import FetchClient from '@/utils/FetchClient';
import { cError } from '@/utils/test';

const baseURL = SETTINGS.API_BASE_URL;
const endpoints = {
  inquiry: `${baseURL}/v1/support/inquiry`,
  suggest: `${baseURL}/v1/support/suggest`,
};

// 문의/제보 보내기
export const fetchInquiry = async ({ inquiryData }) => {
  try {
    const client = new FetchClient();
    const res = await client.post(endpoints.inquiry, inquiryData);
    return res;
  } catch (error) {
    cError(error);
    return null;
  }
};

// 작품 요청
export const fetchSuggest = async ({ query = null, total = null }) => {
  try {
    const client = new FetchClient();
    const res = await client.post(endpoints.suggest, { query, total });
    return res;
  } catch (error) {
    cError(error);
    return null;
  }
};
