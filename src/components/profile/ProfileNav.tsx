"use client";

import React from "react";
import styled from "styled-components";

import { ProfileImg } from "./ProfileImg";
import { ModalBackground } from "@common/modal";
import { Nav, NavItem, NavItemDivider } from "@common/nav";
import { NavBarDropdown } from "@common/navbar/NavBarDropdown";
import { signOut, useSession } from "next-auth/react";

const ProfileNav = () => {
  const { data: session } = useSession();
  const [openDropdown, setOpenDropdown] = React.useState<boolean>(false);

  const logoutHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      signOut();
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="d-flex p-relative">
      <HeaderProfile onClick={() => setOpenDropdown(!openDropdown)}>
        <ProfileImg src={"/img/profile_temp.png"} alt="profile" />
      </HeaderProfile>
      {/* <Profile profileID={"aa"}></Profile> */}
      {openDropdown && (
        <>
          <NavBarDropdown>
            <Nav $direction="column">
              {/* <NavItem to={`/${user.id}`}>내 프로필</NavItem> */}
              <NavItem to={`/${session?.user?.id}`}>내 프로필</NavItem>
              <NavItem to="/">작업물</NavItem>
              <NavItem to="/">게시글 목록</NavItem>
              <NavItem to="/">좋아요 목록</NavItem>
              <NavItemDivider />
              <NavItem to="/setting">설정</NavItem>
              <NavItemDivider />
              <NavItem onClick={logoutHandler}>로그아웃</NavItem>
            </Nav>
          </NavBarDropdown>
          <ModalBackground onClick={setOpenDropdown} />
        </>
      )}
    </div>
  );
};

export default ProfileNav;

const HeaderProfile = styled.div`
  width: 2rem;
  height: 2rem;
  cursor: pointer;
`;
