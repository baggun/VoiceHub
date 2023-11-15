import { ErrorMsg } from "@utils/error";

/**
 * 태그 생성
 * @param {string[]} tags 생성할 태그들
 * @returns 성공 여부
 */
export const createTags = async (tags: string[]) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tag`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tags),
    });
    if (!res.ok) throw new Error("Failed to fetch data");
    return res.json();
  } catch (err) {
    throw ErrorMsg(err);
  }
};

export const getTags = async (tag_name: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tag/${tag_name}`);
    if (!res.ok) throw new Error("Failed to fetch data");
    return res.json();
  } catch (err) {
    throw ErrorMsg(err);
  }
};
