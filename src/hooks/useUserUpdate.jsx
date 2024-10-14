import { useMutation } from '@tanstack/react-query';

import { cLog, cError } from '@/utils/test';
import { fetchUserUpdate } from '@/library/api/users';

export const useUserUpdate = () => {
  return useMutation({
    mutationFn: (variables) => fetchUserUpdate(variables),
    onSuccess: (res) => {
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
