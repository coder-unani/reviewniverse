import { SETTINGS } from '@/config/settings';
import { ResFetchClient, ResFetchClientError } from '@/types/response';
import { getStorageAccessToken } from '@/utils/formatStorage';

class FetchClient {
  private token: string | null;

  private headers: Record<string, string>;

  constructor(token: string | null = null) {
    this.token = token || getStorageAccessToken();
    this.headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(this.token && { Authorization: `Bearer ${this.token}` }),
    };
  }

  // Header 설정
  setHeader(header: Record<string, string>): void {
    Object.assign(this.headers, header);
  }

  // Header 삭제
  unsetHeader(header: string): void {
    delete this.headers[header];
  }

  // 특정 URL에 대해 X-Device-Identifier 설정
  setDeviceIdentifierHeader(url: string): void {
    const deviceIdentifier = SETTINGS.DEVICE_IDENTIFIER;
    const apiBaseUrl = SETTINGS.API_BASE_URL;

    if (deviceIdentifier && apiBaseUrl && url.includes(apiBaseUrl)) {
      this.setHeader({ 'X-Device-Identifier': deviceIdentifier });
    }
  }

  // GET 요청
  async get<T = any>(url: string, params: Record<string, string> | null = null): Promise<ResFetchClient<T>> {
    try {
      this.setDeviceIdentifierHeader(url);

      const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';

      const options: RequestInit = {
        method: 'GET',
        headers: this.headers,
      };

      const response = await fetch(`${url}${queryString}`, options);
      return FetchClient.responseHandler<T>(response);
    } catch (reason) {
      return FetchClient.errorHandler(reason);
    }
  }

  // POST 요청
  async post<T = any>(
    url: string,
    data: any = null,
    params: Record<string, string> | null = null
  ): Promise<ResFetchClient<T>> {
    try {
      this.setDeviceIdentifierHeader(url);

      const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';

      const options: RequestInit = {
        method: 'POST',
        headers: this.headers,
        body: data ? JSON.stringify(data) : null,
      };

      const response = await fetch(`${url}${queryString}`, options);

      return FetchClient.responseHandler<T>(response);
    } catch (reason) {
      return FetchClient.errorHandler(reason);
    }
  }

  // PUT 요청
  async put<T = any>(url: string, data: any = null): Promise<ResFetchClient<T>> {
    try {
      this.setDeviceIdentifierHeader(url);

      const options: RequestInit = {
        method: 'PUT',
        headers: this.headers,
        body: data ? JSON.stringify(data) : null,
      };

      const response = await fetch(url, options);

      return FetchClient.responseHandler<T>(response);
    } catch (reason) {
      return FetchClient.errorHandler(reason);
    }
  }

  // DELETE 요청
  async delete<T = any>(url: string, data: any = null): Promise<ResFetchClient<T>> {
    try {
      this.setDeviceIdentifierHeader(url);

      const options: RequestInit = {
        method: 'DELETE',
        headers: this.headers,
        body: data ? JSON.stringify(data) : null,
      };

      const response = await fetch(url, options);

      return FetchClient.responseHandler<T>(response);
    } catch (reason) {
      return FetchClient.errorHandler(reason);
    }
  }

  // PATCH 요청
  async patch<T = any>(url: string, data: any = null): Promise<ResFetchClient<T>> {
    try {
      this.setDeviceIdentifierHeader(url);

      const options: RequestInit = {
        method: 'PATCH',
        headers: this.headers,
        body: data ? JSON.stringify(data) : null,
      };

      const response = await fetch(url, options);

      return FetchClient.responseHandler<T>(response);
    } catch (reason) {
      return FetchClient.errorHandler(reason);
    }
  }

  // 응답 핸들러
  static async responseHandler<T = any>(response: Response): Promise<ResFetchClient<T>> {
    const data = await response.json();

    return {
      status: response.status,
      code: response.headers.get('code'),
      message: data?.message,
      data,
    };
  }

  // 에러 핸들러
  static errorHandler(reason: any): ResFetchClientError {
    if (reason instanceof TypeError) {
      return {
        status: 500,
        message: 'Network error or bad request. Please try again.',
      };
    }
    if (reason instanceof Response) {
      return {
        status: reason.status,
        message: reason.statusText,
      };
    }
    return {
      status: 500,
      message: 'An unexpected error occurred.',
    };
  }
}

export default FetchClient;
