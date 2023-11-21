"use client";

import styled from "styled-components";

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

export const CommentDate = styled.span`
  font-weight: 300;
  color: ${({ theme }) => theme.colors.grey};
`;

export const RemovePostButton = styled.button`
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 1rem;
`;
