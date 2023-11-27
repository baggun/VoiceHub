import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PostH1 } from "@common/Heading";
import { Container } from "@common/Grid";
import Comment from "@components/comment";
import Tag from "@/components/common/tag";
import Like from "@/components/common/like";
import { MainLayout } from "@components/layout";
import { IconArrowNarrowLeft } from "@tabler/icons-react";
import ProfileInfo from "@components/profile/ProfileInfo";
import PostSetting from "@components/community/PostSetting";
import PostCommentForm from "@components/common/form/PostCommentForm";

import { getPost } from "@utils/apis/api/post";
import { getPostProcess } from "@utils/apis/services/post";
import { getUsersProcess } from "@utils/apis/services/user";
import { getCommentProcess } from "@utils/apis/services/comment";
import { UserData } from "@type/user";
import { dateFormat } from "@utils/format";
import { CommentType } from "@type/comment";
import { ViewContainer, ContentBlock, Date, PostTags, PostFooter } from "./page.styled";

interface PageProps {
  post_id: string;
}

const View = async ({ params }: { params: PageProps }) => {
  const { post_id } = params;
  const res = await getPost(post_id);

  if (!res.ok) return notFound();

  const post = getPostProcess(res.post);
  let comments!: CommentType[];
  let likers!: UserData[];
  if (res.post.comments) comments = getCommentProcess(res.post.comments);
  if (res.likes) likers = getUsersProcess(res.likes);

  return (
    <>
      <ViewContainer>
        <Container>
          <div className="row">
            <div className="col-md-2">
              <Link href="/community">
                <IconArrowNarrowLeft />
              </Link>
            </div>
            <div className="col-md-8">
              <PostH1>{post?.title}</PostH1>
              {post?.tags && <PostTags>{post?.tags.map(t => <Tag key={t} tag={t} />)}</PostTags>}
              {post && (
                <ProfileInfo
                  profileID={post.user_id}
                  profile_url={post.user_profile}
                  nickname={post.user_nickname}
                  size={3}
                >
                  <Date>{post && dateFormat(post?.createdAt)}</Date>
                </ProfileInfo>
              )}

              <ContentBlock>{post?.content}</ContentBlock>

              <PostFooter>
                <Like likers={likers} type="Post" target_id={post_id} />
                <PostSetting post={post} post_id={post_id} />
              </PostFooter>
            </div>
            <div className="col-md-2"></div>
          </div>
        </Container>
      </ViewContainer>
      <Container>
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <PostCommentForm post_id={post_id} />

            {comments.map((c, idx) => (
              <Comment key={`c-${idx}`} post_id={post_id} comment={c} />
            ))}
          </div>
          <div className="col-md-2"></div>
        </div>
      </Container>
    </>
  );
};

export default View;
