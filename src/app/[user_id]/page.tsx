// "use client";

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

import { ProfileBG, ProfileContents, ProfileName, ProfileInfo } from "./page.styled";
import UserWorks from "@/components/user/UserWorks";

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

const User = async ({ params, searchParams }: { params: PageProps; searchParams: { tab: string } }) => {
  const { user_id } = params;
  //   const { user_id } = useParams();
  // const searchParams = useSearchParams();
  const tab: string = searchParams.tab || "voices";

  const res = await getUser(user_id);
  const profileData: UserProfileData = res.user;

  const associatedTags: string[] = [];
  // const [profileData, setProfileData] = React.useState<UserProfileData>({
  //   user_desc: "",
  //   isFollowed: false,
  //   user_email: "",
  //   user_id: "",
  //   user_nickname: "",
  //   user_profile: "",
  //   followers: 0,
  //   followings: 0,
  // });

  // const [associatedTags, setAssociatedTags] = React.useState<string[]>([]);

  // const [followers, setFollowers] = React.useState<UserData[]>([]);

  // const refreshTabData = async () => {
  //   if (!user_id) return;

  //   const curTab = tab || "voices";
  //   if (!Object.keys(tabList).includes(curTab)) {
  //     await (curTab === "followers"
  //       ? getUserFollowers(user_id)
  //       : getUserFollowings(user_id)
  //     )
  //       .then((res) => getUsersProcess(res.data))
  //       .then((res) => setFollowers(res));
  //     return;
  //   }

  //   tabList[curTab].api(user_id);
  // };

  // const initUserData = async () => {
  //   if (!user_id) return;
  //   const res = await getUser(user_id);
  //   setProfileData(res.user);
  // };

  // const followerCntHandler = (isFollowed: boolean) => {
  //   setProfileData({
  //     ...profileData,
  //     isFollowed,
  //     followers: profileData.followers + (isFollowed ? 1 : -1),
  //   });
  // };

  // React.useEffect(() => {
  //   initUserData();
  // }, []);

  // React.useEffect(() => {
  //   refreshTabData();
  // }, [tab, user_id]);

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
                  {/* <FollowButton
                    target={profileData.user_id}
                    isFollowed={profileData.isFollowed}
                    followSuccessEvent={followerCntHandler}
                  /> */}
                </div>
              </ProfileInfo>
            </ProfileContents>
          )}
          {/* 상단 유저의 팔로워 및 팔로윙 테이블 */}
          <UserFollowTable tab={tab} {...profileData} />
        </Container>
      </ContainerFluid>

      {/* 
                프로필 페이지 하단
            */}
      <Container className="mg-t-2">
        <div className="row">
          {/* 유저 기본 정보 */}
          <UserInfo profieData={profileData} className="col-md-5" associatedTags={associatedTags} />

          <UserWorks tab={tab} user_id={user_id} />
        </div>
      </Container>
    </MainLayout>
  );
};

export default User;
