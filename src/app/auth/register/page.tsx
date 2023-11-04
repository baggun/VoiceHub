import React from "react";
import { LoginLayout } from "@components/layout";
import RegisterForm from "@components/common/form/RegisterForm";
import Link from "next/link";

const Login = ({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) => {
  const redirect_to = searchParams?.redirect_to || "/";

  return (
    <LoginLayout>
      <h1>반갑습니다!</h1>
      <p>회원가입 어쩌구 저쩌구 블라 블라 갈갈갈갈 어쩌구 저쩌구</p>
      <RegisterForm />
      <span className="lead-msg">
        <Link
          href={{
            pathname: "/auth/login",
            query: {
              redirect_to,
            },
          }}
        >
          로그인
        </Link>
      </span>
    </LoginLayout>
  );
};

export default Login;
