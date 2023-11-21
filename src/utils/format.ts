/**
 * 두자리수 문자열로 만드는 함수
 * @param value
 * @returns 두자리수로 만들어진 string
 */
export const leftPad = (value: number): string | number => {
  if (value >= 10) return value;
  return `0${value}`;
};

/**
 * 시간 형태
 * @param time 시간
 * @returns XX:XX 형태로 출력함
 */
export const timeFormat = (time: number): string => {
  if (time && !isNaN(time)) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${leftPad(minutes)}:${leftPad(seconds)}`;
  }
  return "00:00";
};

/**
 * 날짜 형태
 * @param date 날짜
 * @returns XXXX-XX-XX 형태로 출력함
 */
export const dateFormat = (date: Date) => {
  const year = date.getFullYear();
  const month = leftPad(date.getMonth() + 1);
  const day = leftPad(date.getDate());
  
  return [year, month, day].join("-");
};

/**
 * 파일 형태가 올바른지 확인
 * @param fileName 파일 이름
 * @param formats 허용할 파일 확장자
 * @returns 여부
 */
export const checkFileFormat = (fileName: string, formats: string[]): boolean => {
  return !formats.some((format: string) => fileName.toLowerCase().endsWith(format.toLowerCase()));
};

/**
 * 1000 자리수 넘어가는지 확인
 * @param num 숫자
 * @returns 1000 자리수가 넘어간다면 K로 표기
 */
export const digitK = (num: number): string => {
  if (num >= 1000) {
    const formattedNum = (Math.floor(num / 100) / 10).toFixed(1);
    if (formattedNum.endsWith(".0")) {
      return `${Math.floor(num / 1000)}K`;
    }
    return `${formattedNum}K`;
  }
  return num.toString();
};
