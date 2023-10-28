import { client } from "../client";
import { ErrorMsg } from "@apis/utils/error";

/**
 * 알림 가져오기기
 * @returns 성공 여부
 */
export const getNotifications = async () => {
    try {
        const res = await client.get(`/notification`);
        return res.data;
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
        const res = await client.patch(`/notification`, { notification_id });
        return res.data;
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
        const res = await client.delete(`/notification`, { data: { notification_id } });
        return res.data;
    } catch (err) {
        throw ErrorMsg(err);
    }
};
