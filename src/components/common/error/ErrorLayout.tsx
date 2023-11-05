"use client";

import Image from "next/image";
import styled from "styled-components";

import { Button } from "../button";
import { MainLayout } from "@/components/layout";
import { ContainerFluid } from "@/components/common/Grid";

import auth_bg from "/public/img/auth_bg.png";
import React from "react";

const ErrorLayout = ({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) => {
  React.useEffect(() => {
    console.error("에러!", error);
  }, [error]);

  return (
    <MainLayout>
      <ContainerFluid className="pd-none">
        <ErrorContainer>
          <CodeH1>ERROR !</CodeH1>
          <Image src={auth_bg} alt="1" />
          <Button onClick={() => reset()}>홈으로</Button>
        </ErrorContainer>
      </ContainerFluid>
    </MainLayout>
  );
};
export default ErrorLayout;

const CodeH1 = styled.h1`
  font-size: 3rem;
  color: ${({ theme }) => theme.colors.primary};
`;
const ErrorContainer = styled.div`
  text-align: center;
  margin-top: 10rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;
