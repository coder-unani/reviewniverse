import { useQuery } from '@tanstack/react-query';

import { fetchVideoReviews } from '@/library/api/videos';

// TODO: queryKey page, size 추가

export const useVideoReviews = ({ videoId, page = null, size = null, metadata = null, enabled }) => {
  return useQuery({
    queryKey: [
      'videoReviews',
      videoId,
      {
        ...(page !== null && { page }),
        ...(size !== null && { size }),
        ...(metadata !== null && { metadata }),
      },
    ],
    queryFn: async () => {
      const res = await fetchVideoReviews({ videoId, page, size, metadata });
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
      throw new Error('C999');
    },
    enabled: !!enabled,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    retry: 0,
  });
};
