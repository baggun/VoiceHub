import { ErrorMsg } from "@utils/error";

/**
 * 알림 가져오기기
 * @returns 성공 여부
 */
export const getNotifications = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notification`, { cache: 'no-cache'});
    if (!res.ok) throw new Error("Failed to fetch data");
    return res.json();
  } catch (err) {
    throw ErrorMsg(err);
  }
};

/**
 * 알림 읽기
 * @param {string} notification_id notification id
 * @returns 성공 여부
 */
export const readNotification = async (notification_id: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notification`, {
      method: "PATCH",
      body: JSON.stringify({ notification_id }),
    });
    if (!res.ok) throw new Error("Failed to fetch data");
    return res.json();
  } catch (err) {
    throw ErrorMsg(err);
  }
};

/**
 * 알림 제거
 * @param {string} notification_id notification id
 * @returns 성공 여부
 */
export const deleteNotification = async (notification_id: string[]) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notification`, {
      method: "DELETE",
      body: JSON.stringify({ notification_id }),
    });
    if (!res.ok) throw new Error("Failed to fetch data");
    return res.json();
  } catch (err) {
    throw ErrorMsg(err);
  }
};
