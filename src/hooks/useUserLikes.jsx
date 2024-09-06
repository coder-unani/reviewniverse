import { useQuery } from '@tanstack/react-query';
import { fetchUserLikes } from '@/library/api/users';

export const useUserLikes = ({
  userId,
  page = null,
  pageSize = null,
  orderBy = null,
  enabled,
}) => {
  return useQuery({
    queryKey: [
      'userLikes',
      userId,
      {
        ...(page !== null && { page }),
        ...(pageSize !== null && { pageSize }),
        ...(orderBy !== null && { orderBy }),
      },
    ],
    queryFn: async () => {
      const res = await fetchUserLikes({ userId, page, pageSize, orderBy });
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
        return {
          status: false,
          code: '사용자 비디오 좋아요 리스트를 가져오는데 실패했습니다.',
          data: [],
        };
      }
    },
    enabled: !!enabled,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    retry: 0,
  });
};
