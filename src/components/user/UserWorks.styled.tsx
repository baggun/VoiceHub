"use client";

import Link from "next/link";
import styled, { css } from "styled-components";

export const ProfileNavCollapse = styled.div`
  display: flex;
  gap: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightGrey};
  margin-bottom: 1.25rem;
  padding-bottom: 0.75rem;
  ${({ theme }) => theme.devices.max_desktop} {
    gap: 0.75rem;
  }
`;

export const ProfileNavLink = styled(Link)<{ $active: boolean }>`
  position: relative;
  font-size: 1em;
  font-weight: ${props => (props.$active ? 500 : 400)};
  line-height: 1.2;
  padding: 0rem 0.5rem;
  ${props =>
    props.$active &&
    css`
      &::after {
        content: "";
        position: absolute;
        width: 100%;
        height: 3px;
        right: 50%;
        bottom: calc(50% - 1.5rem);
        background: ${props.theme.colors.secondary};
        transform: translate(50%, -50%);
        z-index: 1;
      }
    `}
`;
