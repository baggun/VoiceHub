"use client";

import styled from "styled-components";

export const UserAboutMe = styled.div`
  padding: 1rem;
  color: #1b1b1b;
  font-weight: 300;
  font-size: 18px;
  background: #ede7f6;
  border-radius: 0rem 1rem 1rem 1rem;
  margin-bottom: 2rem;
`;
export const UserInfoListBlock = styled.div`
  background: black;
  border-radius: 1rem;
  padding: 1rem 1.5rem;
`;
export const UserInfoList = styled.li`
  display: flex;
  align-items: center;
  padding: 1.25rem 0rem;
  color: #d3d3d3;
  & + & {
    border-top: 1px solid #ffffff60;
  }
  .tabler-icon {
    margin-right: 1rem;
  }
`;
export const UserAssociatedTags = styled.div`
  margin-bottom: 2rem;
`;
