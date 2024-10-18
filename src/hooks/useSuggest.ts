import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { cLog, cError } from '@/utils/test';
import { ReqSuggest } from '@/types/request';
import { ResSuggest } from '@/types/response';
import { fetchSuggest } from '@/library/api/support';

// UseMutationResult<ResSuggest, Error, ReqSuggest>
// ResSuggest는 성공 시 반환되는 데이터, Error는 에러 타입, ReqSuggest는 mutationFn이 사용하는 변수 타입

export const useSuggest = (): UseMutationResult<ResSuggest, Error, ReqSuggest> => {
  return useMutation<ResSuggest, Error, ReqSuggest>({
    mutationFn: (variables: ReqSuggest) => fetchSuggest(variables),
    onSuccess: (res: ResSuggest) => {
      if (res && res.status === 201) {
        cLog('작품 요청이 성공적으로 전송되었습니다.');
      } else {
        throw new Error('작품 요청에 실패했습니다.');
      }
    },
    onError: (error: Error) => {
      cError(error.message);
    },
  });
};
