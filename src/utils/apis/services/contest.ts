import { ContestData } from "@type/contest";
import { ContestResData } from "@type/response/res_contest";

export const getContestListProcess = (res: ContestResData[]): ContestData[] => {
  return res.map((data: ContestResData) => getContestProcess(data));
};

export const getContestProcess = (data: ContestResData): ContestData => {
  return {
    ...data,
    id: data._id,
    startDate: new Date(data.startDate),
    endDate: new Date(data.endDate),
  };
};
