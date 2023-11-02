// import { Link } from "react-router-dom";
import Link from "next/link";
import Profile, { ProfileProps } from ".";
import styled from "styled-components";
import { ProfileInfoBlock, ProfileInfoStyle } from "./Profile.styled";

const ProfileInfo = (props: ProfileProps) => {
  return (
    <ProfileInfoStyle>
      <Profile {...{ ...props, nickname: "" }}> </Profile>
      <ProfileInfoBlock>
        <h3>
          <Link href={`/${props.profileID}`}>{props.nickname}</Link>
        </h3>
        {props.children}
      </ProfileInfoBlock>
    </ProfileInfoStyle>
  );
};

export default ProfileInfo;
