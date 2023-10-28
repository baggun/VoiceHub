"use client";

import styled from "styled-components";
import { ContainerFluid } from "@common/Grid";
import Link from "next/link";

export const ViewContainer = styled(ContainerFluid)`
  background: white;
  padding: 5rem 0rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightGrey};
`;

export const ContentBlock = styled.div`
  margin: 3.5rem 0rem;
  font-weight: 300;
`;

export const Date = styled.span`
  font-weight: 300;
  color: ${({ theme }) => theme.colors.grey};
`;
export const PostTags = styled.div`
  margin-bottom: 1rem;
`;

export const CommentBlock = styled.div`
  margin: 2rem 0rem;
`;
export const CommentContentBlock = styled.div`
  margin-left: 4rem;
  margin-bottom: 1rem;
  background-color: white;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.lightGrey};
  white-space: pre-wrap;
`;

export const PostFooter = styled.div`
  display: flex;
  justify-content: space-between;
`;