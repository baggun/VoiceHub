"use client";

// import { useRouter } from "next/navigation";
import Profile from "@components/profile";
import Tag from "@/components/common/tag";
import { IconMessage2 } from "@tabler/icons-react";
import { PostType } from "@type/post";

import { PostTitle, PostCard } from "./Post.styled";
import { useRouter } from "next/navigation";

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
      <Profile
        size={2}
        profileID={post.user_id}
        profile_url={post.user_profile}
        nickname={post.user_nickname}
        $marginRight="1rem"
      ></Profile>
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
