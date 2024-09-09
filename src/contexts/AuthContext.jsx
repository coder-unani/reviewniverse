'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { fetchJoin, fetchLogin } from '@/library/api/users';
import { fetchToken } from '@/library/api/token';
import {
  showInfoToast,
  showSuccessToast,
  showErrorToast,
} from '@/components/ui/Toast';
import { MESSAGES } from '@/config/messages';
import { ENDPOINTS } from '@/config/endpoints';
import {
  getStorageUser,
  getStorageAccessToken,
  setStorageUser,
  setStorageAccessToken,
  removeStorageUser,
  removeStorageAccessToken,
} from '@/utils/formatStorage';
import { validateUser } from '@/utils/validation';
import { cLog, cError } from '@/utils/test';
import { isEmpty } from 'lodash';

const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState(getStorageUser());
  const [snsUser, setSnsUser] = useState(null);

  useEffect(() => {
    const getUser = getStorageUser();
    const access_token = getStorageAccessToken();
    // TODO: 고도화필요
    if (!getUser || !access_token) {
      handleRemoveUser();
      return;
    }
    // 토큰검증
    const verifyToken = async () => {
      if (access_token) {
        const res = await fetchToken(access_token);
        if (res.status === 204) {
          // showInfoToast(MESSAGES.T001);
        } else {
          if (handleRemoveUser()) {
            showInfoToast(MESSAGES.T002);
            router.push(ENDPOINTS.USER_LOGIN);
          } else {
            showErrorToast(MESSAGES.T004);
          }
        }
      }
    };
    verifyToken();
  }, [pathname]);

  // 회원가입
  const join = async (user) => {
    try {
      const result = validateUser(user);
      if (!result.status) {
        return {
          status: false,
          code: result.code,
        };
      }

      const res = await fetchJoin(user);
      if (res.status === 201) {
        return {
          status: true,
          code: 'J001',
        };
      } else if (res.status === 400) {
        if (res.message.detail === 'EMAIL_ALREADY_EXIST') {
          return {
            status: false,
            code: 'J004',
          };
        } else {
          return {
            status: false,
            code: 'J002',
          };
        }
      } else if (res.status === 422) {
        return {
          status: false,
          code: 'J003',
        };
      } else {
        return {
          status: false,
          code: 'J002',
        };
      }
    } catch (error) {
      router.push(ENDPOINTS.ERROR);
    }
  };

  // 로그인
  const login = async (user) => {
    try {
      const result = validateUser(user);
      if (!result.status) {
        return {
          status: false,
          code: result.code,
        };
      }

      const res = await fetchLogin({ user });
      if (res.status === 200) {
        if (
          handleSetUser({
            accessToken: res.data.access_token,
            user: res.data.user,
          })
        ) {
          return {
            status: true,
            code: 'L001',
          };
        } else {
          return {
            status: false,
            code: 'L002',
          };
        }
      } else if (res.status === 400) {
        if (res.message.detail === 'USER_NOT_FOUND') {
          return {
            status: false,
            code: 'L003',
          };
        } else {
          return {
            status: false,
            code: 'L002',
          };
        }
      } else if (res.status === 401) {
        return {
          status: false,
          code: 'L002',
        };
      } else {
        router.push(ENDPOINTS.ERROR);
      }
    } catch (error) {
      router.push(ENDPOINTS.ERROR);
    }
  };

  // 로그아웃
  const logout = () => {
    if (handleRemoveUser()) {
      return {
        status: true,
        code: 'L004',
      };
    } else {
      return {
        status: false,
        code: 'L005',
      };
    }
  };

  const handleSetUser = ({ accessToken = null, user = null }) => {
    try {
      if (accessToken) {
        setStorageAccessToken(accessToken);
      }
      if (!isEmpty(user)) {
        setStorageUser(user);
        setUser(user);
      }
      return true;
    } catch (error) {
      cError(error);
      return false;
    }
  };

  const handleRemoveUser = () => {
    try {
      removeStorageAccessToken();
      removeStorageUser();
      setUser(null);
      return true;
    } catch (error) {
      cError(error);
      return false;
    }
  };

  const values = {
    user,
    snsUser,
    setSnsUser,
    join,
    login,
    logout,
    handleSetUser,
    handleRemoveUser,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      'useAuthContext must be used within an AuthContextProvider'
    );
  }
  return context;
};
