// 작품 요청하기 타입 정의
export interface ISuggestProps {
  query: string;
  total: number;
}

// 제보하기 타입 정의
export interface IReportProps {
  id: number;
  title: string;
}
