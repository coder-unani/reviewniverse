import { useMutation } from '@tanstack/react-query';

import { cError } from '@/utils/test';
import { fetchUserMe } from '@/library/api/users';

export const useUserMe = () => {
  return useMutation({
    mutationFn: async () => {
      try {
        const res = await fetchUserMe();
        if (res.status === 200) {
          return {
            status: true,
            code: '',
            data: res.data.user,
          };
        }
        throw new Error('회원정보를 가져오는데 실패했습니다.');
      } catch (error) {
        throw new Error('회원정보를 가져오는데 실패했습니다.');
      }
    },
    onSuccess: () => {},
    onError: (error) => {
      cError(error.message);
    },
  });
};
