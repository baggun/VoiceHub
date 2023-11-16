import { ErrorMsg } from "@utils/error";
import { UserLoginData, UserRegisterData } from "@type/user";

/**
 * 로그인 API
 * @param {UserLoginData} userData 로그인시 필요한 데이터 폼
 * @returns 성공 여부
 */
export const login = async (userData: UserLoginData) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/login`, {
      method: "POST",
      body: JSON.stringify({
        userData,
      }),
    });
    if (!res.ok) throw new Error("Failed to fetch data");
    return res.json();
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/logout`, {
      method: "POST",
    });
    if (!res.ok) throw new Error("Failed to fetch data");
    return res.json();
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (!res.ok) throw new Error("Failed to fetch data");
    return res.json();
  } catch (err) {
    throw ErrorMsg(err);
  }
};

/**
 * 추천 유저 목록
 * @returns 성공 여부
 */
export const getRecommendUser = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`);
    const data = await res.json();
    return { ok: res.ok, ...data };
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${user_id}`, { cache: 'no-cache'});
    const data = await res.json();
    return { ok: res.ok, ...data };
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${user_id}/voices`);
    if (!res.ok) throw new Error("Failed to fetch data");
    return res.json();
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${user_id}/posts`);
    if (!res.ok) throw new Error("Failed to fetch data");
    return res.json();
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${user_id}/followers`);
    if (!res.ok) throw new Error("Failed to fetch data");
    return res.json();
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${user_id}/followings`);
    if (!res.ok) throw new Error("Failed to fetch data");
    return res.json();
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${user_id}/like_voices`);
    if (!res.ok) throw new Error("Failed to fetch data");
    return res.json();
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${user_id}/like_posts`);
    if (!res.ok) throw new Error("Failed to fetch data");
    return res.json();
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${user_id}/like_scripts`);
    if (!res.ok) throw new Error("Failed to fetch data");
    return res.json();
  } catch (err) {
    throw ErrorMsg(err);
  }
};
