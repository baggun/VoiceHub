import { UserPureResData } from "./response/res_user";

/*********************************************************************
 *
 *      Issue 에 관련된 Type 들이 저장됩니다.
 *  
 *********************************************************************/
export type IssueFilterType = "follow" | "comment-voice" | "comment-post" | "like-voice" | "like-post";

export type IssueType = {
    id: string;
    type: IssueFilterType;
    target: UserPureResData;
    message: string;
    link: string;
    date: Date;
    $isRead: boolean;
};
