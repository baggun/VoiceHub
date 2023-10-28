import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "@modules/index";

import Textarea from "@common/textarea";
import { Input, InputGroup } from "@common/input";
import SubmitButton from "@common/button/SubmitButton";
import { ProfileImg } from "@components/profile/ProfileImg";
import { IconPencil } from "@tabler/icons-react";

import { changeProfile } from "@apis/api/setting";
import useForm from "@hooks/useForm";

import Profile from "@components/profile";
import profile_temp from "@assets/img/profile_temp.png";
import { changeNickname } from "@modules/users";
import { getUser } from "@apis/api/users";
import Label from "@common/Label";

type SettingProfileData = {
    email: string;
    nickname: string;
    desc: string;
};

const SettingProfile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user_id } = useSelector(
        (state: RootState) => ({
            user_id: state.users.id,
        }),
        shallowEqual
    );
    const fileInputRef = React.useRef<any>(null);
    const [prevProfile, setPrevProfile] = React.useState<SettingProfileData>({
        email: "",
        nickname: "",
        desc: "",
    });
    const {
        values,
        setValues,
        errors,
        isLoading,
        handleChange,
        handleSubmit,
        interpretMessage,
    } = useForm<SettingProfileData>({
        initValues: { email: "", nickname: "", desc: "" },
        onSubmit: async (values: SettingProfileData) => {
            // if (!values.password) return;

            const res = await changeProfile(
                values.email,
                values.nickname,
                values.desc
            );
            if (res && res.success) {
                dispatch(changeNickname(values.nickname));
                setPrevProfile({ ...values });
                return;
            }

            interpretMessage(res);
        },
        validate: null,
    });

    const initUserData = async () => {
        if (!user_id) return;
        await getUser(user_id)
            .then((res) => {
                const prf = {
                    nickname: res.user.user_nickname,
                    email: res.user.user_email,
                    desc: res.user.user_desc,
                };
                setPrevProfile(prf);
                setValues(prf);
            })
            .catch((err) => navigate("/"));
    };

    React.useEffect(() => {
        initUserData();
    }, []);

    const handleAddImages = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const imageLists = event.target.files;

        if (imageLists == null || imageLists.length !== 1) {
            // 이미지 입력 안했음. 잘못된 행동
            return;
        }

        // 이미지 업로드
        try {
            const formData = new FormData();
            formData.append("image", imageLists[0]);

            // const res = await updateProfile(formData);

            // console.log(res);
            // if (res.success) {
            //     dispatch(setProfileImage(res.result));
            //     // setThumbnail(res.result.url);
            //     if (user)
            //         setUser({
            //             ...user,
            //             image: res.result,
            //         });
            // }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <SettingProfileForm onSubmit={handleSubmit}>
            <EditableProfile>
                <ProfileImg src={profile_temp} alt="profile" />
                <input
                    ref={fileInputRef}
                    type="file"
                    name="thumbnail_file"
                    onChange={handleAddImages}
                    style={{ display: "none" }}
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
                <Label htmlFor="nickname" require>이름</Label>
                <Input
                    id="nickname"
                    placeholder="닉네임"
                    name="nickname"
                    value={values.nickname}
                    onChange={handleChange}
                />
            </InputGroup>
            <InputGroup>
                <Label htmlFor="email" require>이메일</Label>
                <Input
                    id="email"
                    placeholder="이메일"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                />
            </InputGroup>
            <InputGroup>
                <Label htmlFor="desc">소개</Label>
                <Textarea
                    id="desc"
                    placeholder="자기소개"
                    name="desc"
                    value={values.desc}
                    onChange={handleChange}
                />
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
                        values.desc === prevProfile.desc)
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
    cursor: pointer;
    width: 6rem;
    height: 6rem;
    display: flex;
    position: relative;
    margin-bottom: 2rem;
`;
