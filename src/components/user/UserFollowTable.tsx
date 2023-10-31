import { digitK } from "@utils/format";
import { TabType } from "@type/tab";
import { FollowTable, InfoLink } from './UserFollowTable.styled';

type UserFollowTableProps = {
  tab: string;
  followers: number;
  followings: number;
};

const UserFollowTable = ({ tab, followers, followings }: UserFollowTableProps) => {
  // const searchParams = useSearchParams();
  // const tab: string | null = searchParams.get("tab");
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