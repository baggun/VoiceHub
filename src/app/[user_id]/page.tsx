"use client";

import React from "react";
import styled, { css } from "styled-components";
// import { Link, useParams, useSearchParams } from "react-router-dom";

import { MainLayout } from "@components/layout";
import { Container, ContainerFluid } from "@common/Grid";
import Profile from "@components/profile";
import Post from "@components/community/Post";
import UserInfo from "@components/user/UserInfo";
import ScriptCard from "@components/script/ScriptCard";
import FollowButton from "@common/button/FollowButton";
import ProfileCard from "@components/profile/ProfileCard";
import { AudioFileBar } from "@components/audio/AudioFile";
import UserFollowTable from "@components/user/UserFollowTable";

import { PostType } from "@type/post";
import { VoiceInfo } from "@type/voice";
import { ScriptType } from "@type/scripts";

import {
  getUser,
  getUserFollowers,
  getUserFollowings,
  getUserLikePosts,
  getUserLikeScripts,
  getUserLikeVoices,
  getUserPosts,
  getUserVoices,
} from "@apis/api/users";
import { getVoicesProcess } from "@apis/services/voice";
import { getScriptsProcess } from "@apis/services/script";
import { getPostsProcess } from "@apis/services/post";
import { UserData, UserProfileData } from "@type/user";
import { TabObjType } from "@type/tab";
import { getUsersProcess } from "@apis/services/user";
import { GetServerSideProps } from "next";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

interface PageProps {
  user_id: string;
}
// export const getServerSideProps: GetServerSideProps<PageProps> = async ({
//   params,
// }) => {
//   const user_id = params?.user_id as string;
//   return {
//     props: { user_id },
//   };
// };

const User = ({ params }: { params: PageProps }) => {
  const { user_id } = params;
  //   const { user_id } = useParams();
  const searchParams = useSearchParams();
  const tab: string | null = searchParams.get("tab");

  const [profileData, setProfileData] = React.useState<UserProfileData>({
    user_desc: "",
    isFollowed: false,
    user_email: "",
    user_id: "",
    user_nickname: "",
    user_profile: "",
    followers: 0,
    followings: 0,
  });
  const [tracks, setTracks] = React.useState<VoiceInfo[]>([]);

  const [associatedTags, setAssociatedTags] = React.useState<string[]>([]);

  const [posts, setPosts] = React.useState<PostType[]>([]);
  const [scripts, setScripts] = React.useState<ScriptType[]>([]);
  const [followers, setFollowers] = React.useState<UserData[]>([]);

  const tabList: TabObjType = {
    voices: {
      tab: "voices",
      title: "녹음",
      api: async (user_id: string) => {
        await getUserVoices(user_id)
          .then((res) => getVoicesProcess(res.data))
          .then((res) => setTracks(res));
      },
    },
    posts: {
      tab: "posts",
      title: "게시글",
      api: async (user_id: string) => {
        await getUserPosts(user_id)
          .then((res) => getPostsProcess(res.data))
          .then((res) => setPosts(res));
      },
    },
    like_scripts: {
      tab: "like_scripts",
      title: "관심 대사",
      api: async (user_id: string) => {
        await getUserLikeScripts(user_id)
          .then((res) => getScriptsProcess(res.data))
          .then((res) => {
            setScripts(res);
            console.log(res);
          });
      },
    },
    like_voices: {
      tab: "like_voices",
      title: "관심 녹음",
      api: async (user_id: string) => {
        await getUserLikeVoices(user_id)
          .then((res) => getVoicesProcess(res.data))
          .then((res) => setTracks(res));
      },
    },
    like_posts: {
      tab: "like_posts",
      title: "관심 게시글",
      api: async (user_id: string) => {
        await getUserLikePosts(user_id)
          .then((res) => getPostsProcess(res.data))
          .then((res) => setPosts(res));
      },
    },
  };

  const refreshTabData = async () => {
    if (!user_id) return;

    const curTab = tab || "voices";
    if (!Object.keys(tabList).includes(curTab)) {
      await (curTab === "followers"
        ? getUserFollowers(user_id)
        : getUserFollowings(user_id)
      )
        .then((res) => getUsersProcess(res.data))
        .then((res) => setFollowers(res));
      return;
    }

    tabList[curTab].api(user_id);
  };

  const initUserData = async () => {
    if (!user_id) return;
    const res = await getUser(user_id);
    setProfileData(res.user);
  };

  const followerCntHandler = (isFollowed: boolean) => {
    setProfileData({
      ...profileData,
      isFollowed,
      followers: profileData.followers + (isFollowed ? 1 : -1),
    });
  };

  React.useEffect(() => {
    initUserData();
  }, []);

  React.useEffect(() => {
    refreshTabData();
  }, [tab, user_id]);

  return (
    <MainLayout>
      {/* 
                프로필 페이지 상단
            */}
      <ContainerFluid className="pd-none">
        {/* 상단 프로필 Cover 배경 */}
        <ProfileBG />
        <Container>
          {/* 상단 유저 이름 및 팔로우 버튼 */}
          {user_id && (
            <ProfileContents>
              <Profile profileID={user_id} size={6}></Profile>
              <ProfileInfo>
                <div className="d-flex align-content-center">
                  <ProfileName>{profileData.user_nickname} 성우</ProfileName>
                  <FollowButton
                    target={profileData.user_id}
                    isFollowed={profileData.isFollowed}
                    followSuccessEvent={followerCntHandler}
                  />
                </div>
              </ProfileInfo>
            </ProfileContents>
          )}
          {/* 상단 유저의 팔로워 및 팔로윙 테이블 */}
          <UserFollowTable {...profileData} />
        </Container>
      </ContainerFluid>

      {/* 
                프로필 페이지 하단
            */}
      <Container className="mg-t-2">
        <div className="row">
          {/* 유저 기본 정보 */}
          <UserInfo
            profieData={profileData}
            className="col-md-5"
            associatedTags={associatedTags}
          />

          {/* 동적 페이지 (작업물, 팔로워, 좋아요 목록 등등..) */}
          <div className="col-md-7">
            <ProfileNavCollapse>
              {Object.values(tabList).map((t) => (
                <ProfileNavLink
                  key={t.tab}
                  href={{
                    pathname: `/${user_id}`,
                    query: { tab: t.tab },
                  }}
                  $active={(tab ?? Object.values(tabList)[0].tab) === t.tab}
                >
                  {t.title}
                </ProfileNavLink>
              ))}
            </ProfileNavCollapse>
            {
              {
                followers: (
                  <div>
                    {followers.map((follower) => (
                      <ProfileCard
                        key={`follower-${follower.id}`}
                        {...follower}
                        isFollowed={true}
                      />
                    ))}
                  </div>
                ),
                following: (
                  <div>
                    {followers.map((following) => (
                      <ProfileCard
                        key={`following-${following.id}`}
                        {...following}
                        isFollowed={true}
                      />
                    ))}
                  </div>
                ),
                voices: (
                  <>
                    {tracks.map((track) => (
                      <AudioFileBar
                        key={`track-${track.id}`}
                        audioSrc={track.url}
                        userId={track.ownerID}
                        audioId={track.id}
                        likes={3}
                        info={{ ...track }}
                      />
                    ))}
                  </>
                ),
                posts: (
                  <>
                    {posts.map((post) => (
                      <Post key={`post-${post.id}`} post={post} />
                    ))}
                  </>
                ),
                like_script: (
                  <>
                    {scripts.map((sc) => (
                      <ScriptCard key={`script-${sc.id}`} script={sc} />
                    ))}
                  </>
                ),
                like_voices: (
                  <>
                    {tracks.map((track) => (
                      <AudioFileBar
                        key={`like-track-${track.id}`}
                        audioSrc={track.url}
                        userId={track.ownerID}
                        audioId={track.id}
                        likes={3}
                        info={{ ...track }}
                      />
                    ))}
                  </>
                ),
                like_posts: (
                  <>
                    {posts.map((post) => (
                      <Post key={`like-post-${post.id}`} post={post} />
                    ))}
                  </>
                ),
              }[tab ?? "voices"]
            }
          </div>
        </div>
      </Container>
    </MainLayout>
  );
};

