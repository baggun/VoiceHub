"use client";

import React from "react";
import styled, { css, keyframes } from "styled-components";

export interface SkeletonProps extends React.ComponentProps<"div"> {
  /**
   * 애니메이션 활성화 여부
   */
  $animation?: boolean;
  /**
   * children
   */
  children?: React.ReactNode;
  /**
   * 클래스명
   */
  className?: string;
  /**
   * Height
   */
  height?: string;
  /**
   * Width
   */
  width?: string;
  /**
   * 타입
   */
  $variant?: "circle" | "rect";
  /**
   * 상세 스타일
   */
  $borderRadius?: string;
}

const Skeleton = ({
  $animation = true,
  children,
  className,
  height,
  width,
  $borderRadius,
  $variant = "rect",
}: SkeletonProps) => {
  return (
    <SkeletonElement
      className={className}
      $animation={$animation}
      $variant={$variant}
      $borderRadius={$borderRadius}
      style={{ height, width }}
    >
      {children}
    </SkeletonElement>
  );
};

export default Skeleton;

const pulse = keyframes`
    0% {
        opacity: 1;
    }
    50% {
        opacity: 0.4;
    }
    100% {
        opacity: 1;
    }
`;

const skeletonStyles = css`
  background-color: rgba(0, 0, 0, 0.12);
  display: inline-block;
  height: auto;
  width: 100%;
`;

const skeletonAnimation = css`
  animation: ${pulse} 1.5s ease-in-out 0.5s infinite;
`;

const VARIANTS = {
  rect: css`
    border-radius: 0.25rem;
  `,
  circle: css`
    border-radius: 50%;
  `,
};

export const SkeletonElement = styled.span<SkeletonProps>`
  ${skeletonStyles}

  ${(props) => props.$animation && skeletonAnimation} 

  ${(props) => props.$variant && VARIANTS[props.$variant]}

  ${(props) =>
    props.$borderRadius &&
    css`
      border-radius: ${props.$borderRadius};
    `}
`;

type SkeletonGroupProps = {
  $align?: string;
};
export const SkeletonGroup = styled.div<SkeletonGroupProps>`
  display: inline-flex;
  flex-direction: column;
  ${(props) =>
    props.$align &&
    css`
      align-items: ${props.$align};
    `}
`;

type SkeletonWrapperProps = {
  $align?: string;
  $overflow?: boolean;
  $gap?: string;
};
export const SkeletonWrapper = styled.div<SkeletonWrapperProps>`
  display: flex;
  ${(props) =>
    props.$overflow &&
    css`
      overflow: hidden;
    `}
  ${(props) =>
    props.$gap &&
    css`
      gap: ${props.$gap};
    `}
`;
