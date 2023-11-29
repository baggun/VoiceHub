import { atom } from "recoil";

/********************************************
 *
 *      Search
 *
 ********************************************/
export const searchModalState = atom<boolean>({
  key: "searchModalState",
  default: false,
});
export const searchState = atom<string>({
  key: "searchState",
  default: "",
});

