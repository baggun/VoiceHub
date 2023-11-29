"use client";

import Link from "next/link";
import styled from "styled-components";

export const TagStyled = styled.span<{ $darkmode: boolean }>`
  font-size: 1rem;
  color: ${props => (props.$darkmode ? "white" : "black")};
  cursor: pointer;
  & + & {
    margin-left: 0.5rem;
  }
  &:hover {
    text-decoration: underline;
  }
`;
