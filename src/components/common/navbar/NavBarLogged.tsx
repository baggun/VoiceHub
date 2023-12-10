"use client";

import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { css, styled } from "styled-components";

import { NavBarNavLink } from ".";
import ProfileNav from "@components/profile/ProfileNav";
import { IconBell, IconPlus } from "@tabler/icons-react";

const NavBarLogged = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [mounted, setMounted] = React.useState<boolean>(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <></>;

  return (
    <>
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
        <NavBarNavLink
          to={{
            pathname: "/auth/login",
            query: {
              redirect_to: encodeURIComponent(pathname),
            },
          }}
        >
          {" "}
          로그인
        </NavBarNavLink>
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
