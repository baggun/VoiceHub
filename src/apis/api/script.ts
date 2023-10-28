import { client } from "../client";
import { ErrorMsg } from "@apis/utils/error";

/**
 * script 목록 가져오기
 * @param {string} tag 찾을려는 태그
 * @param {number} skip 스킵 개수
 * @param {number} limit 한계
 * @returns 성공 여부
 */
export const getScripts = async (
    tag: string = "",
    skip: number = 0,
    limit: number = 0
) => {
    try {
        const res = await client.get(`/script?tag=${tag}&skip=${skip}&limit=${limit}`);
        return res.data;
    } catch (err) {
        throw ErrorMsg(err);
    }
};

/**
 * script 자세히 가져오기
 * @param {string} script_oid script _id
 * @returns 성공 여부
 */
export const getScript = async (script_oid: string) => {
    try {
        const res = await client.get(`/script/${script_oid}`);
        return res.data;
    } catch (err) {
        throw ErrorMsg(err);
    }
};

/**
 * script 작성하기
 * @param {string} title 제목
 * @param {string} script 대사
 * @param {string[]} tags 관련 태그
 * @returns 성공 여부
 */
export const postScript = async (title: string, script: string, tags: string[]) => {
    try {
        const res = await client.post(`/script`, { title, script, tags });
        return res.data;
    } catch (err) {
        throw ErrorMsg(err);
    }
};

/**
 * script 작성하기
 * @param {string} user_oid 작성자 user _id
 * @param {string} script_oid 대사 _id
 * @returns 성공 여부
 */
export const deleteScript = async (user_oid: string, script_oid: string) => {
    try {
        const res = await client.delete(`/script`, { data: { user_oid, script_oid } });
        return res.data;
    } catch (err) {
        throw ErrorMsg(err);
    }
};
