// null 허용 타입 정의
export type Nullable<T> = T | null;

// FetchClient 응답 타입 정의
export interface ResFetchClient<T = any> {
  status: number;
  code?: string | null;
  message?: string | null;
  data?: T;
}

// FetchClient 에러 응답 타입 정의
export interface ResFetchClientError {
  status: number;
  message: string;
}

// Status 응답 타입 정의
export interface ResStauts {
  status: number;
}

// Inquiry 응답 타입 정의
export type ResInquiry = Nullable<ResStauts>;

// Suggest 응답 타입 정의
export type ResSuggest = Nullable<ResStauts>;
