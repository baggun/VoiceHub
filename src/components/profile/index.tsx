// import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

import profile_temp from "@assets/img/profile_temp.png";
import { ProfileImg } from "./ProfileImg";
import React from "react";
import Link from "next/link";
import { profileURL } from "@/utils/url";

import { ProfileLink, ProfileName } from "./Profile.styled";

export type ProfileLinkProps = {
  size?: number;
  $marginRight?: string;
  $nicknameMargin?: string;
};
export type ProfileProps = ProfileLinkProps & {
  profileID: string;
  profile_url: string;
  nickname?: string;
  children?: React.ReactNode;
};

const Profile = ({
  profileID,
  profile_url,
  nickname,
  size = 2.5,
  $marginRight = "0px",
  $nicknameMargin = "0.5rem",
}: ProfileProps) => {
  return (
    <ProfileLink
      className="profile"
      href={`/${profileID}`}
      //   size={size}
      $marginRight={$marginRight}
    >
      {/* <img src={profile_temp} /> */}
      <ProfileImg src={profile_url} alt="profile" size={size} />
      {nickname && (
        <ProfileName className="profile-nickname" $nicknameMargin={$nicknameMargin}>
          {nickname}
        </ProfileName>
      )}
    </ProfileLink>
  );
};

export default Profile;
