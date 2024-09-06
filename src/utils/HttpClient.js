import axios from 'axios';
import { getStorageAccessToken } from '@/utils/formatStorage';
import { SETTINGS } from '@/config/settings';

class HttpClient {
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

export default HttpClient;
