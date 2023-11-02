"use client";

import Link from "next/link";
import React from "react";
// import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

type ContestThumbnailProps = {
  id: string | number | undefined;
  $active: boolean;
  thumbnail: string;
  disabled?: boolean;
};

const ContestThumbnail = ({ id, $active, thumbnail, disabled = false }: ContestThumbnailProps) => {
  return (
    <Thumbnail href={`/contest/${id}`} className={disabled ? "contest-thumbnail disabled" : "contest-thumbnail"}>
      <Mark $active={$active}>접수중</Mark>
      <img src={thumbnail} alt="img" />
    </Thumbnail>
  );
};
export default ContestThumbnail;

const Thumbnail = styled(Link)`
  height: 14rem;
  position: relative;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: grey;
  overflow: hidden;
  margin: 1rem 0rem;
  img {
    // height: 100%;
    width: 100%;
    object-fit: cover;
  }
  &.disabled {
    pointer-events: none;
  }
`;

const Mark = styled.div<{ $active?: boolean }>`
  position: absolute;
  top: 0px;
  left: 0px;
  padding: 0.5rem 1rem;
  border-bottom-right-radius: 0.5rem;
  color: white;
  ${props =>
    props.$active
      ? css`
          background-color: ${props.theme.colors.secondary};
        `
      : css`
          background-color: ${props.theme.colors.grey};
        `}
`;
