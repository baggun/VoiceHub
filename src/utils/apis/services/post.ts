import { PostType } from "@type/post";
import { PostResponseData } from "@type/response/res_post";

export const getPostsProcess = (data: PostResponseData[]): PostType[] => {
  return data.map(({ _id, author, comments, commentCount, createdAt, tags, title, content }): PostType => {
    return {
      id: _id,
      user_oid: author._id,
      user_id: author.user_id,
      user_nickname: author.user_nickname,
      user_profile: author.user_profile,
      title,
      tags,
      content,
      createdAt: new Date(createdAt),
      comments,
      commentCount,
    };
  });
};

export const getPostProcess = (data: PostResponseData): PostType => {
  
  return {
    id: data._id,
    user_oid: data.author._id,
    user_id: data.author.user_id,
    user_nickname: data.author.user_nickname,
    user_profile: data.author.user_profile,
    tags: data.tags,
    title: data.title,
    content: data.content,
    createdAt: new Date(data.createdAt),
  };
};
