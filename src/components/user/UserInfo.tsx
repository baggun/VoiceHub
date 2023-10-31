import Tag from "@/components/common/tag";
import { RecommendH2 } from "@common/Heading";
import { IconMail, IconMapPin, IconPhone } from "@tabler/icons-react";
import {
  UserAboutMe,
  UserInfoListBlock,
  UserInfoList,
  UserAssociatedTags,
} from "./UserInfo.styled";
import { UserProfileData } from "@type/user";

type UserInfoProps = {
  className?: string;
  profieData: UserProfileData;
  associatedTags?: string[];
};

const UserInfo = ({ profieData, className, associatedTags }: UserInfoProps) => {
  return (
    <div className={className}>
      {profieData.user_desc && (
        <UserAboutMe>{profieData.user_desc}</UserAboutMe>
      )}
      <UserInfoListBlock>
        <ul>
          <UserInfoList>
            <IconMapPin />
            Seoul. Sung book
          </UserInfoList>
          <UserInfoList>
            <IconPhone />
            010-1234-4321
          </UserInfoList>
          {profieData.user_email && (
            <UserInfoList>
              <IconMail />
              {profieData.user_email}
            </UserInfoList>
          )}
        </ul>
      </UserInfoListBlock>
      <UserAssociatedTags>
        <RecommendH2>관련 태그</RecommendH2>
        {associatedTags?.map((tag) => (
          <Tag key={tag} tag={tag} />
        ))}
      </UserAssociatedTags>
    </div>
  );
};

export default UserInfo;
