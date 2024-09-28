import { useMutation, useQueryClient } from '@tanstack/react-query';

import { cLog, cError } from '@/utils/test';
import { fetchReviewUpdate } from '@/library/api/reviews';

export const useReviewUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (variables) => await fetchReviewUpdate(variables),
    onSuccess: (res, variables) => {
      if (res.status === 204) {
        cLog('리뷰가 수정되었습니다.');

        const videoId = variables.videoId;
        const userId = variables.userId;

        // videoMyInfo 쿼리 키의 데이터 무효화
        queryClient.invalidateQueries({
          queryKey: ['videoMyInfo', { videoId, userId }],
        });

        // videoReviews 쿼리 키의 데이터 무효화
        queryClient.invalidateQueries({
          queryKey: ['videoReviews', videoId],
          exact: false,
        });

        // userReviews 쿼리 키의 데이터 무효화
        queryClient.invalidateQueries({
          queryKey: ['userReviews', userId],
          exact: false,
        });
      } else {
        throw new Error('리뷰 수정에 실패했습니다.');
      }
    },
    onError: (error) => {
      cError(error.message);
    },
  });
};
