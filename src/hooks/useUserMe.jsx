import { useMutation } from '@tanstack/react-query';

import { cLog, cError } from '@/utils/test';
import { fetchUserMe } from '@/library/api/users';

export const useUserMe = () => {
  return useMutation({
    mutationFn: () => fetchUserMe(),
    onSuccess: (res) => {
      if (res.status === 200) {
        cLog('회원정보를 조회했습니다.');
      } else {
        throw new Error('회원정보를 가져오는데 실패했습니다.');
      }
    },
    onError: (error) => {
      cError(error.message);
    },
  });
};
