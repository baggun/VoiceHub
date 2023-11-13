"use client";

import styled, { css } from "styled-components";
import Badge from "@common/badge";

export const ContestCard = styled.div`
  padding: 3rem;
  box-shadow: 0px 0px 3px #747474;
  background: white;
  margin: 3rem 0rem;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  border-radius: 0.5rem;
  ${({ theme }) => theme.devices.max_desktop} {
    margin: 1rem 0rem;
  }
  ${({ theme }) => theme.devices.max_mobile} {
    margin: 0rem;
    padding: 0rem;
    box-shadow: none;
  }
`;
export const ContestThumbnailBlock = styled.div`
  ${({ theme }) => theme.devices.max_desktop} {
    padding: 0rem;
    .contest-thumbnail {
      border-radius: 0px;
      margin: 0rem;
    }
  }
`;
export const ContestInfoBlock = styled.div`
  padding-top: 1rem;
  padding-bottom: 1rem;
`;

export const ContestTitle = styled.h2`
  font-size: 2rem;
`;
export const ContestDetail = styled.p`
  color: #444;
  margin: 0.25rem 0rem;
  ${Badge} {
    margin-left: 0.75rem;
    font-size: 0.75rem;
  }
`;
export const ContestFocusBlock = styled.div`
  display: flex;
  padding: 2rem;
  margin-top: 2rem;
  border-radius: 0.5rem;
  border: 4px solid ${({ theme }) => theme.colors.lightGrey};
  background-color: white;
  text-align: center;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;
export const ContestContentBlock = styled.div`
  margin: 4rem 0rem;
`;
export const ContestContent = styled.div`
  white-space: pre-wrap;
  margin-top: 2rem;
`;
export const DetailH3 = styled.h3`
  font-weight: 500;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;
