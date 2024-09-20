import { useMutation, useQueryClient } from '@tanstack/react-query';

import { cLog, cError } from '@/utils/test';
import { fetchReviewCreate } from '@/library/api/reviews';

export const useReviewCreate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (variables) => await fetchReviewCreate(variables),
    onSuccess: (res, variables) => {
      if (res.status === 201) {
        cLog('리뷰가 등록되었습니다.');

        const videoId = variables.videoId;
        const userId = variables.userId;

        queryClient.invalidateQueries({
          queryKey: ['videoMyInfo', { videoId, userId }],
        });

        queryClient.invalidateQueries({
          queryKey: ['videoReviews', videoId],
          exact: false,
        });

        queryClient.invalidateQueries({
          queryKey: ['userReviews', userId],
          exact: false,
        });
      } else {
        throw new Error('리뷰 등록에 실패했습니다.');
      }
    },
    onError: (error) => {
      cError(error.message);
    },
  });
};
