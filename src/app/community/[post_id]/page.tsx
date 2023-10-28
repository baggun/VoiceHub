import React from "react";
// import { Link, userouter.push, useParams } from "react-router-dom";
import styled from "styled-components";

import { MainLayout } from "@components/layout";
import {
  IconHeartPlus,
  IconArrowNarrowLeft,
  IconHeartFilled,
} from "@tabler/icons-react";
import ProfileInfo from "@components/profile/ProfileInfo";
import { PostH1, RecommendH2 } from "@common/Heading";
import { Button } from "@common/button";
import { Container, ContainerFluid } from "@common/Grid";
import { AudioFileBar } from "@components/audio/AudioFile";
import SubmitButton from "@common/button/SubmitButton";
import {
  deletePost,
  getPost,
  postLike,
  postPostComment,
  postUnLike,
} from "@apis/api/post";
import { PostType } from "@type/post";
import { getPostProcess } from "@apis/services/post";
import { dateFormat } from "@utils/format";
// import { useSelector } from "react-redux";
// import { RootState } from "@modules/index";
import { getCommentProcess } from "@apis/services/comment";
import { CommentType } from "@type/comment";
import { UserData } from "@type/user";
import { getUsersProcess } from "@apis/services/user";
import Tag from "@/components/common/tag";
import { useRouter } from "next/navigation";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRecoilValue } from "recoil";
import { userState } from "@/recoil/user/atom";

import {
  ViewContainer,
  ContentBlock,
  Date,
  PostTags,
  CommentBlock,
  CommentContentBlock,
  PostFooter,
} from "./page.styled";
import Like from "@/components/common/like";
import PostSetting from "@/components/community/PostSetting";
import PostCommentForm from "@/components/common/form/PostCommentForm";

interface PageProps {
  post_id: string;
}
// export const getServerSideProps: GetServerSideProps<PageProps> = async ({
//   params,
// }) => {
//   const post_id = params?.post_id as string;
//   return {
//     props: { post_id },
//   };
// };

const View = async ({ params }: { params: PageProps }) => {
  const { post_id } = params;
  const res = await getPost(post_id);
  const post = getPostProcess(res.post);
  let comments!: CommentType[];
  let likers!: UserData[];
  if (res.post.comments) comments = getCommentProcess(res.post.comments);
  if (res.likes) likers = getUsersProcess(res.likes);

  // const commentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   if (!post_id) return;

  //   if (commentContent === "") return;

  //   if (!user.id) {
  //     router.push("/auth/login");
  //     return;
  //   }

  //   await postPostComment(post_id, {
  //     user_oid: user.id,
  //     comment: commentContent,
  //   });

  //   initPost();
  // };

  return (
    <MainLayout>
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
              {post?.tags && (
                <PostTags>
                  {post?.tags.map((t) => (
                    <Tag key={t} tag={t} />
                  ))}
                </PostTags>
              )}
              {post && (
                <ProfileInfo
                  profileID={post.user_id}
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

            {comments.map((c, idx) => {
              return (
                <CommentBlock key={`c-${idx}`}>
                  <ProfileInfo
                    profileID={c.user.id}
                    nickname={c.user.nickname}
                    size={3}
                  >
                    <Date>{dateFormat(c.date)}</Date>
                  </ProfileInfo>
                  <CommentContentBlock>{c.content}</CommentContentBlock>
                </CommentBlock>
              );
            })}
          </div>
          <div className="col-md-2"></div>
        </div>
      </Container>
    </MainLayout>
  );
};

export default View;
