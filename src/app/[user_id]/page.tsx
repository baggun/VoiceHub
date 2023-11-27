import React from "react";
import { notFound } from "next/navigation";

import Profile from "@components/profile";
import { MainLayout } from "@components/layout";
import UserInfo from "@components/user/UserInfo";
import UserWorks from "@/components/user/UserWorks";
import { Container, ContainerFluid } from "@common/Grid";
import UserFollowTable from "@components/user/UserFollowTable";

import { getUser } from "@utils/apis/api/users";
import { UserProfileData } from "@type/user";

import { ProfileBG, ProfileContents, ProfileName, ProfileInfo } from "./page.styled";
import { Metadata, ResolvingMetadata } from "next";
import { profileURL } from "@utils/url";

interface PageProps {
  user_id: string;
}

// export async function generateMetadata(
//   { params }: { params: PageProps },
//   parent: ResolvingMetadata,
// ): Promise<Metadata> {
//   const { user_id } = params;

//   const res = await getUser(user_id);
//   const profileData: UserProfileData = res.user;

//   return {
//     title: profileData.user_nickname,
//     openGraph: {
//       title: profileData.user_nickname,
//       description: profileData.user_desc !== "" ? profileData.user_desc : `${profileData.user_nickname} 프로필 페이지`,
//       siteName: "VoiceHub",
//       images: [
//         {
//           url: profileURL(profileData.user_profile),
//           alt: profileData.user_profile,
//         },
//       ],
//       type: "website",
//     },
//   };
// }

const User = async ({ params, searchParams }: { params: PageProps; searchParams: { tab: string } }) => {
  const { user_id } = params;
  const tab: string = searchParams.tab || "voices";

  const res = await getUser(user_id);
  if (!res.ok) return notFound();
  const profileData: UserProfileData = res.user;
  const associatedTags: string[] = [];

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
              <Profile profileID={user_id} profile_url={profileData.user_profile} size={6}></Profile>
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
