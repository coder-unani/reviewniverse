import { useQuery } from '@tanstack/react-query';

import { COLLECTIONS_PAGE_SIZE } from '@/config/constants';
import { fetchCollectionVideos } from '@/library/api/videos';

export const useCollections = ({ page = 1, size = COLLECTIONS_PAGE_SIZE, code = null, enabled = true }) => {
  const STALE_TIME = 1000 * 60 * 5;
  const CACHE_TIME = 1000 * 60 * 30;
  const RETRY = 0;
  const queryKey = ['collections', { page, size, ...(code !== null && { code }) }];

  return useQuery({
    queryKey,
    queryFn: async () => {
      const res = await fetchCollectionVideos({ page, size, code });
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
