"use client";

import React from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { RootState } from "@modules/index";

import { setFollow } from "@apis/api/follow";
import { Button } from ".";
import { useRecoilState } from "recoil";
// import { userState } from "@/recoil/user/atom";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

/**
 * 팔로우 버튼
 */
type FollowButtonProps = {
  target: string;
  isFollowed: boolean;
  followSuccessEvent?: (e: boolean) => void;
};
const FollowButton = ({ target, isFollowed, followSuccessEvent }: FollowButtonProps) => {
  const router = useRouter();
  // const navigate = useNavigate();
  // const user = useSelector((state: RootState) => state.users);
  // const [user, setUser] = useRecoilState(userState);
  const { data: session } = useSession();
  const [isFollowing, setFollowing] = React.useState<boolean>(isFollowed);

  React.useEffect(() => {
    setFollowing(isFollowed);
  }, [isFollowed]);

  const onClickHandler = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (!session?.user || !session?.user.id) {
      router.push("/auth/login");

      return;
    }

    const res = await setFollow(target);
    if (res && res.success) {
      if (followSuccessEvent) followSuccessEvent(res.result);
      else setFollowing(res.result);
    }
  };

  if (session && session.user.id === target) return <></>;

  return (
    <Button
      variant={isFollowing ? "grey" : "primary"}
      className="btn-follow"
      $borderRadius="0.5rem"
      onClick={onClickHandler}
    >
      {isFollowing ? "팔로우 중" : "팔로우 하기"}
    </Button>
  );
};

export default FollowButton;
