"use client";

import styled from "styled-components";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

import { AuthInput } from "@common/input";
import { ErrorMsg } from "@common/form/Form";
import SubmitButton from "@common/button/SubmitButton";

import { changePassword } from "@utils/apis/api/setting";
import { clearUserStorage } from "@utils/storage";
import { ChangePasswordValidation } from "@utils/validate";
import { UserChangePasswordData } from "@type/user";
import useForm from "@hooks/useForm";
import Label from "../common/Label";

const SettingPassword = () => {
  const router = useRouter();
  const { values, errors, isLoading, handleChange, handleSubmit, interpretMessage } = useForm<UserChangePasswordData>({
    initValues: { prev_password: "", next_password: "" },
    onSubmit: async (values: UserChangePasswordData) => {
      if (!values.next_password || !values.prev_password) return;

      await changePassword(values.prev_password, values.next_password)
        .then(res => {
          if (res && res.ok && res.success) {
            // clearUserStorage();
            signOut().then(() => router.push("/auth/login"));
            return;
          }

          interpretMessage({
            success: false,
            error: "prev_password",
            message: "현재 비밀번호가 틀립니다.",
          });
        })
        .catch(err => { 
          interpretMessage({
            success: false,
            error: "prev_password",
            message: "새로고침후 재시도해주세요.",
          });
        });
    },
    validate: ChangePasswordValidation,
  });

  return (
    <PasswordForm onSubmit={handleSubmit}>
      <div className="form-group">
        <Label htmlFor="prev_password" $require>
          이전 비밀번호
        </Label>
        <AuthInput
          id="prev_password"
          type="password"
          placeholder="********"
          name="prev_password"
          value={values.prev_password}
          onChange={handleChange}
        />
        {errors.prev_password && <ErrorMsg>{errors.prev_password}</ErrorMsg>}
      </div>
      <div className="form-group">
        <Label htmlFor="next_password" $require>
          변경할 비밀번호
        </Label>
        <AuthInput
          id="next_password"
          type="password"
          placeholder="********"
          name="next_password"
          value={values.next_password}
          onChange={handleChange}
        />
        {errors.next_password && <ErrorMsg>{errors.next_password}</ErrorMsg>}
      </div>
      <SubmitButton disabled={isLoading || values.prev_password === "" || values.next_password === ""}>
        변경하기
      </SubmitButton>
    </PasswordForm>
  );
};

export default SettingPassword;

const PasswordForm = styled.form`
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
