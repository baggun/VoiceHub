import { ErrorMsg } from "@apis/utils/error";

/**
 * 팔로우 정보 가져오기
 * @param {string} user user _id
 * @param {string} target target user _id
 * @returns 성공 여부
 */
export const getFollow = async (user: string, target: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/follow/${user}/${target}`);
    if (!res.ok) throw new Error("Failed to fetch data");
    return res.json();
  } catch (err) {
    throw ErrorMsg(err);
  }
};

/**
 * 팔로우 하기/해제
 * @param {string} target_oid target user _id
 * @returns 성공 여부
 */
export const setFollow = async (target_oid: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/follow/${target_oid}`, {
      method: "POST",
    });
    if (!res.ok) throw new Error("Failed to fetch data");
    return res.json();
  } catch (err) {
    throw ErrorMsg(err);
  }
};
