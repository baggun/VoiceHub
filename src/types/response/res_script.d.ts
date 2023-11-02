export type ScriptResponseData = {
  _id: string;
  title: string;
  script: string;
  tags: string[];
  createdAt: string;
  likeCount: number;
  voiceCount: number;
  likedByUser?: boolean;
};
