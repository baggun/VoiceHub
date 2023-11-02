"use client";

import React from "react";
import styled from "styled-components";
import { InputGroup } from "@common/input";
import SwitchCheckbox from "@common/checkbox/SwitchCheckbox";

const SettingNotification = () => {
  const [checked, setChecked] = React.useState<boolean>(true);

  return (
    <div>
      <NotificationGroup>
        <NotificationHeader>E-mail 알림설정</NotificationHeader>
        <InputGroup>
          <SwitchCheckbox size="md" id="n0" checked={checked} onChange={setChecked}>
            좋아요 알림 받기
          </SwitchCheckbox>
        </InputGroup>
        <InputGroup>
          <SwitchCheckbox size="md" id="n0" checked={checked} onChange={setChecked}>
            팔로우 알림 받기
          </SwitchCheckbox>
        </InputGroup>
        <InputGroup>
          <SwitchCheckbox size="md" id="n0" checked={checked} onChange={setChecked}>
            신규 채용 알림 받기
          </SwitchCheckbox>
        </InputGroup>
        <InputGroup>
          <SwitchCheckbox size="md" id="n0" checked={checked} onChange={setChecked}>
            커뮤니티 알림 받기
          </SwitchCheckbox>
        </InputGroup>
      </NotificationGroup>

      <NotificationGroup>
        <NotificationHeader>모바일 알림설정</NotificationHeader>
        <InputGroup>
          <SwitchCheckbox size="md" id="n0" checked={checked} onChange={setChecked}>
            좋아요 알림 받기
          </SwitchCheckbox>
        </InputGroup>
        <InputGroup>
          <SwitchCheckbox size="md" id="n0" checked={checked} onChange={setChecked}>
            팔로우 알림 받기
          </SwitchCheckbox>
        </InputGroup>
        <InputGroup>
          <SwitchCheckbox size="md" id="n0" checked={checked} onChange={setChecked}>
            신규 채용 알림 받기
          </SwitchCheckbox>
        </InputGroup>
        <InputGroup>
          <SwitchCheckbox size="md" id="n0" checked={checked} onChange={setChecked}>
            커뮤니티 알림 받기
          </SwitchCheckbox>
        </InputGroup>
      </NotificationGroup>
    </div>
  );
};

export default SettingNotification;

const NotificationGroup = styled.div`
  margin-bottom: 4rem;
`;
const NotificationHeader = styled.h2`
  margin-bottom: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightGrey};
  padding-bottom: 0.5rem;
`;
