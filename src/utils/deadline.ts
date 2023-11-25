import { DateType } from "@type/date";

/**
 * 마감날짜 이전인지
 * @param deadline 마감 날짜
 * @returns 마감 이전이면 true 아니면 false
 */
export const isDeadline = (deadline: Date): boolean => {
  return deadline > new Date();
};

/**
 * 마감날짜 계산
 * @param date 마감 날짜
 * @returns "마감" | "D-DAY" | "D-***"
 */
export const remainingDeadline = (date: Date): string => {
  const timeDiff = date.getTime() - new Date().getTime();
  const diff = Math.ceil(timeDiff / (1000 * 3600 * 24)) - 1;
  if (diff < 0) return "마감";
  if (diff === 0) return "D-DAY";
  return `D-${diff}`;
};

/**
 * 마감날짜 까지 몇일 몇시간 몇분이 남았는지
 * @param date 마간 날짜
 * @returns days, hours, minutes | undefined
 */
export const calculateRemainingDeadline = (date: Date): DateType => {
  // 현재 시간과 목표 날짜 사이의 차이 계산
  const timeDiff = date.getTime() - Date.now();

  // 차이가 음수인 경우: 목표 날짜가 이미 지났음
  if (timeDiff < 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  // 일, 시간, 분 계산
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
};
