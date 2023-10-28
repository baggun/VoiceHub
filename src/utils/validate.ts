import { UserChangePasswordData, UserLoginData, UserRegisterData } from "@type/user";

/**
 * 글자수 검사
 * @param value 글자
 * @param minCount 최소 글자수
 * @param maxCount 최대 글자수
 * @returns 문제가 있다면 true, 없다면 false
 */
const characterCountValidate = (
    value: string,
    minCount: number,
    maxCount?: number
) => {
    let check = false;
    if (value.length < minCount) check = true;
    if (maxCount && value.length > maxCount) return true;
    return check;
};

export const LoginValidation = ({
    id,
    password,
}: UserLoginData): UserLoginData => {
    const errors: UserLoginData = {};

    if (!id) {
        errors.id = "아이디가 입력되지 않았습니다.";
    } else if (characterCountValidate(id, 4)) {
        errors.id = "4자 이상의 아이디를 사용해야 합니다.";
    }

    if (!password) {
        errors.password = "비밀번호가 입력되지 않았습니다.";
    } else if (characterCountValidate(password, 8)) {
        errors.password = "8자 이상의 패스워드를 사용해야 합니다.";
    }

    return errors;
};

export const RegisterValidation = ({
    id,
    nickname,
    email,
    password,
}: UserRegisterData): UserRegisterData => {
    const errors: UserRegisterData = {};

    if (!id) {
        errors.id = "아이디가 입력되지 않았습니다.";
    } else if (characterCountValidate(id, 4)) {
        errors.id = "4자 이상의 아이디를 사용해야 합니다.";
    }

    if (!nickname) {
        errors.nickname = "이름이 입력되지 않았습니다.";
    }
    /*
    else if (Some regex validation) {
      errors.nickname = 'Some error text';
    } 
    */

    if (!email) {
        errors.email = "이메일이 입력되지 않았습니다.";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
        errors.email = "입력된 이메일이 유효하지 않습니다.";
    }

    if (!password) {
        errors.password = "비밀번호가 입력되지 않았습니다.";
    } else if (characterCountValidate(password, 8)) {
        errors.password = "8자 이상의 패스워드를 사용해야 합니다.";
    }

    return errors;
};

export const ChangePasswordValidation = ({
    prev_password,
    next_password,
}: UserChangePasswordData) : UserChangePasswordData => {
    const errors: UserChangePasswordData = {};
    
    if (!prev_password) {
        errors.prev_password = "비밀번호가 입력되지 않았습니다.";
    } else if (characterCountValidate(prev_password, 8)) {
        errors.prev_password = "8자 이상의 패스워드를 사용해야 합니다.";
    }
    
    if (!next_password) {
        errors.next_password = "비밀번호가 입력되지 않았습니다.";
    } else if (characterCountValidate(next_password, 8)) {
        errors.next_password = "8자 이상의 패스워드를 사용해야 합니다.";
    }
    
    return errors;
}
