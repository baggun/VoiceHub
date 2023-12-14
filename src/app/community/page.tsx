import React from "react";
import Link from "next/link";
import Image from "next/image";

import Post from "@components/community/Post";
import { DefaultLayout } from "@components/layout";
import { Button } from "@components/common/button";
import {
  IconAlertSquareRounded,
  IconNotes,
  IconQuestionMark,
} from "@tabler/icons-react";

import { getPosts } from "@utils/apis/api/post";
import { getPostsProcess } from "@utils/apis/services/post";

import {
  MenuBlock,
  Menu,
  MenuIcon,
  PostHeader,
  Advertisement,
} from "./page.styled";

export const dynamic = "force-dynamic";

const Community = async () => {
  const res = await getPosts();
  const posts = getPostsProcess(res.posts);

  return (
    <DefaultLayout className="mg-t-3">
      <div className="row">
        <div className="col-md-3">
          <MenuBlock>
            <Menu>
              <MenuIcon color="#07AD7B">
                <IconNotes />
              </MenuIcon>
              자유게시판
            </Menu>
            <Menu>
              <MenuIcon color="#E4B872">
                <IconQuestionMark />
              </MenuIcon>
              고민 상담
            </Menu>
            <Menu>
              <MenuIcon color="#F2959B">
                <IconAlertSquareRounded />
              </MenuIcon>
              꿀 TIP
            </Menu>
          </MenuBlock>
        </div>
        <div className="col-md-6">
          <div className="d-flex align-content-center justify-between mg-b-1">
            <PostHeader>
              <Link className="nav-item active" href="#recent">
                최신순
              </Link>
              <Link className="nav-item" href="#recent">
                인기글
              </Link>
            </PostHeader>
            <Link href="/community/write">
              <Button>글 작성</Button>
            </Link>
          </div>
          {posts.map((post) => (
            <Post post={post} key={`post-${post.id}`} />
          ))}
        </div>
        <div className="col-md-3">
          <Advertisement href="/">
            {/* Image 쓰려다가 광고 이미지면 외부 이미지 일듯 싶어서 일단 보류 */}
            <img className="ad-img" src="/img/base_profile.png" alt="ad-img" />
          </Advertisement>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Community;
