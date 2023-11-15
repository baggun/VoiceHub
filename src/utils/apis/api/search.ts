import { ErrorMsg } from "@utils/error";

/**
 * 검색
 * @param {string} word 검색어
 * @returns 성공 여부
 */
export const search = async (word: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/search/${word}`);
    if (!res.ok) throw new Error("Failed to fetch data");
    return res.json();
  } catch (err) {
    throw ErrorMsg(err);
  }
};
