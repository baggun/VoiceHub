"use client";

import styled, { css } from "styled-components";

export const Badge = styled.span<{ $variant?: string }>`
  display: inline;
  padding: 0.3em 0.5em;
  font-size: 80%;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  margin-left: 0.25rem;
  align-self: end;
  border-radius: 0.25rem;
  ${props => {
    switch (props.$variant) {
      case "primary":
        return css`
          color: white;
          background: ${({ theme }) => theme.colors.primary};
        `;
      case "secondary":
        return css`
          color: white;
          background: ${({ theme }) => theme.colors.secondary};
        `;
      case "grey":
        return css`
          color: white;
          background: ${({ theme }) => theme.colors.grey};
        `;
      default:
        return css`
          color: ${({ theme }) => theme.colors.black};
          background: ${({ theme }) => theme.colors.bg};
        `;
    }
  }}
`;
