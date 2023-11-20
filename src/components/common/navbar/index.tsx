import React from "react";
import styled from "styled-components";
import Link from "next/link";
import LogoButton from "../button/LogoButton";
import { Url } from "next/dist/shared/lib/router/router";

export const NavBar = ({ children }: { children: React.ReactNode }) => {
  return (
    <NavBarStyle>
      <LogoButton />
      {children}
    </NavBarStyle>
  );
};

const NavBarStyle = styled.nav`
  display: flex;
  padding-left: 0;
  margin-top: 0;
  margin-bottom: 0; 
  list-style: none;
  align-items: center;
`;

export const NavBarCollapse = styled(NavBarStyle)`
  flex-basis: auto;
  flex-grow: 1;
  justify-content: space-between;
`;

export const NavBarNav = styled.ul`
  display: flex;
  align-items: center;
  padding-left: 0;
  margin-top: 0;
  margin-bottom: 0;
  list-style: none;
`;

export const NavLinkItemStyled = styled(Link)`
  padding: 0.5rem 1rem;
  color: black;
  font-weight: 400;
  &.active {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const NavBarNavLink = ({ children, to }: { children: React.ReactNode; to: Url }) => {
  return (
    <li>
      <NavLinkItemStyled href={to}>{children}</NavLinkItemStyled>
    </li>
  );
};

export const NavBarDropdown = styled.div`
  position: absolute;
  width: 10rem;
  top: 2.5rem;
  right: 0px;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.bg};
  border-radius: 1rem;
  box-shadow: 0px 0px 25px 5px rgba(50, 50, 50, 0.2);
  -webkit-box-shadow: 0px 0px 25px 5px rgba(50, 50, 50, 0.2);
  -moz-box-shadow: 0px 0px 25px 5px rgba(50, 50, 50, 0.2);
  z-index: ${({ theme }) => theme.zIndex.modal};
`;
