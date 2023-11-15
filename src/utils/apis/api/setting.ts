import { ErrorMsg } from "@utils/error";
import { SettingProfileData, UserLoginData, UserRegisterData } from "@type/user";

/**
 * 프로필 변경
 * @param email
 * @param nickname
 * @param desc
 * @param profile
 * @returns 성공 여부
 */
export const changeProfile = async (data: SettingProfileData) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/account/profile`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to fetch data");
    return res.json();
  } catch (err) {
    throw ErrorMsg(err);
  }
};

/**
 * 비밀번호 변경
 * @param password 현재 비번
 * @param repassword 변경할 비번
 * @returns 성공 여부
 */
export const changePassword = async (password: string, repassword: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/account/password`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        repassword,
      }),
    });
    const data = await res.json();
    return { ok: res.ok, ...data }; 
  } catch (err) {
    throw ErrorMsg(err);
  }
};

/**
 * 계정 삭제
 * @param password 현재 비번
 * @returns 성공 여부
 */
export const deleteAccount = async (password: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/account`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
      }),
    });
    const data = await res.json();
    return { ok: res.ok, ...data }; 
  } catch (err) {
    throw ErrorMsg(err);
  }
};
