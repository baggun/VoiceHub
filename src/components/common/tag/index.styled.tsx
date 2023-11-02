"use client";

import Link from "next/link";
import styled from "styled-components";

export const TagStyled = styled(Link)<{ $darkmode: boolean }>`
  font-size: 1rem;
  color: ${props => (props.$darkmode ? "white" : "black")};
  & + & {
    margin-left: 0.5rem;
  }
  &:hover {
    text-decoration: underline;
  }
`;
