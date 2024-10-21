import { useMutation } from '@tanstack/react-query';

import { cLog, cError } from '@/utils/test';
import { fetchVideoExpect } from '@/library/api/videos';

export const useVideoExpect = () => {
  // const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables) => fetchVideoExpect(variables),
    onSuccess: (res) => {
      if (res.status === 200) {
        cLog('비디오 기대돼요 상태가 변경되었습니다.');

        // const { result } = res.data.data;
        // const { videoId, userId } = variables;

        // videoMyInfo 쿼리 키의 데이터 업데이트
        // queryClient.setQueryData(['videoMyInfo', { videoId, userId }], (prev) => ({ ...prev, is_expect: result }));

        // userLikes 쿼리 키의 데이터 무효화
        // queryClient.invalidateQueries({ queryKey: ['userLikes', userId], exact: false });
      } else {
        throw new Error('비디오 기대돼요 상태 변경에 실패했습니다.');
      }
    },
    onError: (error) => {
      cError(error.message);
    },
  });
};
