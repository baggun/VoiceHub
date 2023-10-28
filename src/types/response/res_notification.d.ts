import { IssueFilterType } from "@type/issue";
import { UserPureResData } from "./res_user"

export type NotificationResponseData = {
    _id: string,
    noticeType: IssueFilterType,
    target: UserPureResData,
    message: string,
    date: Date,
    $isRead: boolean,
};