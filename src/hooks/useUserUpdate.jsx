import { useMutation } from '@tanstack/react-query';
import { fetchUserUpdate } from '@/library/api/users';
import { cLog, cError } from '@/utils/test';

export const useUserUpdate = () => {
  return useMutation({
    mutationFn: async (variables) => await fetchUserUpdate(variables),
    onSuccess: (res, variables) => {
      if (res.status === 204) {
        cLog('프로필이 수정되었습니다.');
      } else {
        throw new Error('프로필 수정에 실패했습니다.');
      }
    },
    onError: (error) => {
      cError(error.message);
    },
  });
};
