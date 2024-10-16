import { useMutation } from '@tanstack/react-query';

import { cLog, cError } from '@/utils/test';
import { fetchUser } from '@/library/api/users';

export const useUser = () => {
  return useMutation({
    mutationFn: (variables) => fetchUser(variables),
    onSccess: (res) => {
      if (res.status === 200) {
        cLog('회원정보를 가져오는데 성공했습니다.');
        // const userId = variables.userId;
        // queryClient.invalidateQueries({ queryKey: ["user", { userId }] });
      } else {
        throw new Error('회원정보를 가져오는데 실패했습니다.');
      }
    },
    onError: (error) => {
      cError(error.message);
    },
  });
};
