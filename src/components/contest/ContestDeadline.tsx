"use client";

import React from "react";
import { calculateRemainingDeadline } from "@utils/deadline";
import { DateType } from "@type/date";

import { Highlight, Sub } from "./ContestDeadline.styled";

const formatTimeUnit = (value: number, unit: string) => {
  if (value <= 0) return <></>;

  return (
    <>
      <Highlight>{value}</Highlight> {unit}{" "}
    </>
  );
};

const ContestDeadline = ({ endDate }: { endDate: Date }) => {
  const [deadline, setDeadline] = React.useState<DateType>(calculateRemainingDeadline(endDate));

  const refreshTime = () => { 
    setDeadline(calculateRemainingDeadline(endDate));
  };

  React.useEffect(() => {
    const timer = setInterval(refreshTime, 1000);

    return () => clearInterval(timer);
  }, []);

  if (deadline === undefined) return <div>마감되었습니다.</div>;

  return (
    <div>
      <Sub>마감까지</Sub>
      {formatTimeUnit(deadline.days, "일")}
      {formatTimeUnit(deadline.hours, "시간")}
      {formatTimeUnit(deadline.minutes, "분")}
      {
        // deadline.days <= 0 &&
        formatTimeUnit(deadline.seconds, "초")
      }
      남았습니다.
    </div>
  );
};

export default ContestDeadline;
