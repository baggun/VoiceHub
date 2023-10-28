import { client } from "../client";
import { ErrorMsg } from "@apis/utils/error";

/**
 * 태그 생성
 * @param {string[]} tags 생성할 태그들
 * @returns 성공 여부
 */
export const createTags = async (tags: string[]) => {
    try {
        const res = await client.post(`/tag`, { tags });
        return res.data;
    } catch (err) {
        throw ErrorMsg(err);
    }
};

export const getTags = async (tag_name: string) => {
    try {
        const res = await client.get(`/tag/${tag_name}`);
        return res.data;
    } catch (err) {
        throw ErrorMsg(err);
    }
};