export default User;

const ProfileBG = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  background-image: url(https://kyechan99.github.io/assets/img/head-img/2021-12-01-Threejs-Draw.jpg);
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  filter: brightness(0.2);
  z-index: ${({ theme }) => theme.zIndex.background_img};
`;
const ProfileContents = styled.div`
  display: flex;
  -webkit-box-align: center;
  position: absolute;
  margin-top: -3rem;
`;
const ProfileName = styled.h2`
  display: inline;
  margin-left: 1rem;
  margin-right: 2rem;
  color: white;
`;
const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
`;

const ProfileNavCollapse = styled.div`
  display: flex;
  gap: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightGrey};
  margin-bottom: 1.25rem;
  padding-bottom: 0.75rem;
  ${({ theme }) => theme.devices.max_desktop} {
    gap: 0.75rem;
  }
`;
const ProfileNavLink = styled(Link)<{ $active: boolean }>`
  position: relative;
  font-size: 1em;
  font-weight: ${(props) => (props.$active ? 500 : 400)};
  line-height: 1.2;
  padding: 0rem 0.5rem;
  ${(props) =>
    props.$active &&
    css`
      &::after {
        content: "";
        position: absolute;
        width: 100%;
        height: 3px;
        right: 50%;
        bottom: calc(50% - 1.5rem);
        background: ${props.theme.colors.secondary};
        transform: translate(50%, -50%);
        z-index: 1;
      }
    `}
`;

// const LikesNavCollapse = styled(ProfileNavCollapse)``;
// const LikesNavLink = styled(ProfileNavLink).attrs({ as: "button" })`
//     font-size: 1rem;
//     border: none;
//     background: none;
//     &::after {
//         bottom: calc(50% - 1.5rem);
//     }
// `;
