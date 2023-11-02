export type PostType = {
  id: string | number;
  user_oid: string;
  user_id: string;
  user_nickname: string;
  user_profile: string;
  title: string;
  tags?: string[];
  content: string;
  createdAt: Date;
  comments?: string[];
  commentCount?: number;
};
