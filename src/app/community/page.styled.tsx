"use client";

import styled, { css } from "styled-components";
import Link from "next/link";

/**
 * 메뉴
 */
export const MenuBlock = styled.div`
  background-color: white;
  border-radius: 1rem;
`;
export const Menu = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  border: 1px solid #d9d9d9;
  cursor: pointer;
  & + & {
    margin-top: 0.5rem;
  }
  &:hover {
    background-color: #f3f3f3;
  }
`;
export const MenuIcon = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  background-color: #953d93;
  border-radius: 0.5rem;
  margin-right: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  ${props =>
    props.color &&
    css`
      background-color: ${props.color};
    `}
`;

/**
 * 포스트
 */
export const PostHeader = styled.header`
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;
  .nav-item {
    padding: 0.5rem;
    font-weight: 400;
    color: #686868;
    &.active {
      color: black;
      font-weight: 500;
    }
  }
`;
export const ContentBlock = styled.div``;

/**
 * 광고 및 참조
 */
export const Advertisement = styled(Link)`
  display: block;
  border-radius: 1rem;
  background-color: tomato;
  overflow: hidden;
  .ad-img {
    width: 100%;
  }
`;
