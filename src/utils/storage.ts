const USER_ID = "user_id" as const;
const LOGGED_IN = "logged_in" as const;

/**
 * 유저 데이터 localstorage에 저장. 로그인 성공 시 호출
 * @param user_id 유저 아이디
 */
export const saveUserStorage = (user_id: string) => {
    localStorage.setItem(USER_ID, user_id);
    localStorage.setItem(LOGGED_IN, "true");
};

/**
 * 유저 데이터 localstorage에서 삭제. 로그아웃 호출
 */
export const clearUserStorage = () => {
    localStorage.removeItem(USER_ID);
    localStorage.removeItem(LOGGED_IN);
};

/**
 * 로그인 완료 했는지 확인
 * @returns 성공 여부
 */
export const isLoggedIn = () : boolean => {
    return localStorage.getItem(LOGGED_IN) === "true";
};

/**
 * 로그인 중인 유저 확인
 * @returns 로그인 중이라면 유저 ID, 아니라면 null
 */
export const getLoggeInUser = () : string | null => {
    return localStorage.getItem(USER_ID);
}
