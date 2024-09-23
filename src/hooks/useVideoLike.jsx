import { useMutation, useQueryClient } from '@tanstack/react-query';

import { cLog, cError } from '@/utils/test';
import { fetchVideoLike } from '@/library/api/videos';

export const useVideoLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (variables) => await fetchVideoLike(variables),
    onSuccess: (res, variables) => {
      if (res.status === 200) {
        cLog('비디오 좋아요 상태가 변경되었습니다.');

        const isLike = res.data.data.is_like;
        const videoId = variables.videoId;
        const userId = variables.userId;

        // videoMyInfo 쿼리 키의 데이터 업데이트
        queryClient.setQueryData(['videoMyInfo', { videoId, userId }], (prev) => ({
          ...prev,
          is_like: isLike,
        }));

        // userLikes 쿼리 키의 데이터 무효화
        queryClient.invalidateQueries({
          queryKey: ['userLikes', userId],
          exact: false,
        });
      } else {
        throw new Error('비디오 좋아요 상태 변경에 실패했습니다.');
      }
    },
    onError: (error) => {
      cError(error.message);
    },
  });
};
