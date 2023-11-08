export type VoiceResponseData = {
  author: {
    user_id: string;
    user_nickname: string;
    user_profile: string;
    user_desc: string;
  };
  comments: string[];
  createdAt: string;
  tags: string[];
  title: string;
  voice_src: string;
  script: {
    script: string;
  };
  _id: string;
};

export type CommentResponseData = {
  content: string;
  date: string;
  user: {
    user_id: string;
    user_nickname: string;
    user_profile: string;
  };
  _id: string;
};
