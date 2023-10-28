export type UserPureResData = {
    _id: string;
    user_id: string;
    user_nickname: string;
    user_desc?: string;
    user_profile?: string;
};

export type UserResponseData = {
    [key: string]: UserPureResData;
};
