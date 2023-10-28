import React from "react";
// import { Link, useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { DefaultLayout } from "@components/layout";
import Profile from "@components/profile";
import { Button } from "@components/common/button";
import {
    IconAlertSquareRounded,
    IconMessage2,
    IconNotes,
    IconQuestionMark,
} from "@tabler/icons-react";
import { PostType } from "@type/post";
import Post from "@components/community/Post";
import { getPosts } from "@apis/api/post";
import { getPostsProcess } from "@apis/services/post";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {MenuBlock, Menu, MenuIcon,PostHeader,Advertisement} from "./page.styled";

const Community = async () => {
    const res = await getPosts();
    const posts = getPostsProcess(res.posts);
    // const navigate = useNavigate();
    // const router = useRouter();

    // const [posts, setPosts] = React.useState<PostType[]>([]);

    // const initPosts = async () => {
    //     await getPosts()
    //         .then((res) => getPostsProcess(res.posts))
    //         .then((res) => setPosts(res));
    // };

    // React.useEffect(() => {
    //     initPosts();
    // }, []);

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
                        <img
                            className="ad-img"
                            src="https://dummyimage.com/420x320/ff7f7f/333333.png&text=Sample"
                            alt="ad-img"
                        />
                    </Advertisement>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default Community;
