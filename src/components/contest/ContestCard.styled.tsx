"use client";

import Link from "next/link";
import styled from "styled-components";
import Badge from "../common/badge";

export const ContestCardLink = styled(Link)`
  margin: 1rem 0rem;
  ${({ theme }) => theme.devices.max_desktop} {
    margin: 0rem 0rem 1rem 0rem;
    // padding: 0rem;
  }
`;

export const ContestTitle = styled.h3`
  font-size: 1.75rem;
  font-weight: 500;
`;
export const ContestDetail = styled.p`
  color: #666;
  margin: 0.25rem 0rem;
  ${Badge} {
    margin-left: 0.75rem;
    font-size: 0.75rem;
  }
`;
