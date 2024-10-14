import { useQuery } from '@tanstack/react-query';

import { fetchUserReviews } from '@/library/api/users';

export const useUserReviews = ({ userId, page = null, pageSize = null, orderBy = null, enabled }) => {
  return useQuery({
    queryKey: [
      'userReviews',
      userId,
      {
        ...(page !== null && { page }),
        ...(pageSize !== null && { pageSize }),
        ...(orderBy !== null && { orderBy }),
      },
    ],
    queryFn: async () => {
      const res = await fetchUserReviews({ userId, page, pageSize, orderBy });
      if (res.status === 200) {
        return {
          status: true,
          code: '',
          data: res.data,
        };
      }
      if (res.status === 429) {
        return {
          status: false,
          code: 'C001',
          data: [],
        };
      }
      return {
        status: false,
        code: '사용자 리뷰 리스트를 가져오는데 실패했습니다.',
        data: [],
      };
    },
    enabled: !!enabled,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    retry: 0,
  });
};
