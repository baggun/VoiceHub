"use client";

import Link from "next/link";
import { css, styled } from "styled-components";
import { NavBarNavLink } from ".";
import ProfileNav from "@/components/profile/ProfileNav";
import { IconBell, IconPlus } from "@tabler/icons-react";
import { useRecoilValue } from "recoil";
import { userState } from "@/recoil/user/atom";
import React from "react";
import { useSession } from "next-auth/react";

const NavBarLogged = () => {
  const { data: session } = useSession();
  // const user = useRecoilValue(userState);
  const [mounted, setMounted] = React.useState<boolean>(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <></>;

  return (
    <>
      {/* {user && user.id !== "" ? ( */}
      {session && session.user ? (
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
      )}
    </>
  );
};

export default NavBarLogged;

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

const ActLink = styled(Link)`
  ${ActStyled}
`;
