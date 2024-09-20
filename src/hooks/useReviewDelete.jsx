import { useMutation, useQueryClient } from '@tanstack/react-query';

import { cLog, cError } from '@/utils/test';
import { fetchReviewDelete } from '@/library/api/reviews';

export const useReviewDelete = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (variables) => await fetchReviewDelete(variables),
    onSuccess: (res, variables) => {
      if (res.status === 204) {
        cLog('리뷰가 삭제되었습니다.');
        const videoId = variables.videoId;
        const userId = variables.userId;
        const reviewId = variables.reviewId;

        queryClient.setQueryData(['videoMyInfo', { videoId, userId }], (prev) => ({
          ...prev,
          review: {},
        }));

        queryClient.setQueriesData({ queryKey: ['videoReviews', videoId], exact: false }, (prev) => {
          if (!prev) return prev;
          const updatedReviews = { ...prev };
          updatedReviews.total = updatedReviews.total > 0 ? updatedReviews.total - 1 : 0;
          updatedReviews.data = updatedReviews.data.filter((review) => review.id !== reviewId);
          return updatedReviews;
        });

        queryClient.invalidateQueries({
          queryKey: ['userReviews', userId],
          exact: false,
        });
      } else {
        throw new Error('리뷰 삭제에 실패했습니다.');
      }
    },
    onError: (error) => {
      cError(error.message);
    },
  });
};
