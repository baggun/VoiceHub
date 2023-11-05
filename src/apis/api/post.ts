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
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post?tag=${tag}&skip=${skip}&limit=${limit}`);
    if (!res.ok) throw new Error("Failed to fetch data");
    return res.json();
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/${post_id}`);
    const data = await res.json();
    return { ok: res.ok, ...data };
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post`, {
      method: "POST",
      body: JSON.stringify(post),
    });
    if (!res.ok) throw new Error("Failed to fetch data");
    return res.json();
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/${post_oid}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to fetch data");
    return res.json();
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/${post_oid}/comment`, {
      method: "POST",
      body: JSON.stringify({ comment }),
    });
    if (!res.ok) throw new Error("Failed to fetch data");
    return res.json();
  } catch (err) {
    throw ErrorMsg(err);
  }
};

/**
 * 댓글 수정
 * @param {string} post_oid user _id
 * @param {object} comment 댓글 내용
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/${post_oid}/comment`, {
      method: "PATCH",
      body: JSON.stringify(comment),
    });
    if (!res.ok) throw new Error("Failed to fetch data");
    return res.json();
  } catch (err) {
    throw ErrorMsg(err);
  }
};

/**
 * 댓글 삭제
 * @param {string} post_oid post _id
 * @param {object} comment comment _id
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/${post_oid}/comment`, {
      method: "DELETE",
      body: JSON.stringify(comment),
    });
    if (!res.ok) throw new Error("Failed to fetch data");
    return res.json();
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/${post_oid}/like`, {
      method: "POST",
    });
    if (!res.ok) throw new Error("Failed to fetch data");
    return res.json();
  } catch (err) {
    throw ErrorMsg(err);
  }
};
