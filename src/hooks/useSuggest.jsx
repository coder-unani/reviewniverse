import { useMutation } from '@tanstack/react-query';

import { cLog, cError } from '@/utils/test';
import { fetchSuggest } from '@/library/api/support';

export const useSuggest = () => {
  return useMutation({
    mutationFn: (variables) => fetchSuggest(variables),
    onSuccess: (res) => {
      if (res.status === 201) {
        cLog('작품 요청이 성공적으로 전송되었습니다.');
      } else {
        throw new Error('작품 요청에 실패했습니다.');
      }
    },
    onError: (error) => {
      cError(error.message);
    },
  });
};
