"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import ProfileInfo from "@components/profile/ProfileInfo";

import { CommentType } from "@type/comment";
import { dateFormat } from "@utils/format";

import {
  CommentBlock,
  CommentHeadBlock,
  CommentContentBlock,
  CommentDate,
  RemovePostButton,
} from "./index.styled";
import { deletePostComment } from "@utils/apis/api/post";
import { deleteVoiceComment } from "@utils/apis/api/voice";
// import { useRouter } from "next/router";

type CommentProps = {
  post_id: string;
  comment: CommentType;
  type?: "voice" | "post";
};

const Comment = ({ post_id, comment, type = "post" }: CommentProps) => {
  const router = useRouter();
  const { data: session } = useSession();

  const handleDeletePost = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // if (!post_id) return;

    const ok = window.confirm("정말 삭제하시겠습니까?");
    if (ok) {
      await (type === "post" ? deletePostComment : deleteVoiceComment)(
        post_id,
        comment.id
      ).then((res) => {
        if (res && res.success) router.refresh();
      });
    }
  };

  return (
    <CommentBlock>
      <CommentHeadBlock>
        <ProfileInfo
          profileID={comment.user.id}
          profile_url={comment.user.profile}
          nickname={comment.user.nickname}
          size={3}
        >
          <CommentDate>{dateFormat(comment.date)}</CommentDate>
        </ProfileInfo>
        {
          session && session.user.oid === comment.user._id && (
            // <OwnerSettingGroup>
            /* <EditPostButton href={`/community/write?edit=${post_id}`}>수정</EditPostButton> */
            <RemovePostButton onClick={handleDeletePost}>삭제</RemovePostButton>
          )
          // </OwnerSettingGroup>
        }
      </CommentHeadBlock>
      <CommentContentBlock>{comment.content}</CommentContentBlock>
    </CommentBlock>
  );
};
export default Comment;
