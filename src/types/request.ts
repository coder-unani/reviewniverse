export interface ReqInquiry {
  topic: string;
  title: string;
  content: string;
  email: string;
  is_agree_provide_email: boolean;
}

export interface ReqSuggest {
  query: string;
  total: number;
}
