export type PostResponseData = {
  author: {
    _id: string;
    user_id: string;
    user_nickname: string;
    user_desc: string;
    user_profile: string;
  };
  createdAt: string;
  tags: string[];
  title: string;
  content: string;
  _id: string;
  comments?: string[];
  commentCount?: number;
};
