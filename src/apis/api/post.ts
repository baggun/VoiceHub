import { client } from "../client";
import { ErrorMsg } from "@apis/utils/error";

/**
 * 목소리 목록 가져오기
 * @param {string} tag 찾을려는 태그
 * @param {number} skip 스킵 개수
 * @param {number} limit 한계
 * @returns 성공 여부
 */
export const getPosts = async (tag: string = "", skip: number = 0, limit: number = 0) => {
  try {
    const res = await client.get(`/post?tag=${tag}&skip=${skip}&limit=${limit}`);
    return res.data;
  } catch (err) {
    throw ErrorMsg(err);
  }
};

/**
 * 목소리 찾기
 * @param {string} post_id post 아이디
 * @returns 성공 여부
 */
export const getPost = async (post_id: string) => {
  try {
    const res = await client.get(`/post/${post_id}`);
    return res.data;
  } catch (err) {
    throw ErrorMsg(err);
  }
};

/**
 * 글 작성
 * @param post post 정보
 * @returns
 */
export const postPost = async (post: { title: string; content: string; type: string; tags: string[] }) => {
  try {
    const res = await client.post(`/post`, {
      ...post,
    });
    return res.data;
  } catch (err) {
    throw ErrorMsg(err);
  }
};

/**
 * 글 삭제
 * @param {string} post_oid post _id
 * @returns 성공 여부
 */
export const deletePost = async (post_oid: string) => {
  try {
    const res = await client.delete(`/post/${post_oid}`);
    return res.data;
  } catch (err) {
    throw ErrorMsg(err);
  }
};

/**
 * 댓글 작성
 * @param {string} post_oid post _id
 * @param {string} user_oid user _id
 * @param {string} comment 댓글 내용
 * @returns 성공 여부
 */
export const postPostComment = async (post_oid: string, comment: string) => {
  try {
    const res = await client.post(`/post/${post_oid}/comment`, {
      comment,
    });
    return res.data;
  } catch (err) {
    throw ErrorMsg(err);
  }
};

/**
 * 댓글 수정
 * @param {string} user_oid user _id
 * @param {string} post_oid post _id
 * @param {string} comment_oid comment _id
 * @param {string} comment 댓글 내용
 * @returns 성공 여부
 */
export const patchPostComment = async (
  post_oid: string,
  comment: {
    user_oid: string;
    comment_oid: string;
    comment: string;
  },
) => {
  try {
    const res = await client.patch(`/post/${post_oid}/comment`, {
      ...comment,
    });
    return res.data;
  } catch (err) {
    throw ErrorMsg(err);
  }
};

/**
 * 댓글 수정
 * @param {string} post_oid post _id
 * @param {string} user_oid user _id
 * @param {string} comment_oid comment _id
 * @returns 성공 여부
 */
export const deletePostComment = async (
  post_oid: string,
  comment: {
    user_oid: string;
    comment_oid: string;
  },
) => {
  try {
    const res = await client.delete(`/post/${post_oid}/comment`, {
      data: { ...comment },
    });
    return res.data;
  } catch (err) {
    throw ErrorMsg(err);
  }
};

/**
 * post 좋아요
 * @param {string} post_oid post _id
 * @returns 성공 여부
 */
export const postLike = async (post_oid: string) => {
  try {
    const res = await client.post(`/post/${post_oid}/like`);
    return res.data;
  } catch (err) {
    throw ErrorMsg(err);
  }
};

/**
 * post 좋아요 해제
 * @param {string} post_oid post _id
 * @returns 성공 여부
 */
export const postUnLike = async (post_oid: string) => {
  try {
    const res = await client.delete(`/post/${post_oid}/like`);
    return res.data;
  } catch (err) {
    throw ErrorMsg(err);
  }
};
