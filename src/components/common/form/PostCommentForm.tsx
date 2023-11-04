"use client";

import React from "react";
import styled from "styled-components";
import SubmitButton from "../button/SubmitButton";
import { useRecoilValue } from "recoil";
// import { userState } from "@/recoil/user/atom";
import { useRouter } from "next/navigation";
import { postPostComment } from "@/apis/api/post";
import { useSession } from "next-auth/react";

type PostCommentForm = {
  post_id: string;
};

const PostCommentForm = ({ post_id }: PostCommentForm) => {
  const router = useRouter();
  // const user = useRecoilValue(userState);
  const { data: session } = useSession();
  const [commentContent, setCommentContent] = React.useState<string>("");

  const commentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!post_id) return;

    if (commentContent === "") return;

    if (!session || !session.user.id) {
      router.push("/auth/login");
      return;
    }

    await postPostComment(post_id, commentContent);

    router.refresh();
    setCommentContent("");
  };

  return (
    <CommentForm onSubmit={commentSubmit}>
      <CommentInput
        rows={5}
        cols={33}
        spellCheck="false"
        value={commentContent}
        onChange={e => setCommentContent(e.target.value)}
      />
      <SubmitButton width="5rem" $padding="0.5rem" margin="0.5rem 0rem" disabled={commentContent === ""}>
        작성
      </SubmitButton>
    </CommentForm>
  );
};

export default PostCommentForm;

export const CommentForm = styled.form`
  margin-top: 2rem;
  text-align: right;
`;
export const CommentInput = styled.textarea`
  padding: 0.5rem;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.lightGrey};
  border-radius: 0.5rem;
  resize: vertical;
  &:focus {
    outline: 1px solid ${({ theme }) => theme.colors.lightPrimary};
  }
`;
