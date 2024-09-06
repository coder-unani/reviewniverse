import { useQuery } from '@tanstack/react-query';
import { fetchVideoDetail } from '@/library/api/videos';

export const useVideoDetail = ({ videoId, enabled }) => {
  return useQuery({
    queryKey: ['videoDetail', videoId],
    queryFn: async () => {
      const res = await fetchVideoDetail({ videoId });
      if (res.status === 200) {
        return {
          status: true,
          code: '',
          data: res.data.data,
        };
      } else if (res.status === 404) {
        throw new Error('C003');
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
