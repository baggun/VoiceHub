"use client";

import React, { CSSProperties } from "react";
import Header from "./Header";
import Footer from "./Footer";

import { Container, MobileWrapper, MobileContainer } from "../common/Grid";
import { AuthCard } from "../common/card";
import { isLoggedIn } from "@/utils/storage";
import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";
// import { userState } from "@/recoil/user/atom";
import LogoButton from "../common/button/LogoButton";
import auth_bg from "/public/img/auth_bg.png";
import auth_bg_2 from "/public/img/auth_bg_2.png";
import styled from "styled-components";
import Image from "next/image";
import { useSession } from "next-auth/react";

export const DefaultLayout = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className="default-layout">
      <Header />
      <Container className={className}>{children}</Container>
      <Footer />
    </div>
  );
};

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="main-layout">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export const LoginLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  // const user = useRecoilValue(userState);
  const { data: session } = useSession();

  const logoStyle: CSSProperties = {
    height: "30px",
    position: "fixed",
    top: "1rem",
    left: "1rem",
  };

  if (session && session.user.id) {
    router.back();
  }

  // React.useEffect(() => {
  //   // if (session && session.user.id && isLoggedIn()) {
  //   if (session && session.user.id) {
  //     router.back();
  //   }
  // }, []);

  return (
    <MobileWrapper>
      <MobileContainer>
        <LogoButton style={logoStyle} />
        <BgCover1>
          <Image src={auth_bg} alt="1" />
        </BgCover1>
        <BgCover2>
          <Image src={auth_bg_2} alt="2" />
        </BgCover2>

        {/* <Route path="/auth/register" element={<Auth />} /> */}

        <AuthCard>{children}</AuthCard>
      </MobileContainer>
    </MobileWrapper>
  );
};

export const UploadLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="upload-layout">
      <Header hideNavItems />
      {children}
    </div>
  );
};

const BgCover1 = styled.div`
  position: fixed;
  top: 50%;
  left: 80%;
  transform: translate(-80%, -50%);
`;
const BgCover2 = styled.div`
  position: fixed;
  top: 50%;
  left: 20%;
  transform: translate(-20%, -50%);
`;
