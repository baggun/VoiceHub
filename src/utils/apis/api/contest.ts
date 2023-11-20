import { ErrorMsg } from "@utils/error";

/**
 * contest 목록 가져오기
 * @param {number} skip 스킵 개수
 * @param {number} limit 한계
 * @returns 성공 여부
 */
export const getContestList = async (skip: number = 0, limit: number = 0) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contest?skip=${skip}&limit=${limit}`, { cache: 'no-store'});
    if (!res.ok) throw new Error("Failed to fetch data");
    return res.json();
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contest/${contest_id}`);
    const data = await res.json();
    return { ok: res.ok, ...data };
  } catch (err) {
    throw ErrorMsg(err);
  }
};
