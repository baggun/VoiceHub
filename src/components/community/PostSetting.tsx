"use client";

import Link from "next/link";
import { styled } from "styled-components";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { deletePost } from "@/utils/apis/api/post";
import { PostType } from "@/types/post";

type PostSettingProps = {
  post: PostType;
  post_id: string;
};

const PostSetting = ({ post, post_id }: PostSettingProps) => {
  const router = useRouter();
  const { data: session } = useSession();

  if (!session || !session.user.id) return <></>;

  const handleDeletePost = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!post_id) return;

    const ok = window.confirm("정말 삭제하시겠습니까?");
    if (ok) {
      await deletePost(post_id).then(res => {
        if (res && res.success) router.push("/community");
      });
    }
  };

  return (
    <>
      {session.user.oid === post?.user_oid && (
        <OwnerSettingGroup>
          <EditPostButton href={`/community/write?edit=${post_id}`}>수정</EditPostButton>
          <RemovePostButton onClick={handleDeletePost}>삭제</RemovePostButton>
        </OwnerSettingGroup>
      )}
    </>
  );
};

export default PostSetting;

const OwnerSettingGroup = styled.div``;
const EditPostButton = styled(Link)`
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  margin-right: 0.5rem;
  font-size: 1rem;
`;
const RemovePostButton = styled.button`
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 1rem;
`;
