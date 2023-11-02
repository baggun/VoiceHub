"use client";

import styled, { css } from "styled-components";
import Link from "next/link";

export const ProfileBG = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  background-image: url(https://kyechan99.github.io/assets/img/head-img/2021-12-01-Threejs-Draw.jpg);
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  filter: brightness(0.2);
  z-index: ${({ theme }) => theme.zIndex.background_img};
`;
export const ProfileContents = styled.div`
  display: flex;
  -webkit-box-align: center;
  position: absolute;
  margin-top: -3rem;
`;
export const ProfileName = styled.h2`
  display: inline;
  margin-left: 1rem;
  margin-right: 2rem;
  color: white;
`;
export const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
`;
