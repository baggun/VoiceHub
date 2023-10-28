import styled, { css } from "styled-components";
// import { Link, useSearchParams } from "react-router-dom";
import { digitK } from "@utils/format";
import { TabType } from "@type/tab";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

type UserFollowTableProps = {
  followers: number;
  followings: number;
};

const UserFollowTable = ({ followers, followings }: UserFollowTableProps) => {
  const searchParams = useSearchParams();
  const tab: string | null = searchParams.get("tab");
  const tables: TabType[] = [
    {
      tab: "followers",
      title: "팔로워",
    },
    {
      tab: "following",
      title: "팔로윙",
    },
  ];

  const getNumber = (tab: string) => {
    if (tab === "followers") return followers;
    return followings;
  };

  return (
    <FollowTable>
      <tbody>
        <tr>
          {tables.map((t) => (
            <td key={t.tab}>
              <InfoLink
                href={{ search: `tab=${t.tab}` }}
                $active={tab === t.tab}
              >
                <h3 className="infolink-head">{t.title}</h3>
                <p className="infolink-count">
                  {digitK(getNumber(t.tab) || 0)}
                </p>
              </InfoLink>
            </td>
          ))}
        </tr>
      </tbody>
    </FollowTable>
  );
};

export default UserFollowTable;

const FollowTable = styled.table`
  position: relative;
  display: inline-table;
  // width: 10rem;
  margin-left: 6rem;
  // border-spacing: 1rem 0px;
  border-spacing: 2rem 0px;
  border-collapse: separate;
  z-index: 1;
  td {
    // width: 33.33%;
    // width: 50%;
  }
`;
const InfoLink = styled(Link)<{ $active: boolean }>`
  text-align: center;
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
  .infolink-head {
    font-weight: 400;
    font-size: 1rem;
  }
  .infolink-count {
    font-weight: 500;
  }
  ${(props) =>
    props.$active &&
    css`
      .infolink-head {
        font-weight: 500;
      }
      color: ${props.theme.colors.primary};
    `}
`;
