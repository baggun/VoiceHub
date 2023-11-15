import React from "react";
import { DefaultLayout } from "@components/layout";
import ContestCard from "@components/contest/ContestCard";

import { getContestListProcess } from "@utils/apis/services/contest";
import { getContestList } from "@utils/apis/api/contest";
import { ContestData } from "@type/contest";

export const dynamic = "force-dynamic";

const ContestList = async () => {
  const res = await getContestList();
  const contestList: ContestData[] = getContestListProcess(res.contests);

  return (
    <DefaultLayout>
      <div className="row">
        {contestList.map(contest => (
          <ContestCard key={contest.id} {...contest} />
        ))}
      </div>
    </DefaultLayout>
  );
};
export default ContestList;
