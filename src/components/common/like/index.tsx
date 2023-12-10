"use client";

import React from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import { UserData } from "@type/user";
import { Button, CustomButtonProps } from "../button";
import { voiceLike } from "@utils/apis/api/voice";
import { setScriptLike } from "@utils/apis/api/script_like";
import { postLike } from "@utils/apis/api/post";
import { useSession } from "next-auth/react";

type LikeProps = {
  target_id: string;
  likers: UserData[];
  type: string;
};

const ButtonStyle: CustomButtonProps = {
  variant: "primary",
  $borderRadius: "0.75rem",
  $withIcon: true,
};

const Type = (type: string) => {
  switch (type) {
    case "Voice":
      return {
        Wrapper: StyledVoiceLike,
        likeController: voiceLike,
        styled: {},
      };
    case "Script":
      return {
        Wrapper: Button,
        likeController: setScriptLike,
        styled: ButtonStyle,
      };
    case "Post":
      return { Wrapper: Button, likeController: postLike, styled: ButtonStyle };
  }
  return { Wrapper: StyledVoiceLike, likeController: voiceLike, styled: {} };
};

const Like = ({ target_id, likers, type }: LikeProps) => {
  const router = useRouter();
  const { data: session } = useSession();

  const [curLikers, setLikers] = React.useState<number>(likers.length);
  const [isLike, setIsLike] = React.useState<boolean>(() => {
    if (likers.some((item) => item.id === session?.user.id)) return true;
    return false;
  });
  const { Wrapper, likeController, styled } = Type(type);

  const likeHandler = async (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();

    if (session?.user.id === "") {
      router.push("/auth/login");
      return;
    }

    if (target_id === "") return;

    const res = await likeController(target_id);
    if (res.success) {
      if (isLike) {
        setIsLike(false);
        setLikers(curLikers - 1);
      } else {
        setIsLike(true);
        setLikers(curLikers + 1);
      }
    }
  };

  return (
    <Wrapper onClick={likeHandler} {...styled}>
      {session?.user.id !== "" && isLike ? (
        <IconHeartFilled className="icon icon-sm" />
      ) : (
        <IconHeart className="icon icon-sm" />
      )}
      {curLikers}{" "}
    </Wrapper>
  );
};
export default Like;

const StyledVoiceLike = styled.span<CustomButtonProps>`
  display: flex;
  position: absolute;
  right: 1rem;
  bottom: 0px;
  align-items: center;
  cursor: pointer;
  .icon {
    margin-right: 0.25rem;
  }
`;
