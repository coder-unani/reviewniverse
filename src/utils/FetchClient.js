import { DEFAULT_REVALIDATE_SEC } from '@/config/constants';
import { SETTINGS } from '@/config/settings';
import { getStorageAccessToken } from '@/utils/formatStorage';

class FetchClient {
  constructor(token = null) {
    this.token = token || getStorageAccessToken();
    this.headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(this.token && { Authorization: `Bearer ${this.token}` }),
    };
    // Next FetchOptions
    this.nextOptions = { revalidate: DEFAULT_REVALIDATE_SEC };
  }

  setHeader(header) {
    Object.assign(this.headers, header);
  }

  unsetHeader(header) {
    delete this.headers[header];
  }

  setNextOptions(nextOptions) {
    if (!nextOptions) return;
    this.nextOptions = { ...this.nextOptions, ...nextOptions };
  }

  setDeviceIdentifierHeader(url) {
    if (url.includes(SETTINGS.API_BASE_URL)) {
      this.setHeader({ 'X-Device-Identifier': SETTINGS.DEVICE_IDENTIFIER });
    }
  }

  async get(url, params = null) {
    try {
      this.setDeviceIdentifierHeader(url);

      const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';

      const options = {
        method: 'GET',
        headers: this.headers,
        next: this.nextOptions,
      };

      const response = await fetch(`${url}${queryString}`, options);
      return FetchClient.responseHandler(response);
    } catch (reason) {
      return FetchClient.errorHandler(reason);
    }
  }

  async post(url, data = null, params = null) {
    try {
      this.setDeviceIdentifierHeader(url);

      const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';

      const response = await fetch(`${url}${queryString}`, {
        method: 'POST',
        headers: this.headers,
        body: data ? JSON.stringify(data) : null,
      });

      return FetchClient.responseHandler(response);
    } catch (reason) {
      return FetchClient.errorHandler(reason);
    }
  }

  async put(url, data = null, isMultiPart = false) {
    try {
      this.setDeviceIdentifierHeader(url);

      // fetch에서는 Content-Type을 지정하면 multipart/form-data로 전송되지 않아
      // multipart/form-data로 전송하려면 Content-Type을 지우고 fetch에 data를 전달해야 함
      if (isMultiPart) {
        this.unsetHeader('Content-Type');
      }

      let body = null;
      if (data) {
        if (isMultiPart) {
          body = data;
        } else {
          body = JSON.stringify(data);
        }
      }

      const response = await fetch(url, {
        method: 'PUT',
        headers: this.headers,
        body,
      });

      return FetchClient.responseHandler(response);
    } catch (reason) {
      return FetchClient.errorHandler(reason);
    }
  }

  async delete(url, data = null) {
    try {
      this.setDeviceIdentifierHeader(url);

      const response = await fetch(url, {
        method: 'DELETE',
        headers: this.headers,
        body: data ? JSON.stringify(data) : null,
      });

      return FetchClient.responseHandler(response);
    } catch (reason) {
      return FetchClient.errorHandler(reason);
    }
  }

  async patch(url, data = null) {
    try {
      this.setDeviceIdentifierHeader(url);

      const response = await fetch(url, {
        method: 'PATCH',
        headers: this.headers,
        body: data ? JSON.stringify(data) : null,
      });

      return FetchClient.responseHandler(response);
    } catch (reason) {
      return FetchClient.errorHandler(reason);
    }
  }

  static async responseHandler(response) {
    let data = null;
    try {
      data = await response.json();
    } catch (error) {
      if (response.status !== 204) {
        return {
          status: response.status,
          code: response.headers.get('code'),
          message: 'An unexpected error occurred.',
          data: null,
        };
      }
    }
    return {
      status: response.status,
      code: response.headers.get('code'),
      message: data?.message,
      data,
    };
  }

  static errorHandler(reason) {
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
