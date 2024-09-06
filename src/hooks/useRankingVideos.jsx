import { useQuery } from '@tanstack/react-query';
import { fetchRankingVideos } from '@/library/api/ranking';

export const useRankingVideos = ({ code, count }) => {
  return useQuery({
    queryKey: ['rankingVideos', { code, count }],
    queryFn: async () => {
      const res = await fetchRankingVideos({ code, count });
      if (res.status === 200) {
        return {
          status: true,
          code: '',
          data: res.data.data,
        };
      } else {
        return {
          status: false,
          code: '랭킹 비디오 정보를 가져오는데 실패했습니다.',
          data: null,
        };
      }
    },
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    retry: 0,
  });
};
