"use client";

import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

import { AuthForm, ErrorMsg } from "./Form";
import SubmitButton from "../button/SubmitButton";
import { AuthInput } from "@components/common/input";
import { RegisterValidation } from "@utils/validate";
import { UserRegisterData } from "@type/user";
import useForm from "@hooks/useForm";

const RegisterForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect_to: string = searchParams.get("redirect_to") || "/";

  const { values, errors, isLoading, handleChange, handleSubmit, interpretMessage } = useForm<UserRegisterData>({
    initValues: { id: "", nickname: "", email: "", password: "" },
    onSubmit: async (values: UserRegisterData) => {
      try {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        res.status === 201 && router.push(`/auth/login?redirect_to=${redirect_to}`);

        // const res = await register(values);

        // if (res.success) {
        //   router.push("/auth/login");
        // } else {
        //   interpretMessage(res);
        // }
      } catch (err) {
        console.error(err);
      }
    },
    validate: RegisterValidation,
  });
  return (
    <>
      <h1>반갑습니다!</h1>
      <p>회원가입 어쩌구 저쩌구 블라 블라 갈갈갈갈 어쩌구 저쩌구</p>

      <AuthForm onSubmit={handleSubmit}>
        <div className="form-group">
          <AuthInput placeholder="ID" name="id" value={values.id} onChange={handleChange} />
          {errors.id && <ErrorMsg>{errors.id}</ErrorMsg>}
        </div>
        <div className="form-group">
          <AuthInput type="email" placeholder="Email" name="email" value={values.email} onChange={handleChange} />
          {errors.email && <ErrorMsg>{errors.email}</ErrorMsg>}
        </div>
        <div className="form-group">
          <AuthInput placeholder="Nickname" name="nickname" value={values.nickname} onChange={handleChange} />
          {errors.nickname && <ErrorMsg>{errors.nickname}</ErrorMsg>}
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
        <SubmitButton disabled={isLoading || values.email === "" || values.nickname === "" || values.password === ""}>
          회원가입
        </SubmitButton>
      </AuthForm>
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
    </>
  );
};

export default RegisterForm;
