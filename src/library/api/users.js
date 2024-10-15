import { SETTINGS } from '@/config/settings';
import AxiosClient from '@/utils/AxiosClient';
import { cError } from '@/utils/test';

const baseURL = SETTINGS.API_BASE_URL;
const endpoints = {
  login: `${baseURL}/v1/users/login`,
  join: `${baseURL}/v1/users`,
  watchType: `${baseURL}/v1/users/:userId/watchtype`,
  user: `${baseURL}/v1/users/:userId`,
  userMe: `${baseURL}/v1/users/me`,
  validateEmail: `${baseURL}/v1/users/validate/email`,
  validateNickname: `${baseURL}/v1/users/validate/nickname`,
  userReviews: `${baseURL}/v1/users/:userId/reviews`,
  userReviewLikes: `${baseURL}/v1/users/:userId/reviews/likes`,
  userRatings: `${baseURL}/v1/users/:userId/videos/ratings`,
  userLikes: `${baseURL}/v1/users/:userId/videos/likes`,
};

// 로그인
export const fetchLogin = async ({ user }) => {
  try {
    const client = new AxiosClient();
    const res = await client.post(endpoints.login, {
      code: user.code,
      email: user.email,
      ...(user.password && { password: user.password }),
      ...(user.sns_id && { sns_id: user.sns_id }),
    });
    return res;
  } catch (error) {
    cError(error);
    return null;
  }
};

// 회원가입
export const fetchJoin = async (user) => {
  try {
    const client = new AxiosClient();
    const res = await client.post(endpoints.join, { ...user });
    return res;
  } catch (error) {
    cError(error);
    return null;
  }
};

// 회원성향 등록
export const fetchWatchtype = async ({ userId, watchtype }) => {
  try {
    const client = new AxiosClient();
    const res = await client.post(endpoints.watchType.replace(':userId', userId), {}, { watch_type: watchtype });
    return res;
  } catch (error) {
    cError(error);
    return null;
  }
};

// 회원정보 조회
export const fetchUser = async ({ userId }) => {
  try {
    const client = new AxiosClient();
    const res = await client.get(endpoints.user.replace(':userId', userId));
    return res;
  } catch (error) {
    cError(error);
    return null;
  }
};

// 내 회원정보 조회
export const fetchUserMe = async () => {
  try {
    const client = new AxiosClient();
    const res = await client.get(endpoints.userMe);
    return res;
  } catch (error) {
    cError(error);
    return null;
  }
};

// 회원정보 수정
export const fetchUserUpdate = async ({ userId, updateData }) => {
  try {
    const client = new AxiosClient();
    client.setHeader({ 'Content-Type': 'multipart/form-data' });
    const res = await client.put(endpoints.user.replace(':userId', userId), updateData);
    return res;
  } catch (error) {
    cError(error);
    return null;
  }
};

// 회원탈퇴
export const fetchUserDelete = async ({ userId }) => {
  try {
    const client = new AxiosClient();
    const res = await client.delete(endpoints.user.replace(':userId', userId));
    return res;
  } catch (error) {
    cError(error);
    return null;
  }
};

// 이메일 유효성 검사
export const fetchValidateEmail = async ({ email }) => {
  try {
    const client = new AxiosClient();
    const res = await client.get(endpoints.validateEmail, { email });
    return res;
  } catch (error) {
    cError(error);
    return null;
  }
};

// 닉네임 유효성 검사
export const fetchValidateNickname = async ({ nickname }) => {
  try {
    const client = new AxiosClient();
    const res = await client.get(endpoints.validateNickname, { nickname });
    return res;
  } catch (error) {
    cError(error);
    return null;
  }
};

// 사용자 리뷰 리스트
export const fetchUserReviews = async ({ userId, page = null, pageSize = null, orderBy = null }) => {
  try {
    const client = new AxiosClient();
    const res = await client.get(endpoints.userReviews.replace(':userId', userId), {
      ...(page && { page }),
      ...(pageSize && { page_size: pageSize }),
      ...(orderBy && { order_by: orderBy }),
    });
    return res;
  } catch (error) {
    cError(error);
    return null;
  }
};

// 사용자 리뷰 좋아요 리스트
export const fetchUserReviewLikes = async ({ userId, page = null, pageSize = null, orderBy = null }) => {
  try {
    const client = new AxiosClient();
    const res = await client.get(endpoints.userReviewLikes.replace(':userId', userId), {
      ...(page && { page }),
      ...(pageSize && { page_size: pageSize }),
      ...(orderBy && { order_by: orderBy }),
    });
    return res;
  } catch (error) {
    cError(error);
    return null;
  }
};

// 사용자 비디오 좋아요 리스트
export const fetchUserLikes = async ({ userId, page = null, pageSize = null, orderBy = null }) => {
  try {
    const client = new AxiosClient();
    const res = await client.get(endpoints.userLikes.replace(':userId', userId), {
      ...(page && { page }),
      ...(pageSize && { page_size: pageSize }),
      ...(orderBy && { order_by: orderBy }),
    });
    return res;
  } catch (error) {
    cError(error);
    return null;
  }
};

// 사용자 비디오 평점 리스트
export const fetchUserRatings = async ({ userId, page = null, pageSize = null, orderBy = null }) => {
  try {
    const client = new AxiosClient();
    const res = await client.get(endpoints.userRatings.replace(':userId', userId), {
      ...(page && { page }),
      ...(pageSize && { page_size: pageSize }),
      ...(orderBy && { order_by: orderBy }),
    });
    return res;
  } catch (error) {
    cError(error);
    return null;
  }
};
