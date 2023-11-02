import { UserData } from "./user";

export type CommentType = {
  user: UserData;
  content: string;
  date: Date;
};
