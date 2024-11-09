import { useQuery } from '@tanstack/react-query';

import { REVIEWS_PAGE_SIZE } from '@/config/constants';
import { fetchReviews } from '@/library/api/reviews';

export const useReviews = ({ page = 1, size = REVIEWS_PAGE_SIZE, enabled = true }) => {
  const STALE_TIME = 1000 * 60 * 5;
  const CACHE_TIME = 1000 * 60 * 30; // 캐시 시간 30분
  const RETRY = 0;
  const queryKey = ['reviews', { page, size }];

  return useQuery({
    queryKey,
    queryFn: async () => {
      const res = await fetchReviews({ page, size });
      if (res.status === 200) {
        return {
          status: true,
          code: '',
          data: res.data,
        };
      }
      if (res.status === 204) {
        return {
          status: true,
          code: '',
          data: [],
        };
      }
      if (res.status === 429) {
        return {
          status: false,
          code: 'C001',
          data: [],
        };
      }
      throw new Error('C999');
    },
    enabled: !!enabled,
    staleTime: STALE_TIME,
    cacheTime: CACHE_TIME,
    retry: RETRY,
  });
};
