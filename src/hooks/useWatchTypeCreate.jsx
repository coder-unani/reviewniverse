import { useMutation } from '@tanstack/react-query';

import { cLog, cError } from '@/utils/test';
import { fetchWatchtype } from '@/library/api/users';

export const useWatchtypeCreate = () => {
  return useMutation({
    mutationFn: (variables) => fetchWatchtype(variables),
    onSuccess: (res) => {
      if (res.status === 201) {
        cLog('회원성향이 등록되었습니다.');
      } else {
        throw new Error('회원성향 등록에 실패했습니다.');
      }
    },
    onError: (error) => {
      cError(error.message);
    },
  });
};
