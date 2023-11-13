import React from "react";
import styled, { css } from "styled-components";
// import { Link } from "react-router-dom";
import Badge from "@common/badge";
import { dateFormat } from "@utils/format";
import { ContestData } from "@type/contest";
import ContestThumbnail from "./ContestThumbnail";
import { isDeadline, remainingDeadline } from "@utils/deadline";
import Link from "next/link";
import { ContestCardLink, ContestDetail, ContestTitle } from "./ContestCard.styled";

const ContestCard: React.FC<ContestData> = ({ id, contest, company, thumbnail, startDate, endDate, hit }) => {
  return (
    <>
      {thumbnail && (
        <div className="col-lg-6">
          <ContestThumbnail id={id} $active={isDeadline(endDate)} thumbnail={thumbnail} />
        </div>
      )}
      <ContestCardLink href={`/contest/${id}`} className={thumbnail ? "col-lg-6" : "col-lg-12"}>
        <ContestTitle>{contest}</ContestTitle>
        <ContestDetail>주최/주관 : {company}</ContestDetail>
        <ContestDetail>
          접수기간 : {dateFormat(startDate)} ~ {dateFormat(endDate)}
          <Badge $variant={isDeadline(endDate) ? "secondary" : "grey"}>{remainingDeadline(endDate)}</Badge>
        </ContestDetail>
        <ContestDetail>조회수 : {hit}</ContestDetail>
      </ContestCardLink>
    </>
  );
};
export default ContestCard;
