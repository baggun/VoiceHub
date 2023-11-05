"use client";

import styled from "styled-components";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { AuthInput } from "@common/input";
import { ErrorMsg } from "@common/form/Form";
import SubmitButton from "@common/button/SubmitButton";

import { deleteAccount } from "@apis/api/setting";
import { clearUserStorage } from "@utils/storage";
import { UserPasswordData } from "@type/user";
import useForm from "@hooks/useForm";


const SettingAccount = () => {
  const router = useRouter();
  const { data: session, update: sessionUpdate } = useSession();

  const { values, errors, isLoading, handleChange, handleSubmit, interpretMessage } = useForm<UserPasswordData>({
    initValues: { password: "" },
    onSubmit: async (values: UserPasswordData) => {
      if (!values.password) return;

      await deleteAccount(values.password)
        .then(res => {
          console.log(res);
          if (res && res.success) {
            clearUserStorage();

            sessionUpdate({
              _id: "",
              id: "",
              nickname: "",
              profile: "",
            });

            router.replace("/");

            return;
          } else {
            interpretMessage({
              success: false,
              error: "password",
              message: "현재 비밀번호가 틀립니다.",
            });
          }
        })
        .catch(err => {
          interpretMessage({
            success: false,
            error: "password",
            message: "새로고침후 재시도해주세요.",
          });
        });
    },
    validate: null,
  });

  return (
    <AccountForm onSubmit={handleSubmit}>
      <div>
        <h2>이 과정을 진행하면 복구할 수 없습니다 !</h2>
        <RemindMessage>정말로 탈퇴하시겠어요?</RemindMessage>
      </div>
      <div className="form-group">
        <AuthInput
          type="password"
          placeholder="비밀번호"
          name="password"
          value={values.password}
          onChange={handleChange}
        />
        {errors.password && <ErrorMsg>{errors.password}</ErrorMsg>}
      </div>
      <SubmitButton disabled={isLoading || values.password === ""}>계정 탈퇴하기</SubmitButton>
    </AccountForm>
  );
};

export default SettingAccount;

const AccountForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  ${({ theme }) => theme.devices.max_tablet} {
    padding: 2rem;
  }
  ${({ theme }) => theme.devices.max_only_mobile} {
    padding: 1rem;
  }
`;

const RemindMessage = styled.p`
  color: red;
  margin-top: 0.5rem;
`;
