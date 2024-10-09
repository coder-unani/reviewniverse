import { useQuery } from '@tanstack/react-query';

import { fetchUpcomingVideos } from '@/library/api/videos';

export const useUpcomingVideos = ({ page = 1, size = 20, enabled = true }) => {
  const STALE_TIME = 1000 * 60 * 5;
  const CACHE_TIME = 1000 * 60 * 30; // 캐시 시간 30분
  const RETRY = 0;
  const queryKey = [
    'upcomingVideos',
    {
      page,
      size,
    },
  ];

  return useQuery({
    queryKey: queryKey,
    queryFn: async () => {
      const res = await fetchUpcomingVideos({
        page,
        size,
      });
      if (res.status === 200) {
        return {
          status: true,
          code: '',
          data: res.data,
        };
      } else if (res.status === 204) {
        return {
          status: true,
          code: '',
          data: [],
        };
      } else if (res.status === 429) {
        return {
          status: false,
          code: 'C001',
          data: [],
        };
      } else {
        throw new Error('C999');
      }
    },
    enabled: !!enabled,
    staleTime: STALE_TIME,
    cacheTime: CACHE_TIME,
    retry: RETRY,
  });
};
