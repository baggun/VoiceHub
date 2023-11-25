import React from "react";
import { notFound } from "next/navigation";

import { Button } from "@common/button";
import { DefaultLayout } from "@components/layout";
import ContestThumbnail from "@components/contest/ContestThumbnail";
import ContestDeadline from "@components/contest/ContestDeadline";

import { dateFormat } from "@utils/format";
import { getContestProcess } from "@utils/apis/services/contest";
import { getContest, getContestList } from "@utils/apis/api/contest";
import { isDeadline } from "@utils/deadline";
import { ContestData } from "@type/contest";

import {
  ContestCard,
  ContestContent,
  ContestContentBlock,
  ContestDetail,
  ContestFocusBlock,
  ContestInfoBlock,
  ContestThumbnailBlock,
  ContestTitle,
  DetailH3,
} from "./page.styled";

interface PageProps {
  contest_id: string;
}

export const dynamicParams = true;

//! [SSG] 로 생성하려다가, hit 및 정보 수정이 있을지도 몰라 일단 ISR 로 변경
export async function generateStaticParams() {
  const res = await getContestList();
  const contests: ContestData[] = res.contests;
  return contests.map(contest => ({
    contest_id: contest.id,
  }));
}

const Contest = async ({ params }: { params: PageProps }) => {
  const { contest_id } = params;

  const res = await getContest(contest_id);
  if (!res.ok) return notFound();

  const contestData = getContestProcess(res.contest);

  return (
    <DefaultLayout>
      <ContestCard>
        <div className="row">
          <ContestThumbnailBlock className="col-lg-5">
            <ContestThumbnail
              id={contest_id}
              $active={isDeadline(contestData.endDate)}
              thumbnail={contestData.thumbnail || ""}
            />
          </ContestThumbnailBlock>
          <ContestInfoBlock className="col-lg-7">
            <ContestTitle>{contestData.contest}</ContestTitle>
            <ContestDetail>주최/주관 : {contestData.company}</ContestDetail>
            <ContestDetail>
              접수기간 : {dateFormat(contestData.startDate)} ~ {dateFormat(contestData.endDate)}
            </ContestDetail>
            <ContestDetail>조회수 : {contestData.hit}</ContestDetail>
          </ContestInfoBlock>
        </div>
        <ContestFocusBlock>
          <ContestDeadline endDate={contestData.endDate} />
          <Button variant="primary" $padding="0.5rem 3rem" $borderRadius="0.5rem">
            응모하기
          </Button>
        </ContestFocusBlock>
        <ContestContentBlock>
          <DetailH3>상세내용</DetailH3>
          <hr />
          <ContestContent>{contestData.content}</ContestContent>
        </ContestContentBlock>
      </ContestCard>
    </DefaultLayout>
  );
};
export default Contest;
