import { ErrorMsg } from "@utils/error";

/**
 * 팔로우 정보 가져오기
 * @param {string} script_id target user _id
 * @returns 성공 여부
 */
export const getScriptLike = async (script_id: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/script/${script_id}/like`);
    if (!res.ok) throw new Error("Failed to fetch data");
    return res.json();
  } catch (err) {
    throw ErrorMsg(err);
  }
};

/**
 * 팔로우 하기
 * @param {string} script_id target user _id
 * @returns 성공 여부
 */
export const setScriptLike = async (script_id: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/script/${script_id}/like`, {
      method: "POST",
    });
    if (!res.ok) throw new Error("Failed to fetch data");
    return res.json();
  } catch (err) {
    throw ErrorMsg(err);
  }
};
