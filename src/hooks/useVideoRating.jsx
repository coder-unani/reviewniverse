import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchVideoRating } from '@/library/api/videos';
import { cLog, cError } from '@/utils/test';

export const useVideoRating = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (variables) => await fetchVideoRating(variables),
    onSuccess: (res, variables) => {
      if (res.status === 200) {
        cLog('비디오 평가 점수가 변경되었습니다.');
        const rating = res.data.data.rating;
        const ratingAvg = res.data.data.rating_avg;

        // videoDetail 쿼리 키의 데이터를 업데이트
        queryClient.setQueryData(
          ['videoDetail', variables.videoId],
          (prevDetail) => {
            if (!prevDetail) return prevDetail;
            return {
              ...prevDetail,
              data: { ...prevDetail.data, rating: ratingAvg },
            };
          }
        );

        // videoMyInfo 쿼리 키의 데이터를 업데이트
        queryClient.setQueryData(
          [
            'videoMyInfo',
            { videoId: variables.videoId, userId: variables.userId },
          ],
          (prevMyInfo) => {
            if (!prevMyInfo) return prevMyInfo;
            // review 데이터가 있는 경우
            if (prevMyInfo.review && prevMyInfo.review.id) {
              // videoReviews 쿼리 키의 데이터를 업데이트
              queryClient.setQueriesData(
                { queryKey: ['videoReviews', variables.videoId], exact: false },
                (prevReviews) => {
                  const updatedReviews = { ...prevReviews };
                  updatedReviews.data = updatedReviews.data.map((review) =>
                    review.id === prevMyInfo.review.id
                      ? { ...review, rating: rating }
                      : review
                  );
                  return updatedReviews;
                }
              );
            }
            return { ...prevMyInfo, rating: rating };
          }
        );

        // userRatings 쿼리 키의 데이터 무효화
        queryClient.invalidateQueries({
          queryKey: ['userRatings', variables.userId],
          exact: false,
        });
      } else {
        throw new Error('비디오 평가 점수 변경에 실패했습니다.');
      }
    },
    onError: (error) => {
      cError(error);
    },
  });
};
