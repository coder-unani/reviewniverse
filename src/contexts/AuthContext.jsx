'use client';

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { isEmpty } from 'lodash';

import { ENDPOINTS } from '@/config/endpoints';
import { MESSAGES } from '@/config/messages';
import { validateUser } from '@/utils/validation';
import { cError } from '@/utils/test';
import {
  getStorageUser,
  getStorageAccessToken,
  setStorageUser,
  setStorageAccessToken,
  removeStorageUser,
  removeStorageAccessToken,
} from '@/utils/formatStorage';
import { fetchJoin, fetchLogin } from '@/library/api/users';
import { fetchToken } from '@/library/api/token';
import { showInfoToast, showErrorToast } from '@/components/ui/Toast';

const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState(getStorageUser());
  const [snsUser, setSnsUser] = useState(null);

  // 유저정보 저장
  const handleSetUser = ({ _token = null, _user = null }) => {
    try {
      if (_token) {
        setStorageAccessToken(_token);
      }
      if (!isEmpty(_user)) {
        setStorageUser(_user);
        setUser(_user);
      }
      return true;
    } catch (error) {
      cError(error);
      return false;
    }
  };

  // 유저정보 삭제
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

  useEffect(() => {
    const getUser = getStorageUser();
    const accessToken = getStorageAccessToken();
    // TODO: 고도화필요
    // 유저정보가 없거나 토큰이 없을 경우 로그아웃
    if (!getUser || !accessToken) {
      handleRemoveUser();
      return;
    }
    // 토큰검증
    const verifyToken = async () => {
      if (accessToken) {
        const resToken = await fetchToken(accessToken);
        if (resToken.status === 204) {
          // showInfoToast(MESSAGES.T001);
        } else if (handleRemoveUser()) {
          showInfoToast(MESSAGES.T002);
          router.push(ENDPOINTS.USER_LOGIN);
        } else {
          showErrorToast(MESSAGES.T004);
        }
      }
    };
    verifyToken();
  }, [pathname]);

  // 회원가입
  const join = useCallback(async (_user) => {
    try {
      const resUser = validateUser(_user);
      if (!resUser.status) {
        return { status: false, code: resUser.code };
      }

      const resJoin = await fetchJoin(_user);
      if (resJoin.status === 201) {
        return { status: true, code: 'J001' };
      }
      if (resJoin.status === 400) {
        if (resJoin.message.detail === 'EMAIL_ALREADY_EXIST') {
          return { status: false, code: 'J004' };
        }
        return { status: false, code: 'J002' };
      }
      if (resJoin.status === 422) {
        return { status: false, code: 'J003' };
      }
      throw new Error();
    } catch (error) {
      router.push(ENDPOINTS.ERROR);
      return { status: false, code: 'J002' };
    }
  }, []);

  // 로그인
  const login = useCallback(async (_user) => {
    try {
      const resUser = validateUser(_user);
      if (!resUser.status) {
        return { status: false, code: resUser.code };
      }

      const resLogin = await fetchLogin({ user: _user });
      if (resLogin.status === 200) {
        if (
          handleSetUser({
            _token: resLogin.data.access_token,
            _user: resLogin.data.user,
          })
        ) {
          return { status: true, code: 'L001' };
        }
        return { status: false, code: 'L002' };
      }
      if (resLogin.status === 400) {
        if (resLogin.message.detail === 'USER_NOT_FOUND') {
          return { status: false, code: 'L003' };
        }
        return { status: false, code: 'L002' };
      }
      if (resLogin.status === 401) {
        return { status: false, code: 'L002' };
      }
      throw new Error();
    } catch (error) {
      router.push(ENDPOINTS.ERROR);
      return { status: false, code: 'L002' };
    }
  }, []);

  // 로그아웃
  const logout = useCallback(() => {
    if (handleRemoveUser()) {
      return { status: true, code: 'L004' };
    }
    return { status: false, code: 'L005' };
  }, []);

  const values = useMemo(
    () => ({
      user,
      snsUser,
      setSnsUser,
      join,
      login,
      logout,
      handleSetUser,
      handleRemoveUser,
    }),
    [user, snsUser, join, login, logout]
  );

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthContextProvider');
  }
  return context;
};
