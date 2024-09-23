import { useQuery } from '@tanstack/react-query';

import { fetchVideoReviews } from '@/library/api/videos';

// TODO: queryKey page, pageSize 추가

export const useVideoReviews = ({ videoId, page = null, pageSize = null, enabled }) => {
  return useQuery({
    queryKey: [
      'videoReviews',
      videoId,
      {
        ...(page !== null && { page }),
        ...(pageSize !== null && { pageSize }),
      },
    ],
    queryFn: async () => {
      const res = await fetchVideoReviews({ videoId, page, pageSize });
      if (res.status === 200) {
        return {
          status: true,
          code: '',
          data: res.data,
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
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    retry: 0,
  });
};
