"use client";

import { useSession } from "next-auth/react";

import ProfileInfo from "@components/profile/ProfileInfo";

import { CommentType } from "@type/comment";
import { dateFormat } from "@utils/format";

import { CommentBlock, CommentContentBlock, CommentDate, RemovePostButton } from "./index.styled";
import { deletePostComment } from "@/utils/apis/api/post";

type CommentProps = {
  comment: CommentType;
};

const handleDeletePost = async (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();

  // if (!post_id) return;

  const ok = window.confirm("정말 삭제하시겠습니까?");
  if (ok) {
    await deletePostComment().then(res => {
      if (res && res.success) router.push("/community");
    });
  }
};

const Comment = ({ comment }: CommentProps) => {
  const { data: session } = useSession();

  return (
    <CommentBlock>
      <ProfileInfo
        profileID={comment.user.id}
        profile_url={comment.user.profile}
        nickname={comment.user.nickname}
        size={3}
      >
        <CommentDate>{dateFormat(comment.date)}</CommentDate>
      </ProfileInfo>
      <CommentContentBlock>{comment.content}</CommentContentBlock>
      {session?.user && <>삭제, 수정</>}

      {session && session.user.oid === comment.user._id && (
        // <OwnerSettingGroup>
          {/* <EditPostButton href={`/community/write?edit=${post_id}`}>수정</EditPostButton> */}
          <RemovePostButton onClick={handleDeletePost}>삭제</RemovePostButton>
        // </OwnerSettingGroup>
      )}
    </CommentBlock>
  );
};
export default Comment;
