/**
 * 프로필 주소
 * @param profile 파일 이름
 * @returns 프로필 이미지 정식 주소
 */
export const profileURL = (profile: string): string => {
  return `${process.env.NEXT_PUBLIC_S3_URL}/img/profile/${profile}`;
};
