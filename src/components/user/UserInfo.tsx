import { RecommendH2 } from "@common/Heading";
import Tag from "@/components/common/tag";
import { IconMail, IconMapPin, IconPhone } from "@tabler/icons-react";
import { UserProfileData } from "@type/user";
import styled from "styled-components";

type UserInfoProps = {
    profieData: UserProfileData;
    className?: string;
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

const UserAboutMe = styled.div`
    padding: 1rem;
    color: #1b1b1b;
    font-weight: 300;
    font-size: 18px;
    background: #ede7f6;
    border-radius: 0rem 1rem 1rem 1rem;
    margin-bottom: 2rem;
`;
const UserInfoListBlock = styled.div`
    background: black;
    border-radius: 1rem;
    padding: 1rem 1.5rem;
`;
const UserInfoList = styled.li`
    display: flex;
    align-items: center;
    padding: 1.25rem 0rem;
    color: #d3d3d3;
    & + & {
        border-top: 1px solid #ffffff60;
    }
    .tabler-icon {
        margin-right: 1rem;
    }
`;
const UserAssociatedTags = styled.div`
    margin-bottom: 2rem;
`;
