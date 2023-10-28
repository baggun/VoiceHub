import { UserData } from "@type/user";
import { UserResponseData, UserPureResData } from "@type/response/res_user";

/**
 * Key 형태를 가지고 오는 응답을 처리할때 사용함
 * @param data 
 * @returns 
 */
export const getUsersProcess = (data: UserResponseData[]): UserData[] => {
    return data.map((userRes: UserResponseData) => {
        const user: UserPureResData = userRes[Object.keys(userRes)[0]];
        return {
            _id: user._id,
            id: user.user_id,
            nickname: user.user_nickname,
            profile: user.user_profile || "",
        };
    });
};

/**
 * Key 형태를 가지지 않고 오는 응답을 처리할때 사용함
 * @param data 
 * @returns 
 */
export const getUsersPureProcess = (data: UserPureResData[]): UserData[] => {
    return data.map((userRes: UserPureResData) => {
        return {
            _id: userRes._id,
            id: userRes.user_id,
            nickname: userRes.user_nickname,
            profile: userRes.user_profile || "",
        };
    });
};
