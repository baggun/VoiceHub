import { client } from "../client";
import { ErrorMsg } from "@apis/utils/error";

/**
 * 목소리 목록 가져오기
 * @param {string} tag 찾을려는 태그
 * @param {number} skip 스킵 개수
 * @param {number} limit 한계
 * @returns 성공 여부
 */
export const getVoices = async (
  tag: string = "",
  skip: number = 0,
  limit: number = 0
) => {
  try {
    const res = await client.get(
      `/voice?tag=${tag}&skip=${skip}&limit=${limit}`
    );
    return res.data;
  } catch (err) {
    throw ErrorMsg(err);
  }
};

/**
 * 목소리 찾기
 * @param {string} user_id user 아이디
 * @param {string} title voice 제목
 * @returns 성공 여부
 */
export const getVoice = async (user_id: string, title: string) => {
  try {
    const res = await client.get(`/voice/${user_id}/${title}`, {
      headers: {
        // Cookie: `connect.sid=${myCookie}`,
      },
    });
    return res.data;
  } catch (err) {
    throw ErrorMsg(err);
  }
};

/**
 * 글 작성
 * @param {string} title voice 제목
 * @param {string} voice_src 목소리 주소
 * @param {string[]} tags 관련 태그들
 * @returns 성공 여부
 */
export const postVoice = async (
  title: string,
  voice_src: string,
  script: string,
  tags?: string[]
) => {
  try {
    const res = await client.post(`/voice/${title}`, {
      voice_src,
      script,
      tags: tags || [],
    });
    return res.data;
  } catch (err) {
    throw ErrorMsg(err);
  }
};

/**
 * 글 작성
 * @param {string} user_id user 아이디
 * @param {string} voice_oid voice _id
 * @returns 성공 여부
 */
export const deleteVoice = async (user_id: string, voice_oid: string) => {
  try {
    const res = await client.delete(`/voice/${voice_oid}`, {
      data: { user_id },
    });
    return res.data;
  } catch (err) {
    throw ErrorMsg(err);
  }
};

/**
 * 댓글 작성
 * @param {string} voice_oid voice _id
 * @param {string} comment 댓글 내용
 * @returns 성공 여부
 */
export const postVoiceComment = async (voice_oid: string, comment: string) => {
  try {
    const res = await client.post(`/voice/${voice_oid}/comment`, {
      comment,
    });
    return res.data;
  } catch (err) {
    throw ErrorMsg(err);
  }
};

/**
 * 댓글 수정
 * @param {string} voice_oid voice _id
 * @param {string} user_oid user _id
 * @param {string} comment_oid comment _id
 * @param {string} comment 댓글 내용
 * @returns 성공 여부
 */
export const patchVoiceComment = async (
  voice_oid: string,
  user_oid: string,
  comment_oid: string,
  comment: string
) => {
  try {
    const res = await client.patch(`/voice/${voice_oid}/comment`, {
      user_oid,
      comment_oid,
      comment,
    });
    return res.data;
  } catch (err) {
    throw ErrorMsg(err);
  }
};

/**
 * 댓글 수정
 * @param {string} voice_oid voice _id
 * @param {string} user_oid user _id
 * @param {string} comment_oid comment _id
 * @returns 성공 여부
 */
export const deleteVoiceComment = async (
  voice_oid: string,
  user_oid: string,
  comment_oid: string
) => {
  try {
    const res = await client.delete(`/voice/${voice_oid}/comment`, {
      data: { user_oid, comment_oid },
    });
    return res.data;
  } catch (err) {
    throw ErrorMsg(err);
  }
};

/**
 * voice 좋아요
 * @param {string} voice_oid voice _id
 * @returns 성공 여부
 */
export const voiceLike = async (voice_oid: string) => {
  try {
    const res = await client.post(`/voice/${voice_oid}/like`);
    return res.data;
  } catch (err) {
    throw ErrorMsg(err);
  }
};
