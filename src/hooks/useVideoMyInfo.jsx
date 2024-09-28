import { useQuery } from '@tanstack/react-query';

import { fetchVideoMyInfo } from '@/library/api/videos';

export const useVideoMyInfo = ({ videoId, userId, enabled }) => {
  return useQuery({
    queryKey: ['videoMyInfo', { videoId, userId }],
    queryFn: async () => {
      const res = await fetchVideoMyInfo({ videoId });
      return res.status === 200 ? res.data.data : null;
      // TODO: res.status === 400 && res.message.detail === "ACCESS_TOKEN_NOT_FOUND" 에러 처리
    },
    enabled: !!enabled,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    retry: 0,
  });
};
