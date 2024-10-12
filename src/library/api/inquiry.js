import { SETTINGS } from '@/config/settings';
import { AxiosClient } from '@/utils/HttpClient';
import { cLog, cError } from '@/utils/test';
import { ReqInquiry } from '@/types/request';

const baseURL = SETTINGS.API_BASE_URL;
const endpoints = {
  inquiry: baseURL + '/v1/support/inquiry',
};

// 문의/제보 보내기
export const fetchInquiry = async ({ inquiryData }) => {
  try {
    const client = new AxiosClient();
    const res = await client.post(endpoints.inquiry, inquiryData);
    return res;
  } catch (error) {
    cError(error);
  }
};
