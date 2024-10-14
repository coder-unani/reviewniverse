import axios from 'axios';

import { SETTINGS } from '@/config/settings';
import { getStorageAccessToken } from '@/utils/formatStorage';

class AxiosClient {
  client = null;

  constructor(token = null) {
    this.client = axios.create();
    this.client.defaults.headers.common['Content-Type'] = 'application/json';
    this.client.defaults.headers.common.Accept = 'application/json';
    const accessToken = token || getStorageAccessToken();
    if (accessToken) {
      this.client.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
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
        .get(url, { params: params || {} })
        .then((response) => {
          return AxiosClient.responseHandler(response);
        })
        .catch((reason) => {
          return AxiosClient.errorHandler(reason);
        });
    } catch (reason) {
      return AxiosClient.errorHandler(reason);
    }
  }

  async post(url, data = null, params = null) {
    try {
      this.setDeviceIdentifierHeader(url);

      return await this.client
        .post(url, data || {}, params ? { params } : {})
        .then((response) => {
          return AxiosClient.responseHandler(response);
        })
        .catch((reason) => {
          return AxiosClient.errorHandler(reason);
        });
    } catch (reason) {
      return AxiosClient.errorHandler(reason);
    }
  }

  async put(url, data = null) {
    try {
      this.setDeviceIdentifierHeader(url);

      return await this.client
        .put(url, data || {})
        .then((response) => {
          return AxiosClient.responseHandler(response);
        })
        .catch((reason) => {
          return AxiosClient.errorHandler(reason);
        });
    } catch (reason) {
      return AxiosClient.errorHandler(reason);
    }
  }

  async delete(url, data = null) {
    try {
      this.setDeviceIdentifierHeader(url);

      return await this.client
        .delete(url, data || {})
        .then((response) => {
          return AxiosClient.responseHandler(response);
        })
        .catch((reason) => {
          return AxiosClient.errorHandler(reason);
        });
    } catch (reason) {
      return AxiosClient.errorHandler(reason);
    }
  }

  async patch(url, data = null) {
    try {
      this.setDeviceIdentifierHeader(url);

      return await this.client
        .patch(url, data || {})
        .then((response) => {
          return AxiosClient.responseHandler(response);
        })
        .catch((reason) => {
          return AxiosClient.errorHandler(reason);
        });
    } catch (reason) {
      return AxiosClient.errorHandler(reason);
    }
  }

  static responseHandler(response) {
    return {
      status: response.status,
      code: response.headers.code,
      message: response.data?.message,
      data: response.data,
    };
  }

  static errorHandler(reason) {
    if (axios.isAxiosError(reason)) {
      return {
        status: reason.response?.status,
        code: reason.code,
        message: reason.response?.data,
      };
    }
    return {
      status: 500,
      message: '일시적인 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.',
    };
  }
}

export default AxiosClient;
