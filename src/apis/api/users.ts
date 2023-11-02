import { client } from "../client";
import { ErrorMsg } from "@apis/utils/error";
import { UserLoginData, UserRegisterData } from "@type/user";

/**
 * 로그인 API
 * @param {UserLoginData} userData 로그인시 필요한 데이터 폼
 * @returns 성공 여부
 */
export const login = async (userData: UserLoginData) => {
  try {
    const res = await client.post(`/user/login`, userData);
    return res.data;
  } catch (err) {
    throw ErrorMsg(err);
  }
};

/**
 * 로그아웃
 * (자동 로그인 방지를 위해 세션 및 쿠키 삭제 진행함)
 * @returns 성공 여부
 */
export const logout = async () => {
  try {
    const res = await client.post(`/user/logout`);
    return res.data;
  } catch (err) {
    throw ErrorMsg(err);
  }
};

/**
 * 회원가입
 * @param {UserRegisterData} userData 회원가입시 필요한 데이터 폼
 * @returns 성공 여부
 */
export const register = async (userData: UserRegisterData) => {
  try {
    const res = await client.post(`/user/register`, userData);
    return res.data;
  } catch (err) {
    throw ErrorMsg(err);
  }
};

/**
 * 유저 기본정보
 * @param {string} user_id user 아이디
 * @returns 성공 여부
 */
export const getUser = async (user_id: string) => {
  try {
    const res = await client.get(`/user/${user_id}`);
    return res.data;
  } catch (err) {
    throw ErrorMsg(err);
  }
};

/**
 * 유저의 작성 voice 목록들
 * @param {string} user_id user 아이디
 * @returns 성공 여부
 */
export const getUserVoices = async (user_id: string) => {
  try {
    const res = await client.get(`/user/${user_id}/voices`);
    return res.data;
  } catch (err) {
    throw ErrorMsg(err);
  }
};

/**
 * 유저의 작성 post 목록들
 * @param {string} user_id user 아이디
 * @returns 성공 여부
 */
export const getUserPosts = async (user_id: string) => {
  try {
    const res = await client.get(`/user/${user_id}/posts`);
    return res.data;
  } catch (err) {
    throw ErrorMsg(err);
  }
};

/**
 * 유저의 follower 목록들
 * @param {string} user_id user 아이디
 * @returns 성공 여부
 */
export const getUserFollowers = async (user_id: string) => {
  try {
    const res = await client.get(`/user/${user_id}/followers`);
    return res.data;
  } catch (err) {
    throw ErrorMsg(err);
  }
};

/**
 * 유저의 following 목록들
 * @param {string} user_id user 아이디
 * @returns 성공 여부
 */
export const getUserFollowings = async (user_id: string) => {
  try {
    const res = await client.get(`/user/${user_id}/followings`);
    return res.data;
  } catch (err) {
    throw ErrorMsg(err);
  }
};

/**
 * 유저가 좋아요한 voices 목록들
 * @param {string} user_id user 아이디
 * @returns 성공 여부
 */
export const getUserLikeVoices = async (user_id: string) => {
  try {
    const res = await client.get(`/user/${user_id}/like_voices`);
    return res.data;
  } catch (err) {
    throw ErrorMsg(err);
  }
};

/**
 * 유저가 좋아요한 post 목록들
 * @param {string} user_id user 아이디
 * @returns 성공 여부
 */
export const getUserLikePosts = async (user_id: string) => {
  try {
    const res = await client.get(`/user/${user_id}/like_posts`);
    return res.data;
  } catch (err) {
    throw ErrorMsg(err);
  }
};

/**
 * 유저가 좋아요한 script 목록들
 * @param {string} user_id user 아이디
 * @returns 성공 여부
 */
export const getUserLikeScripts = async (user_id: string) => {
  try {
    const res = await client.get(`/user/${user_id}/like_scripts`);
    return res.data;
  } catch (err) {
    throw ErrorMsg(err);
  }
};
