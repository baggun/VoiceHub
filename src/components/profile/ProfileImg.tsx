"use client";

import Image from "next/image";
import styled, { css } from "styled-components";

import { profileURL } from "@utils/url";

type ProfileImgProps = {
  className?: string;
  size?: number;
  src?: string;
  alt: string;
};

export const ProfileImg = (props: ProfileImgProps) => {
  if (!props.src) return <ProfileImgSkeleton {...props} />;
  return <ProfileImgStyled {...props} src={profileURL(props.src)} width={100} height={100}/>;
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

const ProfileImgStyled = styled(Image)<ProfileImgProps>`
  ${ProfileImgStyles}
`;

export const ProfileImgSkeleton = styled.div<ProfileImgProps>`
  ${ProfileImgStyles}
`;
