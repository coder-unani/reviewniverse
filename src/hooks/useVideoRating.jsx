import { useMutation, useQueryClient } from '@tanstack/react-query';

import { cLog, cError } from '@/utils/test';
import { fetchVideoRating } from '@/library/api/videos';

export const useVideoRating = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (variables) => await fetchVideoRating(variables),
    onSuccess: (res, variables) => {
      if (res.status === 200) {
        cLog('비디오 평가 점수가 변경되었습니다.');

        const rating = res.data.data.rating;
        const ratingAvg = res.data.data.rating_avg;
        const videoId = variables.videoId;
        const userId = variables.userId;

        // videoDetail 쿼리 키의 데이터 업데이트
        queryClient.setQueryData(['videoDetail', videoId], (prevDetail) => {
          if (!prevDetail || prevDetail.data.rating === ratingAvg) return prevDetail;
          return {
            ...prevDetail,
            data: { ...prevDetail.data, rating: ratingAvg },
          };
        });

        // videoMyInfo 쿼리 키의 데이터 업데이트
        queryClient.setQueryData(['videoMyInfo', { videoId, userId }], (prevMyInfo) => {
          if (!prevMyInfo) return prevMyInfo;

          // review 데이터가 있는 경우
          if (prevMyInfo.review && prevMyInfo.review.id) {
            // videoReviews 쿼리 키의 데이터 업데이트
            queryClient.setQueriesData({ queryKey: ['videoReviews', videoId], exact: false }, (prevReviews) => {
              if (!prevReviews || !prevReviews.data) return prevReviews;

              let isUpdated = false;
              const updatedReviews = prevReviews.data.data.map((review) => {
                if (review.id === prevMyInfo.review.id) {
                  isUpdated = true;
                  return { ...review, rating: rating };
                }
                return review;
              });

              if (!isUpdated) return prevReviews;

              return {
                ...prevReviews,
                data: {
                  ...prevReviews.data,
                  data: updatedReviews,
                },
              };
            });
          }

          if (prevMyInfo.rating === rating) return prevMyInfo;

          return { ...prevMyInfo, rating };
        });

        // userRatings 쿼리 키의 데이터 무효화
        queryClient.invalidateQueries({
          queryKey: ['userRatings', userId],
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
