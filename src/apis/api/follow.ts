import { client } from "../client";
import { ErrorMsg } from "@apis/utils/error";

/**
 * 팔로우 정보 가져오기
 * @param {string} user user _id
 * @param {string} target target user _id
 * @returns 성공 여부
 */
export const getFollow = async (user: string, target: string) => {
    try {
        const res = await client.get(`/follow/${user}/${target}`);
        return res.data;
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
        const res = await client.post(`/follow/${target_oid}`);
        return res.data;
    } catch (err) {
        throw ErrorMsg(err);
    }
};
