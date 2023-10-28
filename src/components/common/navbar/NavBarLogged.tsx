"use client";

import Link from "next/link";
import { css, styled } from "styled-components";
import { NavBarNavLink } from ".";
import ProfileNav from "@/components/profile/ProfileNav";
import { IconBell, IconPlus } from "@tabler/icons-react";
import { useRecoilValue } from "recoil";
import { userState } from "@/recoil/user/atom";
import React from "react";

// export async function getServerSideProps() {
//     // Fetch data from external API
//     const res = await fetch(`https://localhost:3000/api/user/autologin`)
//     const data = await res.json()

//     // Pass data to the page via props
//     return { props: { data } }
//   }

const NavBarLogged = () => {
  const user = useRecoilValue(userState);

  // React.useEffect(() => {

  // }, []);

  const [mounted, setMounted] = React.useState<boolean>(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {/* {JSON.stringify()} */}
      {user && user.id !== "" ? (
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
