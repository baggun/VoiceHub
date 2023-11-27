import React from "react";
import ContestCard from "@components/contest/ContestCard";

import { getContestListProcess } from "@utils/apis/services/contest";
import { getContestList } from "@utils/apis/api/contest";
import { ContestData } from "@type/contest";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

// export const metadata: Metadata = {
//   title: "보이스허브",
//   description: "성우들을 위한 공간, VoiceHub",
//   openGraph: {
//     url: "https://voice-hub-beta.vercel.app",
//     title: "VoiceHub",
//     description: "성우들을 위한 공간, VoiceHub",
//     siteName: "VoiceHub",
//     images: ['https://raw.githubusercontent.com/baggun/VoiceHub/master/public/thumbnail.png'],
//     type: "website",
//   },
// };

const ContestList = async () => {
  const res = await getContestList();
  const contestList: ContestData[] = getContestListProcess(res.contests);

  return (
    <div className="row">
      {contestList.map(contest => (
        <ContestCard key={contest.id} {...contest} />
      ))}
    </div>
  );
};
export default ContestList;
