"use client";

import { profileURL } from "@/utils/url";
import styled, { css } from "styled-components";

type ProfileImgProps = {
  size?: number;
  src?: string;
  alt: string;
};

export const ProfileImg = (props: ProfileImgProps) => {
  if (!props.src) return <ProfileImgSkeleton {...props} />;
  return <ProfileImgStyled {...props} src={profileURL(props.src)} />;
};

const ProfileImgStyles = css<ProfileImgProps>`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.lightGrey};
  ${props =>
    props.size &&
    css`
      width: ${props.size}rem;
      height: ${props.size}rem;
    `}
`;

const ProfileImgStyled = styled.img<ProfileImgProps>`
  ${ProfileImgStyles}
`;

export const ProfileImgSkeleton = styled.div<ProfileImgProps>`
  ${ProfileImgStyles}
`;
