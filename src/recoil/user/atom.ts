import { DefaultValue, atom, atomFamily, selector } from "recoil";
import { recoilPersist } from "recoil-persist";
import { UserData } from "@/types/user";

const localStorage = typeof window !== "undefined" ? window.localStorage : undefined;

const { persistAtom } = recoilPersist({
  key: "useStorage", // 고유한 key 값
  storage: localStorage,
});

/********************************************
 *
 *      Map
 *
 ********************************************/
export const userState = atom<UserData>({
  key: "userState",
  default: {
    _id: "",
    id: "",
    nickname: "",
    profile: "",
  },
  effects_UNSTABLE: [persistAtom],
});
