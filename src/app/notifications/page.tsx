"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import styled, { css } from "styled-components";

import { Card } from "@common/card";
import { Button } from "@common/button";
import Issue from "@components/notice/Issue";
import Checkbox from "@common/input/Checkbox";
import { DefaultLayout } from "@components/layout";
import {
  IconCategory,
  IconHeadset,
  IconQuote,
  IconTrash,
  IconUser,
} from "@tabler/icons-react";

import { getNotificationsProcess } from "@utils/apis/services/notification";
import {
  deleteNotification,
  getNotifications,
} from "@utils/apis/api/notification";
import { IssueFilterType, IssueType } from "@type/issue";

type FilterMenuType = {
  name: string;
  type: IssueFilterType[];
  icon: JSX.Element;
};

const filterMenus: FilterMenuType[] = [
  {
    name: "전체",
    type: [
      "follow",
      "comment-post",
      "comment-voice",
      "like-post",
      "like-voice",
    ],
    icon: <IconCategory strokeWidth={1} className="icon icon-md" />,
  },
  {
    name: "유저",
    type: ["follow"],
    icon: <IconUser strokeWidth={1} className="icon icon-md" />,
  },
  {
    name: "목소리",
    type: ["comment-voice", "like-voice"],
    icon: <IconHeadset strokeWidth={1} className="icon icon-md" />,
  },
  {
    name: "커뮤니티",
    type: ["comment-post", "like-post"],
    icon: <IconQuote strokeWidth={1} className="icon icon-md" />,
  },
];

const Notification = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [issues, setIssues] = React.useState<IssueType[]>([]);
  const [filterType, setFilterType] = React.useState<IssueFilterType[]>(
    filterMenus[0].type
  );
  const [checkedItems, setCheckedItems] = React.useState<Set<string>>(
    new Set()
  );
  const [isAllChecked, setIsAllChecked] = React.useState<boolean>(false);

  const initNotifications = async () => {
    if (!session) return;
    const res = await getNotifications();
    setIssues(getNotificationsProcess(session.user?.id, res.notification));
  };

  React.useEffect(() => {
    initNotifications();
  }, [session]);

  React.useEffect(() => {
    setCheckedItems((prev) => {
      const newSet = new Set(prev);
      newSet.clear();
      return newSet;
    });
    setIsAllChecked(false);
  }, [filterType]);

  const allCheckedHandler = (isChecked: boolean) => {
    if (isChecked) {
      setCheckedItems(new Set(getFilteredIssues().map(({ id }) => id)));
      setIsAllChecked(true);
    } else {
      setCheckedItems((prev) => {
        const newSet = new Set(prev);
        newSet.clear();
        return newSet;
      });
      setIsAllChecked(false);
    }
  };

  const checkedItemHandler = (id: string, isChecked: boolean) => {
    if (isChecked) {
      setCheckedItems((prev) => {
        const newSet = new Set(prev);
        newSet.add(id);
        return newSet;
      });
    } else if (!isChecked && checkedItems.has(id)) {
      setCheckedItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };

  const getFilteredIssues = (): IssueType[] =>
    issues.filter((i) => filterType.includes(i.type));

  const removeIssues = async (noti_id: string[]) => {
    const res = await deleteNotification(noti_id);

    if (res && res.success) {
      setIssues(issues.filter((i) => !noti_id.includes(i.id)));
      setCheckedItems(new Set());
    }
  };

  return (
    <DefaultLayout>
      <Card>
        <div className="row">
          {/* 필터 메뉴 */}
          <div className="col-lg-3">
            <ul>
              {filterMenus.map((m) => (
                <IssueMenu $active={m.type === filterType} key={m.name}>
                  <Button
                    width="100%"
                    variant="transparent"
                    onClick={() => setFilterType(m.type)}
                    $withIcon={true}
                  >
                    {m.icon} {m.name}
                  </Button>
                </IssueMenu>
              ))}
            </ul>
          </div>
          <div className="col-lg-9">
            <IssueTable>
              {/* 이슈 헤더 */}
              <IssueHeader>
                <Checkbox
                  checked={isAllChecked}
                  onChange={(e) => allCheckedHandler(!isAllChecked)}
                  label={
                    checkedItems.size > 0
                      ? `${checkedItems.size} 개 선택`
                      : "전체 선택"
                  }
                />
                {checkedItems.size > 0 && (
                  <Button
                    outline
                    variant="black"
                    $withIcon={true}
                    $padding="0.25rem 0.5rem"
                    onClick={() => removeIssues(Array.from(checkedItems))}
                  >
                    <IconTrash
                      className="icon"
                      strokeWidth={1.25}
                      width="1.25rem"
                      height="1.25rem"
                    />
                    삭제
                  </Button>
                )}
              </IssueHeader>
              {/* 이슈 리스트 */}
              <ul>
                {getFilteredIssues().map((issue) => {
                  return (
                    <Issue
                      key={issue.id}
                      issue={issue}
                      isAllChecked={isAllChecked}
                      checkedItemHandler={checkedItemHandler}
                      removeIssue={removeIssues}
                    ></Issue>
                  );
                })}
              </ul>
            </IssueTable>
          </div>
        </div>
      </Card>
    </DefaultLayout>
  );
};

export default Notification;

const IssueTable = styled.div`
  background-color: ${({ theme }) => theme.colors.light_bg};
`;

const IssueHeader = styled.div`
  display: flex;
  height: 3.25rem;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.lightGrey};
  padding: 0.5rem 1rem;
  gap: 1rem;
  // border-radius: 1rem 1rem 0rem 0rem;
  // margin-bottom: 0.5rem;
  .icon {
    margin-right: 0.25rem;
  }
`;

const IssueMenu = styled.li<{ $active?: boolean }>`
  border-left: 2px solid transparent;
  button {
    font-weight: 300;
  }
  ${(props) =>
    props.$active &&
    css`
      border-left: 2px solid var(--primaryColor);
      button {
        font-weight: 500;
        color: var(--primaryColor);
      }
      .icon {
        stroke-width: 2;
      }
      background-color: var(--lightPrimaryColor);
    `}
`;
