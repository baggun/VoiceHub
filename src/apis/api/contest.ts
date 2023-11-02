import { client } from "../client";
import { ErrorMsg } from "@apis/utils/error";

/**
 * contest 목록 가져오기
 * @param {number} skip 스킵 개수
 * @param {number} limit 한계
 * @returns 성공 여부
 */
export const getContestList = async (skip: number = 0, limit: number = 0) => {
  try {
    const res = await client.get(`/contest?skip=${skip}&limit=${limit}`);
    return res.data;
  } catch (err) {
    throw ErrorMsg(err);
  }
};

/**
 * contest 자세히 가져오기
 * @param {string} contest_id contest _id
 * @returns 성공 여부
 */
export const getContest = async (contest_id: string) => {
  try {
    const res = await client.get(`/contest/${contest_id}`);
    return res.data;
  } catch (err) {
    throw ErrorMsg(err);
  }
};
