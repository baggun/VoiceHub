"use client";

import Link from "next/link";
import styled from "styled-components";

export const PostCard = styled.div`
  padding: 2rem;
  background-color: white;
  border-radius: 0.5rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  border: 1px solid #d9d9d9;
  cursor: pointer;
  .post-content {
    margin: 0.5rem 0rem 1rem 0rem;
    color: #7a7a7a;
  }
  .post-comments {
    display: inline-flex;
    align-items: center;
    opacity: 0.5;
    font-size: 1rem;
    .icon {
      margin-right: 0.5rem;
    }
  }
`;
export const PostTitle = styled(Link)`
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
  .post-title {
    margin: 0.5rem 0rem;
  }
`;
