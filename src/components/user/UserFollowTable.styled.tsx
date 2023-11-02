"use client";

import styled, { css } from "styled-components";
import Link from "next/link";

export const FollowTable = styled.table`
  position: relative;
  display: inline-table;
  // width: 10rem;
  margin-left: 6rem;
  // border-spacing: 1rem 0px;
  border-spacing: 2rem 0px;
  border-collapse: separate;
  z-index: 1;
  td {
    // width: 33.33%;
    // width: 50%;
  }
`;
export const InfoLink = styled(Link)<{ $active: boolean }>`
  text-align: center;
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
  .infolink-head {
    font-weight: 400;
    font-size: 1rem;
  }
  .infolink-count {
    font-weight: 500;
  }
  ${props =>
    props.$active &&
    css`
      .infolink-head {
        font-weight: 500;
      }
      color: ${props.theme.colors.primary};
    `}
`;
