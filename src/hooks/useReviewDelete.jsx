import { useMutation, useQueryClient } from '@tanstack/react-query';

import { cLog, cError } from '@/utils/test';
import { fetchReviewDelete } from '@/library/api/reviews';

export const useReviewDelete = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables) => fetchReviewDelete(variables),
    onSuccess: (res, variables) => {
      if (res.status === 204) {
        cLog('리뷰가 삭제되었습니다.');

        const { videoId, userId } = variables;

        // videoMyInfo 쿼리 키의 데이터 업데이트
        queryClient.setQueryData(['videoMyInfo', { videoId, userId }], (prev) => ({ ...prev, review: {} }));

        // videoReviews 쿼리 키의 데이터 업데이트
        // queryClient.setQueriesData({ queryKey: ['videoReviews', videoId], exact: false }, (prev) => {
        //   if (!prev || !prev.data) return prev;

        //   const { total, data } = prev.data;
        //   const filteredReviews = data.filter((review) => review.id !== reviewId);

        //   if (filteredReviews.length === data.length) return prev;

        //   return { ...prev, data: { ...prev.data, total: total > 0 ? total - 1 : 0, data: filteredReviews } };
        // });

        // videoReviews 쿼리 키의 데이터 무효화
        queryClient.invalidateQueries({ queryKey: ['videoReviews', videoId], exact: false });

        // userReviews 쿼리 키의 데이터 무효화
        queryClient.invalidateQueries({ queryKey: ['userReviews', userId], exact: false });
      } else {
        throw new Error('리뷰 삭제에 실패했습니다.');
      }
    },
    onError: (error) => {
      cError(error.message);
    },
  });
};
