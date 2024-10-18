import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { cLog, cError } from '@/utils/test';
import { ReqInquiry } from '@/types/request';
import { ResInquiry } from '@/types/response';
import { fetchInquiry } from '@/library/api/support';

export const useInquiry = (): UseMutationResult<ResInquiry, Error, ReqInquiry> => {
  return useMutation<ResInquiry, Error, ReqInquiry>({
    mutationFn: (variables: ReqInquiry) => fetchInquiry(variables),
    onSuccess: (res: ResInquiry) => {
      if (res && res.status === 201) {
        cLog('문의/제보가 성공적으로 전송되었습니다.');
      } else {
        throw new Error('문의/제보 전송에 실패했습니다.');
      }
    },
    onError: (error: Error) => {
      cError(error.message);
    },
  });
};
