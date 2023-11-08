"use client";

import React from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import Label from "@common/Label";
import Textarea from "@common/textarea";
import { Input, InputGroup } from "@common/input";
import SubmitButton from "@common/button/SubmitButton";
import { ProfileImg } from "@components/profile/ProfileImg";
import { IconPencil } from "@tabler/icons-react";

import { getUser } from "@apis/api/users";
import { uploadImage } from "@/apis/api/upload";
import { changeProfile } from "@apis/api/setting";
import { SettingProfileData } from "@/types/user";
import useForm from "@hooks/useForm";

const SettingProfile = () => {
  const router = useRouter();
  const { data: session, update: sessionUpdate } = useSession();
  // if (!session) return <></>; 
  const fileInputRef = React.useRef<any>(null);

  const [prevProfile, setPrevProfile] = React.useState<SettingProfileData>({
    email: "",
    nickname: "",
    desc: "",
    profile: '',
  });
  
  const { values, setValues, errors, isLoading, handleChange, handleSubmit, interpretMessage } =
    useForm<SettingProfileData>({
      initValues: { email: "", nickname: "", desc: "", profile: '' },
      onSubmit: async (values: SettingProfileData) => {
        // if (!values.password) return;

        const res = await changeProfile(values);
        console.log(res);
        if (res && res.success) {
          sessionUpdate({ nickname: values.nickname, profile: values.profile });
          setPrevProfile({ ...values });
          return;
        }

        interpretMessage(res);
      },
      validate: null,
    });


  const initUserData = async () => {
    if (!session || !session.user.id) return;
    await getUser(session.user.id)
      .then(res => {
        const prf = {
          nickname: res.user.user_nickname,
          email: res.user.user_email,
          desc: res.user.user_desc,
          profile: res.user.user_profile,
        };
        setPrevProfile(prf);
        setValues(prf);
      })
      .catch(err => router.replace("/"));
  };

  React.useEffect(() => {
    initUserData();
  }, [session]);
  

  const handleAddImages = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const imageLists = event.target.files;

    if (imageLists == null || imageLists.length !== 1) {
      // 이미지 입력 안했음. 잘못된 행동
      return;
    }

    // 이미지 업로드
    try {
      const formData = new FormData();
      formData.append("image", imageLists[0]);

      const res = await uploadImage(formData);
      if (res.success && res.files.length > 0) {
        setValues({ ...values, profile: res.files[0] });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <SettingProfileForm onSubmit={handleSubmit}>
      <EditableProfile>
        <ProfileImg src={values.profile} alt="" />
        <input
          ref={fileInputRef}
          type="file"
          name="thumbnail_file"
          onChange={handleAddImages}
          style={{ display: "none" }}
          accept="image/*"
        />
        <InputImageButton
          onClick={(e: any) => {
            e.preventDefault();
            e.stopPropagation();
            fileInputRef.current.click();
          }}
        >
          <IconPencil strokeWidth={1.25} width={20} height={20} />
        </InputImageButton>
      </EditableProfile>
      <InputGroup>
        <Label htmlFor="nickname" $require>
          이름
        </Label>
        <Input id="nickname" placeholder="닉네임" name="nickname" value={values.nickname} onChange={handleChange} />
      </InputGroup>
      <InputGroup>
        <Label htmlFor="email" $require>
          이메일
        </Label>
        <Input id="email" placeholder="이메일" name="email" value={values.email} onChange={handleChange} />
      </InputGroup>
      <InputGroup>
        <Label htmlFor="desc">소개</Label>
        <Textarea id="desc" placeholder="자기소개" name="desc" value={values.desc} onChange={handleChange} />
      </InputGroup>
      <InputGroup>
        <Label htmlFor="phone">번호</Label>
        <Input id="phone" placeholder="010-0000-0000" name="phone" />
      </InputGroup>
      <SubmitButton
        disabled={
          isLoading ||
          (values.email === prevProfile.email &&
            values.nickname === prevProfile.nickname &&
            values.desc === prevProfile.desc &&
            values.profile === prevProfile.profile)
        }
      >
        저장
      </SubmitButton>
    </SettingProfileForm>
  );
};

export default SettingProfile;

const SettingProfileForm = styled.form`
  display: flex;
  -webkit-box-pack: center;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const InputImageButton = styled.button`
  position: absolute;
  right: -1rem;
  bottom: 0px;
  border: 1px solid ${({ theme }) => theme.colors.lightGrey};
  background: white;
  border-radius: 0.5rem;
`;

const EditableProfile = styled.div`
  width: 6rem;
  height: 6rem;
  display: flex;
  position: relative;
  margin-bottom: 2rem;
`;
