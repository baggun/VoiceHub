"use client";

import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

import { AuthForm, ErrorMsg } from "./Form";
import SubmitButton from "../button/SubmitButton";
import { AuthInput } from "@components/common/input";

import useForm from "@hooks/useForm";
import { UserLoginData } from "@type/user";
import { LoginValidation } from "@utils/validate";

const LoginForm = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const redirect_to: string = decodeURIComponent(searchParams.get("redirect_to") || "/");

  const { values, errors, isLoading, handleChange, handleSubmit, interpretMessage } = useForm<UserLoginData>({
    initValues: { id: "", password: "" },
    onSubmit: async (values: UserLoginData) => {
      try {
        const res = await signIn("credentials", { ...values, redirect: false });

        if (res?.error) {
          interpretMessage(JSON.parse(res.error));
        } else {
          router.push(redirect_to);
        }
      } catch (err) {
        console.error(err);
      }
    },
    validate: LoginValidation,
  });

  return (
    <AuthForm onSubmit={handleSubmit}>
      <div className="form-group">
        <AuthInput placeholder="ID" name="id" value={values.id} onChange={handleChange} />
        {errors.id && <ErrorMsg className="errorMessage">{errors.id}</ErrorMsg>}
      </div>
      <div className="form-group">
        <AuthInput
          type="password"
          placeholder="Password"
          name="password"
          value={values.password}
          onChange={handleChange}
        />
        {errors.password && <ErrorMsg>{errors.password}</ErrorMsg>}
      </div>
      <SubmitButton disabled={isLoading || values.id === "" || values.password === ""}>로그인</SubmitButton>
    </AuthForm>
  );
};
export default LoginForm;
