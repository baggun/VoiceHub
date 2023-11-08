"use client";

import { profileURL } from "@/utils/url";
import styled, { css } from "styled-components";

type ProfileImgProps = {
  size?: number;
  src?: string;
  alt: string;
};

export const ProfileImg = (props: ProfileImgProps) => {
  return <ProfileImgStyled  {...props}  src={profileURL(props.src || "")}/>;
};

export const ProfileImgStyled = styled.img<ProfileImgProps>`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  ${props => {
    if (props.size)
      return css`
        width: ${props.size}rem;
        height: ${props.size}rem;
      `;
  }}
`;
