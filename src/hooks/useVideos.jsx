import { useQuery } from '@tanstack/react-query';

import { fetchVideos } from '@/library/api/videos';

export const useVideos = ({
  page = 1,
  size = 20,
  orderBy = null,
  mode = null,
  code = null,
  by = null,
  terms = null,
  model = null,
  query = null,
  enabled = true,
}) => {
  const STALE_TIME = 1000 * 60 * 5;
  const CACHE_TIME = 1000 * 60 * 30; // 캐시 시간 30분
  const RETRY = 0;
  const queryKey = [
    'videos',
    {
      page,
      size,
      ...(orderBy !== null && { orderBy }),
      ...(mode !== null && { mode }),
      ...(code !== null && { code }),
      ...(by !== null && { by }),
      ...(terms !== null && { terms }),
      ...(model !== null && { model }),
      ...(query !== null && { query }),
    },
  ];

  return useQuery({
    /**
     * queryKey: 캐시 구분을 위한 키
     * queryFn: 비동기 함수
     * staleTime: 캐시 만료 시간 ex. 1000 * 60 * 5 (5분)
     * cacheTime: 캐시 유지 시간 ex. 1000 * 60 * 5 (5분)
     * retry: 재시도 횟수 ex. 1 (1회)
     */
    queryKey,
    queryFn: async () => {
      const res = await fetchVideos({
        page,
        size,
        orderBy,
        mode,
        code,
        by,
        terms,
        model,
        query,
      });
      /**
       * API를 통해 넘겨받은 데이터 가공이 필요하면 여기서 처리
       */
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
    /**
     * .env 로 관리할 필요까지는 없고, config/settings.js 정도에서 관리
     * query별로 캐시전략을 다르게 가져갈 수 있으므로 default 하나 만들고 이 파일 상단에서 상수 선언 후 사용
     * custome 하게 사용할 경우 상수에 settings 값 사용 안하고 지금처럼 처리
     */
    enabled: !!enabled,
    staleTime: STALE_TIME,
    cacheTime: CACHE_TIME,
    retry: RETRY,
  });
};
