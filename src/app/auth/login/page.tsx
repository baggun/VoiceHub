import React from "react";
import { LoginLayout } from "@components/layout";
import LoginForm from "@components/common/form/LoginForm";
import Link from "next/link";

const Login = ({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) => {
  const redirect_to = searchParams?.redirect_to || "/";
  
  return (
    <LoginLayout>
      <h1>안녕하세요!</h1>
      <p>어쩌구 저쩌구 블라 블라 갈갈갈갈 어쩌구 저쩌구</p>
      <LoginForm />
      <span className="lead-msg">
        계정이 없으신가요?{" "}
        <Link
          href={{
            pathname: "/auth/register",
            query: {
              redirect_to,
            },
          }}
        >
          회원가입
        </Link>
      </span>
    </LoginLayout>
  );
};

export default Login;
