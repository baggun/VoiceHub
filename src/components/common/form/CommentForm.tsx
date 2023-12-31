"use client";

import React from "react";
import styled from "styled-components";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

import { Button } from "@common/button";
import { postVoiceComment } from "@utils/apis/api/voice";

type CommentFormProps = {
  voice_id: string;
};
const CommentForm = ({ voice_id }: CommentFormProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const [content, setContent] = React.useState<string>("");
  const { data: session } = useSession();

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!session || !session.user.id) {
      router.push(`/auth/login?redirect_to=${encodeURIComponent(pathname)}`);
      return;
    }

    if (content === "") {
      window.alert("내용을 입력해주세요.");
      return;
    }

    await postVoiceComment(voice_id, content)
      .then(res => {
        // if (res.success) window.location.reload();
        if (res.success) router.refresh();
        setContent("");
      })
      .catch(err => {
        // 로그인 안되었음.
        if (err.response.status === 403 && err.response.data.success === false) {
          router.push(`/auth/login?redirect_to=${encodeURIComponent(pathname)}`);
        }
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  return (
    <CommentFormStyled onSubmit={submitHandler}>
      <CommentInput className="input-comment" value={content} onChange={handleChange} spellCheck={false}></CommentInput>
      <Button variant="black" type="submit" $padding="0.75rem 1rem" $borderRadius="0rem 0.5rem 0.5rem 0rem">
        입력
      </Button>
    </CommentFormStyled>
  );
};
export default CommentForm;

const CommentFormStyled = styled.form`
  margin: 1.5rem 0rem;
  display: flex;
  .input-comment {
    width: auto;
    flex: 1 0 auto;
  }
`;
const CommentInput = styled.input`
  width: 100%;
  border: none;
  background-color: #e7e6e6;
  border-radius: 0.5rem 0rem 0rem 0.5rem;
  outline: none;
  padding-left: 1rem;
  padding-right: 1rem;
  font-size: 1rem;
`;
