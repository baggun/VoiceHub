"use client";

import { AuthForm, ErrorMsg } from "./Form";
import SubmitButton from "../button/SubmitButton";
import { AuthInput } from "@components/common/input";

import useForm from "@hooks/useForm";
import { login } from "@apis/api/users";
import { UserLoginData } from "@type/user";
import { saveUserStorage } from "@utils/storage";
import { LoginValidation } from "@utils/validate";
import { useRouter, useSearchParams } from "next/navigation";
import { useSetRecoilState } from "recoil";
import { userState } from "@/recoil/user/atom";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";

const LoginForm = () => {
  const session = useSession();
  const router = useRouter();
  const setUser = useSetRecoilState(userState);

  const searchParams = useSearchParams();
  const redirect_to: string = decodeURIComponent(searchParams.get("redirect_to") || "/");

  // if (session.status === "authenticated") {
  //   router?.back();
  // }

  const { values, errors, isLoading, handleChange, handleSubmit, interpretMessage } = useForm<UserLoginData>({
    initValues: { id: "", password: "" },
    onSubmit: async (values: UserLoginData) => {
      try {
        // const res = await login(values);

        const res = await signIn("credentials", { ...values, redirect: false });
        if (res?.error) {
          console.error("!!!!!!!! 로그인 에러", res);
          // interpretMessage(res);
        } else {
          router.push(redirect_to);
        }
        // router.push("/");
        // router.back();

        /* 
        // console.log("로그인", res);
        if (res.success) {
          // 일단은 메인으로, 나중에는 이전 페이지로 간다거나 할 수 있음
          saveUserStorage(res.user.user_nickname);

          setUser({
            _id: res.user._id,
            id: res.user.user_id,
            nickname: res.user.user_nickname,
            profile: res.user.user_profile,
          });

          router.push("/");
        } else {
          interpretMessage(res);
        }
        */
      } catch (err) {
        console.error(err);
      }
    },
    validate: LoginValidation,
  });

  return (
    <>
      <h1>안녕하세요!</h1>
      <p>어쩌구 저쩌구 블라 블라 갈갈갈갈 어쩌구 저쩌구</p>
      {JSON.stringify(errors)}
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
    </>
  );
};
export default LoginForm;
