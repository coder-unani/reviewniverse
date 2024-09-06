import { useMutation } from '@tanstack/react-query';
import { fetchValidateNickname } from '@/library/api/users';
import { cLog, cError } from '@/utils/test';

export const useValidateNickname = () => {
  return useMutation({
    mutationFn: async (variables) => await fetchValidateNickname(variables),
    onSuccess: (res, variables) => {
      if (res.status === 200) {
        cLog('닉네임 중복검사가 완료되었습니다.');
      } else {
        throw new Error('닉네임 중복검사에 실패했습니다.');
      }
    },
    onError: (error) => {
      cError(error.message);
    },
  });
};
