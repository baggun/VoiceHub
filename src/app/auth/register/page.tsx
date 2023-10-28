import React from "react";
import { LoginLayout } from "@components/layout";
import RegisterForm from "@components/common/form/RegisterForm";

const Login = () => {
  return (
    <LoginLayout>
      <RegisterForm />
    </LoginLayout>
  );
};

export default Login;
