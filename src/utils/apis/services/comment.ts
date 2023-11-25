import { CommentType } from "@type/comment";
import { CommentResponseData } from "@type/response/res_voice";

export const getCommentProcess = (data: any): CommentType[] => {
  return data.map(({ content, user, date, _id }: CommentResponseData) => {
    return {
      id: _id,
      content: content,
      user: {
        _id: user._id,
        id: user.user_id,
        nickname: user.user_nickname,
        profile: user.user_profile,
      },
      date: new Date(date),
    };
  });
};
