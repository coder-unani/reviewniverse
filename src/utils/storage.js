import Cookies from 'js-cookie';
import { SETTINGS } from '@/config/settings';
import { ENDPOINTS } from '@/config/endpoints';

const domain = SETTINGS.COOKIE_DOMAIN;
const isLocalhost = domain.includes('localhost');

// 브라우저 환경인지 확인하는 함수
export const isBrowser = () => typeof window !== 'undefined';

// 로컬 스토리지 설정
export const setLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (e) {
    if (isBrowser()) {
      window.location.href = ENDPOINTS.ERROR;
    }
  }
};

// 로컬 스토리지 가져오기
export const getLocalStorage = (key) => {
  try {
    let data = localStorage.getItem(key);
    return data;
  } catch (e) {
    if (isBrowser()) {
      window.location.href = ENDPOINTS.ERROR;
    }
  }
};

// 로컬 스토리지 삭제
export const removeLocalStorage = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (e) {
    if (isBrowser()) {
      window.location.href = ENDPOINTS.ERROR;
    }
  }
};

// 세션 스토리지 설정
export const setSessionStorage = (key, value) => {
  try {
    sessionStorage.setItem(key, value);
    return true;
  } catch (e) {
    if (isBrowser()) {
      window.location.href = ENDPOINTS.ERROR;
    }
  }
};

// 세션 스토리지 가져오기
export const getSessionStorage = (key) => {
  try {
    let data = sessionStorage.getItem(key);
    return data;
  } catch (e) {
    if (isBrowser()) {
      window.location.href = ENDPOINTS.ERROR;
    }
  }
};

// 세션 스토리지 삭제
export const removeSessionStorage = (key) => {
  try {
    sessionStorage.removeItem(key);
    return true;
  } catch (e) {
    if (isBrowser()) {
      window.location.href = ENDPOINTS.ERROR;
    }
  }
};

// 쿠키 설정
export const setCookie = (name, value, options = {}) => {
  try {
    const cookieOptions = {
      secure: !isLocalhost,
      sameSite: 'Strict',
      domain,
      ...options,
    };
    Cookies.set(name, value, cookieOptions);
    return true;
  } catch (e) {
    if (isBrowser()) {
      window.location.href = ENDPOINTS.ERROR;
    }
  }
};

// 쿠키 가져오기
export const getCookie = (name) => {
  try {
    return Cookies.get(name);
  } catch (e) {
    if (isBrowser()) {
      window.location.href = ENDPOINTS.ERROR;
    }
  }
};

// 쿠키 삭제
export const removeCookie = (name, options = {}) => {
  try {
    Cookies.remove(name, { sameSite: 'Strict', domain, ...options });
    return true;
  } catch (e) {
    if (isBrowser()) {
      window.location.href = ENDPOINTS.ERROR;
    }
  }
};
