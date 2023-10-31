"use client";

import React from "react";
import styled from "styled-components";
// import { RootState } from "@modules/index";
// import { resetUser } from "@modules/users";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";

import { clearUserStorage } from "@utils/storage";
import { logout } from "@apis/api/users";

import { ProfileImg } from "./ProfileImg";
import { ModalBackground } from "@common/modal";
import { Nav, NavItem, NavItemDivider } from "@common/nav";
import { NavBarDropdown } from "@common/navbar/NavBarDropdown";
// import profile_temp from "@assets/img/profile_temp.png";
import { useRecoilState } from "recoil";
import { useRouter } from "next/navigation";
import { userState } from "@/recoil/user/atom";

const ProfileNav = () => {
  // const router = useRouter();
  const [user, setUser] = useRecoilState(userState);
  const [openDropdown, setOpenDropdown] = React.useState<boolean>(false);

  const logoutHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const res = await logout();
      console.log(res);
      if (res.success) {
        // 일단은 메인으로, 나중에는 이전 페이지로 간다거나 할 수 있음
        clearUserStorage();

        
        // dispatch(resetUser());
        setUser({
          _id: "",
          id: "",
          nickname: "",
          profile: "",
        });

        // navigate("/");
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="d-flex p-relative">
      <HeaderProfile onClick={() => setOpenDropdown(!openDropdown)}>
        <ProfileImg src={'/img/profile_temp.png'} alt="profile" />
      </HeaderProfile>
      {/* <Profile profileID={"aa"}></Profile> */}
      {openDropdown && (
        <>
          <NavBarDropdown>
            <Nav $direction="column">
              <NavItem to={`/${user.id}`}>내 프로필</NavItem>
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
