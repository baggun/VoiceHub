"use client";

import styled from "styled-components";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { resetUser } from "@modules/users";

import { AuthInput } from "@common/input";
import { ErrorMsg } from "@common/form/Form";
import SubmitButton from "@common/button/SubmitButton";

import { changePassword } from "@apis/api/setting";
import { clearUserStorage } from "@utils/storage";
import { ChangePasswordValidation } from "@utils/validate";
import { UserChangePasswordData } from "@type/user";
import useForm from "@hooks/useForm";
import { useRouter } from "next/navigation";
import { useSetRecoilState } from "recoil";
import { userState } from "@/recoil/user/atom";

const SettingPassword = () => {
  const router = useRouter();
  const setUser = useSetRecoilState(userState);
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  const { values, errors, isLoading, handleChange, handleSubmit, interpretMessage } = useForm<UserChangePasswordData>({
    initValues: { prev_password: "", next_password: "" },
    onSubmit: async (values: UserChangePasswordData) => {
      if (!values.next_password || !values.prev_password) return;

      await changePassword(values.prev_password, values.next_password)
        .then(res => {
          if (res && res.success) {
            clearUserStorage();

            // dispatch(resetUser());
            setUser({
              _id: "",
              id: "",
              nickname: "",
              profile: "",
            });
            router.push("/auth/login");

            return;
          } else
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
        <AuthInput
          type="password"
          placeholder="이전 비밀번호"
          name="prev_password"
          value={values.prev_password}
          onChange={handleChange}
        />
        {errors.prev_password && <ErrorMsg>{errors.prev_password}</ErrorMsg>}
      </div>
      <div className="form-group">
        <AuthInput
          type="password"
          placeholder="변경할 비밀번호"
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
