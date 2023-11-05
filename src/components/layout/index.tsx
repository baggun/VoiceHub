"use client";

import Image from "next/image";
import styled from "styled-components";
import { useRouter } from "next/navigation"; 
import React, { CSSProperties } from "react";
import { useSession } from "next-auth/react";

import Header from "./Header";
import Footer from "./Footer";
import { AuthCard } from "../common/card"; 
import LogoButton from "../common/button/LogoButton";
import { Container, MobileWrapper, MobileContainer } from "../common/Grid";

import auth_bg from "/public/img/auth_bg.png";
import auth_bg_2 from "/public/img/auth_bg_2.png";

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
