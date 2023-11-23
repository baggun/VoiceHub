import { UserData } from "./user";

export type CommentType = {
  id: string;
  user: UserData;
  content: string;
  date: Date;
};
