// import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

import profile_temp from "@assets/img/profile_temp.png";
import { ProfileImg } from "./ProfileImg";
import React from "react";
import Link from "next/link";
import { profileURL } from "@/utils/url";

import { ProfileLink, ProfileName } from "./Profile.styled";
import { isAliveUser, userNickname } from "@/utils/validate";

export type ProfileLinkProps = {
  size?: number;
  $marginRight?: string;
  $nicknameMargin?: string;
  direction?: 'row' | 'col';
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
  direction = 'row',
}: ProfileProps) => {
  return (
    <ProfileLink
      className={`profile ${isAliveUser(profileID) ?  "" : "disabled-link"}`}
      href={`/${profileID}`}
      direction={direction}
      //   size={size}
      $marginRight={$marginRight}
    >
      {/* <img src={profile_temp} /> */}
      <ProfileImg className="profile-img" src={profile_url} alt="profile" size={size} />
      {nickname && (
        <ProfileName className="profile-nickname" $nicknameMargin={$nicknameMargin}>
          {userNickname(nickname)}
        </ProfileName>
      )}
    </ProfileLink>
  );
};

export default Profile;
