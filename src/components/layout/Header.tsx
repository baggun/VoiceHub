"use client";

import React, { Suspense } from "react";
import { useSetRecoilState } from "recoil";
import styled, { css } from "styled-components";
import { searchModalState } from "@/recoil/search/atom";

import Search from "@components/search";
import { Container } from "@common/Grid";
import { ModalBackground } from "@common/modal";
import NavBarLogged from "@common/navbar/NavBarLogged";
import { NavBar, NavBarCollapse, NavBarNavLink, NavBarNav, NavLinkItemStyled } from "@components/common/navbar";
import { IconSearch } from "@tabler/icons-react";
import SearchModal from "../search/SearchModal";

type HeaderProps = {
  hideNavItems?: boolean;
};

const Header = ({ hideNavItems }: HeaderProps) => {
  const setOpenSearchModal = useSetRecoilState(searchModalState);

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

  return (
    <HeaderStyled className="App-header">
      <HeaderContainer>
        <NavBar>
          <NavBarCollapse>
            <NavBarNav className="hide-lg">
              {!hideNavItems &&
                menus.map(menu => (
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
            <Suspense fallback={<p>sdf</p>}>
              <NavBarLogged />
            </Suspense>
          </div>
        </NavBar>

        <SearchModal />
        
      </HeaderContainer>
      <HeaderDivider className="show-lg" />
      <SubHeaderContainer className="show-lg">
        <NavBarCollapse>
          <NavBarNav>
            {!hideNavItems &&
              menus.map(menu => (
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
  height: 4rem;
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
