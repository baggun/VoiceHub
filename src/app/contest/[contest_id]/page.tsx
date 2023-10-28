import React from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
import styled, { css } from "styled-components";
import Label from "@common/Label";
import { Badge } from "@common/badge";
import { DefaultLayout } from "@components/layout";
import { dateFormat } from "@utils/format";
import { ContestData } from "@type/contest";
import ContestThumbnail from "@components/contest/ContestThumbnail";
import {
  isDeadline,
  remainingDeadline,
  calculateRemainingDeadline,
} from "@utils/deadline";
import ContestDeadline from "@components/contest/ContestDeadline";
import { Button } from "@common/button";
import { getContest } from "@apis/api/contest";
import { getContestProcess } from "@apis/services/contest";
import { useRouter } from "next/navigation";
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
// export const getServerSideProps: GetServerSideProps<PageProps> = async ({
//   params,
// }) => {
//   const contest_id = params?.contest_id as string;
//   return {
//     props: { contest_id },
//   };
// };
const Contest = async ({ params }: { params: PageProps }) => {
  // const Contest = async ({ contest_id }: PageProps) => {
  const { contest_id } = params;

  // const router = useRouter();

  const res = await getContest(contest_id);
  const contestData = getContestProcess(res.contest);

  // if (!contest_id) {
  //   wrongContest();
  //   return;
  // }

  // const wrongContest = () => {
  //   if (
  //     window.confirm(
  //       "존재하지 않는 공고입니다.\n(올바르지 않는 주소이거나 강제 삭제되었습니다.)"
  //     )
  //   )
  //     router.push("/contest");
  // };

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
              접수기간 : {dateFormat(contestData.startDate)} ~{" "}
              {dateFormat(contestData.endDate)}
            </ContestDetail>
            <ContestDetail>조회수 : {contestData.hit}</ContestDetail>
          </ContestInfoBlock>
        </div>
        <ContestFocusBlock>
          <ContestDeadline
            deadline={calculateRemainingDeadline(contestData.endDate)}
          />
          <Button
            variant="primary"
            $padding="0.5rem 3rem"
            $borderRadius="0.5rem"
          >
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
