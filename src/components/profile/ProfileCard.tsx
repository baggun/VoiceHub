import styled from "styled-components";
import Link from "next/link";

import FollowButton from "@common/button/FollowButton";
import Profile from ".";
import {
  ProfileCardStyled,
  ProfileInfo,
  ProfileNameLink,
  ProfileAboutMe
} from "./Profile.styled";

type ProfileCardProps = {
  id: string;
  nickname?: string;
  aboutMe?: string;
  size?: "sm" | "md" | "lg";
  isFollowed: boolean;
};

const sizeGroup = {
  sm: {
    margin: "1rem 0rem",
    profileSize: 2.5,
    nameSize: "1em",
    aboutMeSize: "0.75rem",
  },
  md: {
    margin: "1.5rem 0rem",
    profileSize: 4,
    nameSize: "1.25em",
    aboutMeSize: "1rem",
  },
  lg: {
    margin: "2rem 0rem",
    profileSize: 6,
    nameSize: "1.5em",
    aboutMeSize: "1rem",
  },
  xlg: {
    margin: "2.5rem 0rem",
    profileSize: 8,
    nameSize: "1.75em",
    aboutMeSize: "1rem",
  },
};

const ProfileCard = ({
  id,
  nickname,
  size = "md",
  aboutMe,
  isFollowed,
}: ProfileCardProps) => {
  return (
    <ProfileCardStyled $margin={sizeGroup[size].margin}>
      <Profile profileID={id} size={sizeGroup[size].profileSize}></Profile>
      <ProfileInfo>
        <span>
          <ProfileNameLink
            href={`/${nickname}`}
            className="profile-name"
            size={sizeGroup[size].nameSize}
          >
            {nickname} 성우
          </ProfileNameLink>
        </span>
        <ProfileAboutMe size={sizeGroup[size].aboutMeSize}>
          {aboutMe}
        </ProfileAboutMe>
      </ProfileInfo>
      <FollowButton target={id} isFollowed={isFollowed} />
    </ProfileCardStyled>
  );
};

export default ProfileCard;
