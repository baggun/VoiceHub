export type UserPasswordData = {
  password?: string;
};

export type UserLoginData = UserPasswordData & {
  id?: string;
};

export type UserRegisterData = UserLoginData & {
  email?: string;
  nickname?: string;
};

export type UserChangePasswordData = {
  prev_password?: string;
  next_password?: string;
};

export type UserData = {
  _id: string;
  id: string;
  nickname: string;
  profile: string;
};

export type UserProfileData = {
  user_id: string;
  user_desc: string;
  user_email: string;
  user_nickname: string;
  user_profile: string;
  isFollowed: boolean;
  followers: number;
  followings: number;
};

export type SettingProfileData = {
  email: string;
  nickname: string;
  desc: string;
  profile: string;
};