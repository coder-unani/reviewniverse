import axios from 'axios';
import { getStorageAccessToken } from '@/utils/formatStorage';
import { SETTINGS } from '@/config/settings';

class FetchClient {
  token = null;
  headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  constructor(token = null) {
    if (!token && getStorageAccessToken()) {
      token = getStorageAccessToken();
    }
    if (token) {
      this.headers['Authorization'] = `Bearer ${token}`;
    }
  }

  setHeader(header) {
    Object.assign(this.headers, header);
  }

  unsetHeader(header) {
    delete this.headers[header];
  }

  setDeviceIdentifierHeader(url) {
    if (url.includes(SETTINGS.API_BASE_URL)) {
      this.setHeader({ 'X-Device-Identifier': SETTINGS.DEVICE_IDENTIFIER });
    }
  }

  async get(url, params = null, revalidate = null) {
    try {
      this.setDeviceIdentifierHeader(url);

      const queryString = params ? '?' + new URLSearchParams(params).toString() : '';

      const options = {
        method: 'GET',
        headers: this.headers,
      };

      // ISR 적용을 위해 revalidate 옵션을 next에 추가
      if (revalidate !== null) {
        options.next = { revalidate };
      }

      const response = await fetch(`${url}${queryString}`, options);
      return this.responseHandler(response);
    } catch (reason) {
      return this.errorHandler(reason);
    }
  }

  async post(url, data = null, params = null) {
    try {
      this.setDeviceIdentifierHeader(url);

      const queryString = params ? '?' + new URLSearchParams(params).toString() : '';

      const response = await fetch(`${url}${queryString}`, {
        method: 'POST',
        headers: this.headers,
        body: data ? JSON.stringify(data) : null,
      });

      return this.responseHandler(response);
    } catch (reason) {
      return this.errorHandler(reason);
    }
  }

  async put(url, data = null) {
    try {
      this.setDeviceIdentifierHeader(url);

      const response = await fetch(url, {
        method: 'PUT',
        headers: this.headers,
        body: data ? JSON.stringify(data) : null,
      });

      return this.responseHandler(response);
    } catch (reason) {
      return this.errorHandler(reason);
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

      return this.responseHandler(response);
    } catch (reason) {
      return this.errorHandler(reason);
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

      return this.responseHandler(response);
    } catch (reason) {
      return this.errorHandler(reason);
    }
  }

  async responseHandler(response) {
    const data = await response.json();

    return {
      status: response.status,
      code: response.headers.get('code'),
      message: data?.message,
      data: data,
    };
  }

  errorHandler(reason) {
    if (reason instanceof TypeError) {
      return {
        status: 500,
        message: 'Network error or bad request. Please try again.',
      };
    } else if (reason instanceof Response) {
      return {
        status: reason.status,
        message: reason.statusText,
      };
    } else {
      return {
        status: 500,
        message: 'An unexpected error occurred.',
      };
    }
  }
}

class AxiosClient {
  client = null;

  constructor(token = null) {
    this.client = axios.create();
    this.client.defaults.headers.common['Content-Type'] = 'application/json';
    this.client.defaults.headers.common['Accept'] = 'application/json';
    if (!token && getStorageAccessToken()) {
      token = getStorageAccessToken();
    }
    if (token) {
      this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }

  setHeader(header) {
    Object.assign(this.client.defaults.headers.common, header);
  }

  unsetHeader(header) {
    delete this.client.defaults.headers.common[header];
  }

  setDeviceIdentifierHeader(url) {
    if (url.includes(SETTINGS.API_BASE_URL)) {
      this.setHeader({ 'X-Device-Identifier': SETTINGS.DEVICE_IDENTIFIER });
    }
  }

  async get(url, params = null) {
    try {
      this.setDeviceIdentifierHeader(url);

      return await this.client
        .get(url, { params: params ? params : {} })
        .then((response) => {
          return this.responseHandler(response);
        })
        .catch((reason) => {
          return this.errorHandler(reason);
        });
    } catch (reason) {
      return this.errorHandler(reason);
    }
  }

  async post(url, data = null, params = null) {
    try {
      this.setDeviceIdentifierHeader(url);

      return await this.client
        .post(url, data ? data : {}, params ? { params } : {})
        .then((response) => {
          return this.responseHandler(response);
        })
        .catch((reason) => {
          return this.errorHandler(reason);
        });
    } catch (reason) {
      return this.errorHandler(reason);
    }
  }

  async put(url, data = null) {
    try {
      this.setDeviceIdentifierHeader(url);

      return await this.client
        .put(url, data ? data : {})
        .then((response) => {
          return this.responseHandler(response);
        })
        .catch((reason) => {
          return this.errorHandler(reason);
        });
    } catch (reason) {
      return this.errorHandler(reason);
    }
  }

  async delete(url, data = null) {
    try {
      this.setDeviceIdentifierHeader(url);

      return await this.client
        .delete(url, data ? data : {})
        .then((response) => {
          return this.responseHandler(response);
        })
        .catch((reason) => {
          return this.errorHandler(reason);
        });
    } catch (reason) {
      return this.errorHandler(reason);
    }
  }

  async patch(url, data = null) {
    try {
      this.setDeviceIdentifierHeader(url);

      return await this.client
        .patch(url, data ? data : {})
        .then((response) => {
          return this.responseHandler(response);
        })
        .catch((reason) => {
          return this.errorHandler(reason);
        });
    } catch (reason) {
      return this.errorHandler(reason);
    }
  }

  responseHandler(response) {
    return {
      status: response.status,
      code: response.headers.code,
      message: response.data?.message,
      data: response.data,
    };
  }

  errorHandler(reason) {
    if (axios.isAxiosError(reason)) {
      return {
        status: reason.response?.status,
        code: reason.code,
        message: reason.response?.data,
      };
    } else {
      return {
        status: 500,
        message: '일시적인 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.',
      };
    }
  }
}

export { FetchClient, AxiosClient };
