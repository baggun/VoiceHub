import { ErrorMsg } from "@apis/utils/error";
import { UserLoginData, UserRegisterData } from "@type/user";

/**
 * 이미지 업로드
 * @param {FormData} formData Form ('image'가 포함된)
 * @returns 성공 여부
 */
export const uploadImage = async (formData: FormData) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload`, {
      method: "POST",
      body: formData,
    });
    if (!res.ok) throw new Error("Failed to fetch data");
    return res.json();
  } catch (err) {
    throw ErrorMsg(err);
  }
};
