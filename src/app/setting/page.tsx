"use client";

import React from "react";
import styled, { css } from "styled-components";
import { Card } from "@common/card";
import { DefaultLayout } from "@components/layout";
import { Button } from "@common/button";
import { IconBell, IconKey, IconUser, IconSettings } from "@tabler/icons-react";
import SettingPassword from "@components/setting/SettingPassword";
import SettingAccount from "@components/setting/SettingAccount";
import SettingProfile from "@components/setting/SettingProfile";
import SettingNotification from "@components/setting/SettingNotification";

type SettingFilterType = "profile" | "notification" | "password" | "account";

type FilterMenuType = {
    name: string;
    type: SettingFilterType;
    icon: JSX.Element;
};

const Setting = () => {
    const [filterType, setFilterType] =
        React.useState<SettingFilterType>("profile");
    const filterMenus: FilterMenuType[] = [
        {
            name: "프로필",
            type: "profile",
            icon: <IconUser strokeWidth={1} className="icon icon-md" />,
        },
        {
            name: "알림 설정",
            type: "notification",
            icon: <IconBell strokeWidth={1} className="icon icon-md" />,
        },
        {
            name: "비밀번호 변경",
            type: "password",
            icon: <IconKey strokeWidth={1} className="icon icon-md" />,
        },
        {
            name: "계정",
            type: "account",
            icon: <IconSettings strokeWidth={1} className="icon icon-md" />,
        },
    ];

    return (
        <DefaultLayout>
            <SettingCard>
                <div className="row">
                    <div className="col-lg-3">
                        <SettingMenuList>
                            {filterMenus.map((m) => (
                                <SettingMenu
                                    key={m.name}
                                    active={m.type === filterType}
                                >
                                    <Button
                                        width="100%"
                                        variant="transparent"
                                        onClick={() => setFilterType(m.type)}
                                        $withIcon={true}
                                    >
                                        {m.icon} {m.name}
                                    </Button>
                                </SettingMenu>
                            ))}
                        </SettingMenuList>
                    </div>
                    <div className="col-lg-9">
                        <SettingDetail>
                            {filterType === "profile" ? (
                                <SettingProfile />
                            ) : filterType === "password" ? (
                                <SettingPassword />
                            ) : filterType === "account" ? (
                                <SettingAccount />
                            ) : (
                                <SettingNotification />
                            )}
                        </SettingDetail>
                    </div>
                </div>
            </SettingCard>
        </DefaultLayout>
    );
};

export default Setting;

const SettingCard = styled(Card)`
    margin-top: 2rem;
    ${({ theme }) => theme.devices.max_tablet} {
        padding: 2rem;
    }
    ${({ theme }) => theme.devices.max_only_mobile} {
        padding: 0rem;
    }
`;

const SettingMenuList = styled.ul`
    margin-bottom: 3rem;
`;
const SettingMenu = styled.li<{ active?: boolean }>`
    border-left: 2px solid transparent;
    button {
        font-weight: 300;
    }
    ${(props) => 
        props.active && css`
            border-left: 2px solid var(--primaryColor);
            button {
                font-weight: 500;
                color: var(--primaryColor);
            }
            .icon {
                stroke-width: 2;
            }
            background-color: var(--lightPrimaryColor);
        `
    }
`;

const SettingDetail = styled.div`
    padding: 5rem;
`