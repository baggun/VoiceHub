import { client } from "../client";
import { ErrorMsg } from "@apis/utils/error";

/**
 * 팔로우 정보 가져오기
 * @param {string} script_id target user _id
 * @returns 성공 여부
 */
export const getScriptLike = async (script_id: string) => {
    try {
        const res = await client.get(`/script/${script_id}/like`);
        return res.data;
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
        const res = await client.post(`/script/${script_id}/like`);
        return res.data;
    } catch (err) {
        throw ErrorMsg(err);
    }
};

