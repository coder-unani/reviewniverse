import { useMutation } from '@tanstack/react-query';
import { fetchUser } from '@/library/api/users';
import { cLog, cError } from '@/utils/test';

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
        } else if (res.status === 404) {
          if (res.message.detail === 'USER_NOT_FOUND') {
            return {
              status: false,
              code: '회원정보를 찾을 수 없습니다.',
              data: null,
            };
          } else {
            return {
              status: false,
              code: '회원정보를 가져오는데 실패했습니다.',
              data: null,
            };
          }
        } else {
          return {
            status: false,
            code: '회원정보를 가져오는데 실패했습니다.',
            data: null,
          };
        }
      } catch (error) {
        return {
          status: false,
          code: '회원정보를 가져오는데 실패했습니다.',
          data: null,
        };
      }
    },
    onSccess: (res, variables) => {
      // if (res.status) {
      //   queryClient.invalidateQueries({
      //     queryKey: ["user", { userId: variables.userId }],
      //   });
      // }
    },
    onError: (error) => {
      cError(error.message);
    },
  });
};
