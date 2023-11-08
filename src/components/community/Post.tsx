"use client";

import styled from "styled-components";
// import { Link, useNavigate } from "react-router-dom";

import Profile from "@components/profile";
import { IconMessage2 } from "@tabler/icons-react";
import { PostType } from "@type/post";
import Tag from "@/components/common/tag";
import { useRouter } from "next/navigation";
import Link from "next/link";

type PostProps = {
  post: PostType;
};

const Post = ({ post }: PostProps) => {
  const router = useRouter();
  // const navigate = useNavigate();

  return (
    <PostCard
      onClick={() => {
        router.push(`/community/${post.id}`);
      }}
      key={`post-${post.title}`}
    >
      <Profile size={2} profileID={post.user_id} profile_url={post.user_profile} nickname={post.user_nickname} $marginRight="1rem"></Profile>
      <PostTitle href={`/community/${post.id}`}>
        <h2 className="post-title">{post.title}</h2>
      </PostTitle>
      {post.tags && (
        <div>
          {post.tags.map(t => (
            <Tag key={t} tag={t} />
          ))}
        </div>
      )}
      <p className="post-content">{post.content}</p>
      <span className="post-comments">
        <IconMessage2 className="icon" /> {post.commentCount || 0}
      </span>
    </PostCard>
  );
};

export default Post;

const PostCard = styled.div`
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
const PostTitle = styled(Link)`
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
  .post-title {
    margin: 0.5rem 0rem;
  }
`;
