export type ContestResData = {
  _id: string;
  contest: string;
  company: string;
  thumbnail?: string;
  startDate: Date;
  endDate: Date;
  hit: number;
  content?: string;
};
