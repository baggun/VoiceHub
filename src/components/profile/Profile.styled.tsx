"use client";

import Link from "next/link";
import { css, styled } from "styled-components";

import { ProfileLinkProps } from ".";

export const ProfileLink = styled.a<ProfileLinkProps>`
  display: inline-flex;
  align-items: center;
  ${props => {
    return css`
      margin-right: ${props.$marginRight};
    `;
  }}
  ${props =>
    props.$direction === "col" &&
    css`
      display: inline-flex !important;
      flex-direction: column;
      .profile-nickname {
        margin-left: 0px;
        margin-top: 0.5rem;
        font-weight: 500;
      }
    `}
  & + & {
    margin-left: 0.5rem;
  }
  &:hover {
    .profile-nickname {
      font-weight: 600;
    }
  }
`;

export const ProfileName = styled.span<{ $nicknameMargin?: string }>`
  color: black;
  margin-left: ${props => props.$nicknameMargin};
  font-weight: 400;
`;

export const ProfileCardStyled = styled.div<{ $margin: string }>`
  display: flex;
  align-items: center;
  margin: ${props => props.$margin};
  .profile {
    flex: 0 0 auto;
  }
  .btn-follow {
    flex: 0 0 auto;
  }
`;
export const ProfileInfo = styled.div`
  min-width: 0;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  margin: 0rem 2rem 0rem 1rem;
  .profile-followers {
    color: #838383;
  }
`;
export const ProfileNameLink = styled(Link)<{ size: string }>`
  color: black;
  display: inline;
  margin-right: 1rem;
  font-size: ${props => props.size};
  font-weight: 500;
  line-height: 1.2;
  .disabled-link {
    pointer-events: none;
  }
`;
export const ProfileAboutMe = styled.p<{ size: string }>`
  font-size: ${props => props.size};
  color: #777;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ProfileInfoStyle = styled.div`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
`;

export const ProfileInfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 0.75rem;
`;
 