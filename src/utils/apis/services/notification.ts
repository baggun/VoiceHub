import { IssueFilterType, IssueType } from "@type/issue";
import { NotificationResponseData } from "@type/response/res_notification";
import { UserPureResData } from "@type/response/res_user";

export const getNotificationsProcess = (user_id: string, data: NotificationResponseData[]): IssueType[] => {
  const getMsgWithLink = (noticeType: IssueFilterType, target: UserPureResData, message: string): string[] => {
    let msg = "";
    let link = "";
    switch (noticeType) {
      case "comment-post":
        msg = `${target.user_nickname}님이 게시글에 댓글을 남겼습니다.`;
        link = `/post/${message}`;
        break;
      case "comment-voice":
        msg = `${target.user_nickname}님이 ${message} 목소리에 댓글을 남겼습니다.`;
        link = `/${user_id}/${message}`;
        break;
      case "like-post":
        msg = `${target.user_nickname}님이 게시글에 좋아요를 남겼습니다.`;
        link = `/${message}`;
        break;
      case "like-voice":
        msg = `${target.user_nickname}님이 ${message} 목소리에 좋아요를 남겼습니다.`;
        link = `/${user_id}/${message}`;
        break;
      case "follow":
        msg = `${target.user_nickname}님이 당신을 팔로우했습니다.`;
        link = `/${target.user_id}`;
        break;
    }
    return [msg, link];
  };

  return data.map(({ _id, noticeType, target, message, date, $isRead }): IssueType => {
    const [msg, link] = getMsgWithLink(noticeType, target, message);
    return {
      id: _id,
      type: noticeType,
      target,
      message: msg,
      date: new Date(date),
      link: link,
      $isRead,
    };
  });
};
