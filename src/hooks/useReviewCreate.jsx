import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchReviewCreate } from '@/library/api/reviews';
import { cLog, cError } from '@/utils/test';

export const useReviewCreate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (variables) => await fetchReviewCreate(variables),
    onSuccess: (res, variables) => {
      if (res.status === 201) {
        cLog('리뷰가 등록되었습니다.');
        queryClient.invalidateQueries({
          queryKey: [
            'videoMyInfo',
            { videoId: variables.videoId, userId: variables.userId },
          ],
        });

        queryClient.invalidateQueries({
          queryKey: ['videoReviews', variables.videoId],
          exact: false,
        });

        queryClient.invalidateQueries({
          queryKey: ['userReviews', variables.userId],
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
