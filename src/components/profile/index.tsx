import React from "react";

import { ProfileImg } from "./ProfileImg";
import { ProfileLink, ProfileName } from "./Profile.styled";
import { isAliveUser, userNickname } from "@utils/validate";

export type ProfileLinkProps = {
  size?: number;
  $marginRight?: string;
  $nicknameMargin?: string;
  $direction?: "row" | "col";
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
  $direction = "row",
}: ProfileProps) => {
  return (
    <ProfileLink
      className={`profile ${isAliveUser(profileID) ? "" : "disabled-link"}`}
      href={`/${profileID}`}
      $direction={$direction}
      $marginRight={$marginRight}
    >
      <ProfileImg
        className="profile-img"
        src={profile_url}
        alt="profile"
        size={size}
      />
      {nickname && (
        <ProfileName
          className="profile-nickname"
          $nicknameMargin={$nicknameMargin}
        >
          {userNickname(nickname)}
        </ProfileName>
      )}
    </ProfileLink>
  );
};

export default Profile;
