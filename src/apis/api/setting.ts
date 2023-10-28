import { client } from "../client";
import { ErrorMsg } from "@apis/utils/error";
import { UserLoginData, UserRegisterData } from "@type/user";

/**
 * 프로필 변경
 * @param email 
 * @param nickname 
 * @param desc 
 * @returns 성공 여부
 */
export const changeProfile = async (email: string, nickname: string, desc: string) => {
    try {
        const res = await client.patch(`/user/profile`, {
            email, nickname, desc
        });
        return res.data;
    } catch (err) {
        throw ErrorMsg(err);
    }
};


/**
 * 비밀번호 변경
 * @param password 현재 비번
 * @param repassword 변경할 비번
 * @returns 성공 여부
 */
export const changePassword = async (password: string, repassword: string) => {
    try {
        const res = await client.patch(`/user/password`, {
            password, repassword
        });
        return res.data;
    } catch (err) {
        throw ErrorMsg(err);
    }
};


/**
 * 계정 삭제
 * @param password 현재 비번
 * @returns 성공 여부
 */
export const deleteAccount = async (password: string) => {
    try {
        const res = await client.delete(`/user/account`, {
            data: { password }
        });
        return res.data;
    } catch (err) {
        throw ErrorMsg(err);
    }
};
