"use client";

import styled from "styled-components";

export const PostH1 = styled.h1`
  margin-bottom: 0.5rem;
`;

type HeadingProps = {
  $marginTop?: string;
  $marginBottom?: string;
};
export const H1 = styled.h1<HeadingProps>`
  margin-top: ${props => props.$marginTop || "0rem"};
  margin-bottom: ${props => props.$marginBottom || "1rem"};
`;
export const RecommendH2 = styled.h2<HeadingProps>`
  font-size: 1.75em;
  margin-top: ${props => props.$marginTop || "2rem"};
  margin-bottom: ${props => props.$marginBottom || "0rem"};
`;
