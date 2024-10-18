import { SETTINGS } from '@/config/settings';
import { ReqInquiry, ReqSuggest } from '@/types/request';
import { ResInquiry, ResSuggest } from '@/types/response';
import FetchClient from '@/utils/FetchClientTS';
import { cError } from '@/utils/test';

const baseURL: string = SETTINGS.API_BASE_URL;
const endpoints: Record<string, string> = {
  inquiry: `${baseURL}/v1/support/inquiry`,
  suggest: `${baseURL}/v1/support/suggest`,
};

// 문의/제보 보내기
export const fetchInquiry = async (inquiryData: ReqInquiry): Promise<ResInquiry> => {
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
export const fetchSuggest = async ({ query, total }: ReqSuggest): Promise<ResSuggest> => {
  try {
    const client = new FetchClient();
    const res = await client.post(endpoints.suggest, { query, total });
    return res;
  } catch (error) {
    cError(error);
    return null;
  }
};
