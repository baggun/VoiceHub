"use client";

import styled from "styled-components";

export const ScriptBG = styled.div`
  position: relative;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.dark_bg};
  padding: 3rem 0rem;
`;

export const ScriptTitle = styled.h2`
  color: white;
  margin-bottom: 1rem;
`;

export const ScriptHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
  margin-bottom: 1rem;
  ${({ theme }) => theme.devices.max_desktop} {
    margin-top: 1rem;
  }
  a {
    color: white;
    margin-right: 1rem;
  }
`;
export const ScriptBody = styled.div`
  color: white;
  h2 {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
  }
`;
export const AudioScroller = styled.div`
  max-height: 360px;
  overflow: hidden auto;
  padding-right: 1rem;
`;
