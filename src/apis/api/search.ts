import { client } from "../client";
import { ErrorMsg } from "@apis/utils/error";

/**
 * 검색
 * @param {string} word 검색어
 * @returns 성공 여부
 */
export const search = async (word: string) => {
  try {
    const res = await client.get(`/search/${word}`);
    return res.data;
  } catch (err) {
    throw ErrorMsg(err);
  }
};
