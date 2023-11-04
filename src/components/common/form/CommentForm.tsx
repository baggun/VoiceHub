"use client";

import React from "react";
import styled from "styled-components";
// import { useNavigate } from "react-router-dom";
import { Button } from "@common/button";
import { postVoiceComment } from "@apis/api/voice";
import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";
import { useSession } from "next-auth/react";
// import { userState } from "@/recoil/user/atom";
// import { RootState } from "@modules/index";
// import { useSelector } from "react-redux";

type CommentFormProps = {
  voice_id: string;
};
const CommentForm = ({ voice_id }: CommentFormProps) => {
  const router = useRouter();
  // const navigate = useNavigate();
  const [content, setContent] = React.useState<string>("");
  // const user = useRecoilValue(userState);
  const { data: session } = useSession();
  // const id = useSelector((state: RootState) => state.users.id);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!session || session.user.id) {
        router.push("/auth/login");
        return;
    }

    if (content === "") {
      window.alert("내용을 입력해주세요.");
      return;
    }

    await postVoiceComment(voice_id, content)
      .then(res => {
        if (res.success) window.location.reload();
        else setContent("");
      })
      .catch(err => {
        // 로그인 안되었음.
        if (err.response.status === 403 && err.response.data.success === false) {
          router.push("/auth/login");
        }
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  return (
    <CommentFormStyled onSubmit={submitHandler}>
      <CommentInput className="input-comment" value={content} onChange={handleChange}></CommentInput>
      <Button variant="black" type="submit" $borderRadius="0rem 0.5rem 0.5rem 0rem">
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
