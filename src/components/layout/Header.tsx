"use client";

import React from "react";
import styled, { css } from "styled-components";
// import { useSelector, useDispatch } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";

// import { RootState } from "@modules/index";
import { clearUserStorage, isLoggedIn } from "@utils/storage";
import { logout } from "@apis/api/users";
import { Container } from "@common/Grid";
import ProfileNav from "@components/profile/ProfileNav";
import {
  NavBar,
  NavBarCollapse,
  NavBarNavLink,
  NavBarNav,
  NavLinkItemStyled,
} from "@components/common/navbar";
import { IconBell, IconPlus } from "@tabler/icons-react";
import Search from "@components/search";
import { IconSearch } from "@tabler/icons-react";
import { ModalBackground } from "@common/modal";
import { useRecoilValue } from "recoil";
import { userState } from "@/recoil/user/atom";
import { useRouter } from "next/navigation";
import Link from "next/link";
import NavBarLogged from "../common/navbar/NavBarLogged";

type HeaderProps = {
  hideNavItems?: boolean;
};

const Header = ({ hideNavItems }: HeaderProps) => {
  const router = useRouter();
  // const user = useRecoilValue(userState);
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const user_id = useSelector((state: RootState) => state.users.id);
  const [openSearchModal, setOpenSearchModal] = React.useState<boolean>(false);
  const menus = [
    {
      name: "채용공고",
      link: "/contest",
    },
    // {
    //     name: "강의",
    //     link: "/lecture",
    // },
    {
      name: "대사",
      link: "/script",
    },
    {
      name: "커뮤니티",
      link: "/community",
    },
  ];

  const logoutHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const res = await logout();
      console.log(res);
      if (res.success) {
        // 일단은 메인으로, 나중에는 이전 페이지로 간다거나 할 수 있음
        clearUserStorage();
        router.push("/");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <HeaderStyled className="App-header">
      <HeaderContainer>
        <NavBar>
          <NavBarCollapse>
            <NavBarNav className="hide-lg">
              {!hideNavItems &&
                menus.map((menu) => (
                  <NavBarNavLink to={menu.link} key={menu.link}>
                    {menu.name}
                  </NavBarNavLink>
                ))}
            </NavBarNav>
          </NavBarCollapse>

          <div className="d-flex">
            <ActButton
              onClick={() => {
                setOpenSearchModal(true);
              }}
            >
              <IconSearch strokeWidth={1.5} />
            </ActButton>
            <NavBarLogged/>
            {/* {user && user.id !== '' && isLoggedIn() ? ( */}
            {/* {(user && user.id !== '') ? (
              // <button onClick={logoutHandler}>로그아웃</button>
              <>
                <ActLink href="/notifications">
                  <IconBell strokeWidth={1.5} />
                </ActLink>
                <ActLink href="/voice/upload">
                  <IconPlus strokeWidth={1.5} />
                </ActLink>
                <ProfileNav />
              </>
            ) : (
              <NavBarNavLink to="/auth/login">로그인</NavBarNavLink>
            )} */}
          </div>
        </NavBar>

        {openSearchModal && (
          <>
            <Search></Search>
            <ModalBackground onClick={setOpenSearchModal} />
          </>
        )}
      </HeaderContainer>
      <HeaderDivider className="show-lg" />
      <SubHeaderContainer className="show-lg">
        <NavBarCollapse>
          <NavBarNav>
            {!hideNavItems &&
              menus.map((menu) => (
                <NavBarNavLink to={menu.link} key={menu.link}>
                  {menu.name}
                </NavBarNavLink>
              ))}
          </NavBarNav>
        </NavBarCollapse>
      </SubHeaderContainer>
    </HeaderStyled>
  );
};

export default Header;

const HeaderStyled = styled.header`
  border-bottom: 1px solid #d7d7d7;
  background: white;
`;
const HeaderContainer = styled(Container)`
  padding: 1rem;
`;
const SubHeaderContainer = styled(Container)`
  padding: 0rem 0rem 0.5rem 0rem;
  ${NavBarCollapse} {
  }
  ${NavLinkItemStyled} {
    padding: 0rem;
    margin: 0rem 1rem;
    font-size: 0.875rem;
  }
`;
export const HeaderDivider = styled.hr`
  margin: 0.25rem 0rem;
  background: ${({ theme }) => theme.colors.lightGrey};
  height: 1px;
  border: 0;
`;

const ActStyled = css`
  display: flex;
  align-self: stretch;
  align-items: center;
  margin-right: 0.875rem;
  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
  color: ${({ theme }) => theme.colors.black};
  &:hover {
    opacity: 0.7;
  }
`;


const ActButton = styled.button`
  ${ActStyled}
  border: none;
  padding: 0px;
  background: transparent;
`;
