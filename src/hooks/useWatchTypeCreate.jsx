import { useMutation } from '@tanstack/react-query';
import { fetchWatchType } from '@/library/api/users';
import { cLog, cError } from '@/utils/test';

export const useWatchTypeCreate = () => {
  return useMutation({
    mutationFn: async (variables) => await fetchWatchType(variables),
    onSuccess: (res, variables) => {
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
