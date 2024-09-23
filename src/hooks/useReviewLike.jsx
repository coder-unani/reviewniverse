import { useMutation, useQueryClient } from '@tanstack/react-query';

import { cLog, cError } from '@/utils/test';
import { fetchReviewLike } from '@/library/api/reviews';

export const useReviewLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (variables) => await fetchReviewLike(variables),
    onSuccess: (res, variables) => {
      if (res.status === 200) {
        cLog('리뷰 좋아요 상태가 변경되었습니다.');

        const likeCount = res.data.data.like_count;
        const isLike = res.data.data.is_like;
        const videoId = variables.videoId;
        const userId = variables.userId;
        const reviewId = variables.reviewId;

        // 응답값: like_count, is_like
        // 1. myInfo: review_like 배열에 해당 review id값 업데이트
        // 2. reviews: 해당 review id값의 like_count 업데이트
        // queryClient.setQueryData(["videoMyInfo", { videoId, userId }], (prev) => {
        //   if (!prev) return prev;
        //   const updatedMyInfo = { ...prev };
        //   if (isLike) {
        //     updatedMyInfo.review_like = [...updatedMyInfo.review_like, reviewId];
        //   } else {
        //     updatedMyInfo.review_like = updatedMyInfo.review_like.filter((id) => id !== reviewId);
        //   }
        //   return updatedMyInfo;
        // });

        // videoReviews 쿼리 키의 데이터 업데이트
        queryClient.setQueriesData({ queryKey: ['videoReviews', videoId], exact: false }, (prev) => {
          if (!prev || !prev.data) return prev;

          let isUpdated = false;
          const updatedReviews = prev.data.data.map((review) => {
            if (review.id === reviewId) {
              isUpdated = true;
              return {
                ...review,
                like_count: likeCount,
                my_info: { is_like: isLike },
              };
            }
            return review;
          });

          if (!isUpdated) return prev;

          return {
            ...prev,
            data: {
              ...prev.data,
              data: updatedReviews,
            },
          };
        });

        // userReviews 쿼리 키의 데이터 업데이트
        queryClient.setQueriesData({ queryKey: ['userReviews', userId], exact: false }, (prev) => {
          if (!prev || !prev.data) return prev;

          let isUpdated = false;
          const updatedReviews = prev.data.data.map((review) => {
            if (review.id === reviewId) {
              isUpdated = true;
              return {
                ...review,
                like_count: likeCount,
                my_info: { is_like: isLike },
              };
            }
            return review;
          });

          if (!isUpdated) return prev;

          return {
            ...prev,
            data: {
              ...prev.data,
              data: updatedReviews,
            },
          };
        });
      } else {
        throw new Error('리뷰 좋아요 상태 변경에 실패했습니다.');
      }
    },
    onError: (error) => {
      cError(error.message);
    },
  });
};
