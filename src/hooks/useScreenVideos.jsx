import { useQuery } from '@tanstack/react-query';
import { fetchScreenVideos } from '@/library/api/screens';

export const useScreenVideos = ({ code, display = null }) => {
  return useQuery({
    queryKey: ['screenVideos', { code, ...(display !== null && { display }) }],
    queryFn: async () => {
      const res = await fetchScreenVideos({ code, display });
      if (res.status === 200) {
        return {
          status: true,
          code: '',
          data: res.data.data,
        };
      } else {
        return {
          status: false,
          code: '스크린 비디오 정보를 가져오는데 실패했습니다.',
          data: null,
        };
      }
    },
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    retry: 0,
  });
};
