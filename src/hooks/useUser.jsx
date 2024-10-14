import { useMutation } from '@tanstack/react-query';

import { cError } from '@/utils/test';
import { fetchUser } from '@/library/api/users';

export const useUser = () => {
  return useMutation({
    mutationFn: async ({ userId }) => {
      try {
        const res = await fetchUser({ userId });
        if (res.status === 200) {
          return {
            status: true,
            code: '',
            data: res.data.user,
          };
        }
        if (res.status === 404 && res.message.detail === 'USER_NOT_FOUND') {
          return {
            status: false,
            code: '회원정보를 찾을 수 없습니다.',
            data: null,
          };
        }
        return {
          status: false,
          code: '회원정보를 가져오는데 실패했습니다.',
          data: null,
        };
      } catch (error) {
        return {
          status: false,
          code: '회원정보를 가져오는데 실패했습니다.',
          data: null,
        };
      }
    },
    onSccess: () => {
      // const userId = variables.userId;
      // if (res.status) {
      //   queryClient.invalidateQueries({
      //     queryKey: ["user", { userId }],
      //   });
      // }
    },
    onError: (error) => {
      cError(error.message);
    },
  });
};
