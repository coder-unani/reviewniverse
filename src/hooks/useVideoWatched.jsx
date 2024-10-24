import { useMutation, useQueryClient } from '@tanstack/react-query';

import { VIDEO_WATCHED_CODE } from '@/config/codes';
import { cLog, cError } from '@/utils/test';
import { fetchVideoWatched } from '@/library/api/videos';

export const useVideoWatched = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables) => fetchVideoWatched(variables),
    onSuccess: (res, variables) => {
      if (res.status === 200) {
        cLog('비디오 봤어요 상태가 변경되었습니다.');

        const { status } = res.data.data;
        const { videoId, userId } = variables;
        // 봤어요 코드인지 확인
        const isWatched = status === VIDEO_WATCHED_CODE;

        // videoMyInfo 쿼리 키의 데이터 업데이트
        queryClient.setQueryData(['videoMyInfo', { videoId, userId }], (prev) => ({
          ...prev,
          watched: isWatched,
          expect: isWatched ? false : prev.expect, // 봤어요 상태가 true일 경우 기대돼요 상태는 false로 변경
        }));

        // userLikes 쿼리 키의 데이터 무효화
        // queryClient.invalidateQueries({ queryKey: ['userLikes', userId], exact: false });
      } else {
        throw new Error('비디오 봤어요 상태 변경에 실패했습니다.');
      }
    },
    onError: (error) => {
      cError(error.message);
    },
  });
};
