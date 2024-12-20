import { useMutation } from '@tanstack/react-query';

import { cLog, cError } from '@/utils/test';
import { fetchUserDelete } from '@/library/api/users';

export const useUserDelete = () => {
  return useMutation({
    mutationFn: (variables) => fetchUserDelete(variables),
    onSuccess: (res) => {
      if (res.status === 204) {
        cLog('회원 탈퇴가 완료되었습니다.');
      } else {
        throw new Error('회원 탈퇴에 실패했습니다.');
      }
    },
    onError: (error) => {
      cError(error.message);
    },
  });
};
