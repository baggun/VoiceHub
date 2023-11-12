"use client";

import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";

import { Button } from "../../common/button";
import { MainLayout } from "@/components/layout";
import { ContainerFluid } from "@/components/common/Grid";

import auth_bg from "/public/img/auth_bg.png";

type NotFoundProps = {
  message?: string;
  redirect?: string;
};

const NotFoundLayout = ({
  message = "존재하는 컨텐츠가 아니거나 삭제된 컨텐츠입니다.",
  redirect = "/",
}: NotFoundProps) => {
  return (
    <MainLayout>
      <ContainerFluid className="pd-none">
        <NotFoundContainer>
          <CodeH1>404</CodeH1>
          <h2>{message}</h2>
          <Image src={auth_bg} alt="1" />
          <Link href={redirect}>
            <Button $borderRadius="0.5rem">돌아가기</Button>
          </Link>
        </NotFoundContainer>
      </ContainerFluid>
    </MainLayout>
  );
};
export default NotFoundLayout;

const CodeH1 = styled.h1`
  font-size: 3rem;
  color: ${({ theme }) => theme.colors.primary};
`;
const NotFoundContainer = styled.div`
  text-align: center;
  margin-top: 10rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;
