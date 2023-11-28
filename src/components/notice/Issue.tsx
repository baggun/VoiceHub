"use client";

import React from "react";
import styled, { css } from "styled-components";
// import { Link, useNavigate } from "react-router-dom";

import { IssueType } from "@type/issue";
import Checkbox from "@common/input/Checkbox";
import { dateFormat } from "@utils/format";
import { readNotification } from "@utils/apis/api/notification";
import { Button } from "@common/button";
import { IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Issue = ({
  issue,
  isAllChecked,
  checkedItemHandler,
  removeIssue,
}: {
  issue: IssueType;
  isAllChecked: boolean;
  checkedItemHandler: (id: string, isChecked: boolean) => void;
  removeIssue: (noti_id: string[]) => void;
}) => {
  const router = useRouter();
  // const navigate = useNavigate();
  const [bChecked, setChecked] = React.useState<boolean>(false);
  const [isHover, setIsHover] = React.useState<boolean>(false);

  const checkHandler = (checked: boolean) => {
    setChecked(!bChecked);
    checkedItemHandler(issue.id, checked);
  };

  React.useEffect(() => setChecked(isAllChecked), [isAllChecked]);

  const readIssue = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    const res = await readNotification(issue.id);
    if (res && res.success) router.push(issue.link);
  };

  return (
    <IssueBlock $isRead={issue.$isRead} onMouseOver={() => setIsHover(true)} onMouseOut={() => setIsHover(false)}>
      <Checkbox checked={bChecked} onChange={checkHandler} />
      <IssueLink href={issue.link} onClick={readIssue}>
        <p className="message">{issue.message}</p>
      </IssueLink>
      {isHover ? (
        <Button
          outline
          variant="primary"
          $withIcon
          $padding="0.25rem 0.5rem"
          $borderRadius="0.5rem"
          onClick={() => removeIssue([issue.id])}
        >
          <IconTrash className="icon" strokeWidth={1.25} width="1.25rem" height="1.25rem" />
        </Button>
      ) : (
        <IssueDate $isRead={issue.$isRead}>{dateFormat(issue.date)}</IssueDate>
      )}
    </IssueBlock>
  );
};

export default Issue;

const IssueLink = styled(Link)`
  display: flex;
  flex: 1 0 auto;
  margin-left: 1rem;
  align-items: center;
  color: #595959;
  .message {
    flex: 1 0 auto;
  }
`;
const IssueBlock = styled.li<{ $isRead: boolean }>`
  display: flex;
  padding: 0.5rem 1rem;
  // border-radius: 0.5rem;
  align-items: center;
  min-height: 3rem;
  background-color: white;
  ${props =>
    props.$isRead &&
    css`
      background-color: ${props.theme.colors.light_bg};
      ${IssueLink} {
        color: ${props.theme.colors.grey};
      }
    `}
  &:hover {
    background-color: ${({ theme }) => theme.colors.lightPrimary};
    ${IssueLink} {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
  .btn:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
  }
`;
const IssueDate = styled.span<{ $isRead: boolean }>`
  color: ${props => (props.$isRead ? props.theme.colors.grey : "#595959")};
`;
