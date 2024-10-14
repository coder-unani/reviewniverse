import { useMutation, useQueryClient } from '@tanstack/react-query';

import { cLog, cError } from '@/utils/test';
import { fetchReviewCreate } from '@/library/api/reviews';

export const useReviewCreate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables) => fetchReviewCreate(variables),
    onSuccess: (res, variables) => {
      if (res.status === 201) {
        cLog('리뷰가 등록되었습니다.');

        const { videoId, userId } = variables;

        // videoMyInfo 쿼리 키의 데이터 무효화
        queryClient.invalidateQueries({ queryKey: ['videoMyInfo', { videoId, userId }] });

        // videoReviews 쿼리 키의 데이터 무효화
        queryClient.invalidateQueries({ queryKey: ['videoReviews', videoId], exact: false });

        // userReviews 쿼리 키의 데이터 무효화
        queryClient.invalidateQueries({ queryKey: ['userReviews', userId], exact: false });
      } else {
        throw new Error('리뷰 등록에 실패했습니다.');
      }
    },
    onError: (error) => {
      cError(error.message);
    },
  });
};
