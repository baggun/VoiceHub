"use client";

import styled, { css } from "styled-components";
import Tag from "@components/common/tag";
import Player, { AudioLikeStyle, AudioName, AudioProps } from ".";

const AudioBar = ({
  audioSrc,
  info,
  userId,
  audioId,
  likes,
  tags,
  $darkmode = false,
}: AudioProps) => {
  return (
    <AudioBarStyle $darkmode={$darkmode}>
      <Player audioSrc={audioSrc} info={info} $darkmode={$darkmode} />
      <AudioBarBody>
        <AudioName href={`/${userId}/${info.title}`} $darkmode={$darkmode}>
          {info.title}
        </AudioName>
        {/* {tags?.map(tag => <Tag key={`${info.id}-${tag}`} tag={tag} />)} */}
      </AudioBarBody>
      {likes && <AudioLikeStyle>{likes} LIKE</AudioLikeStyle>}
    </AudioBarStyle>
  );
};

export default AudioBar;

const AudioBarBody = styled.div`
  margin: 0rem 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const AudioBarStyle = styled.div<{ $darkmode: boolean }>`
  display: flex;
  background-color: ${({ theme }) => theme.colors.minute_bg};
  ${(props) =>
    props.$darkmode &&
    css`
      background-color: #2a2a2a;
    `}
  padding: 1rem;
  border-radius: 0.5rem;
  align-items: center;
  margin: 0.5rem 0rem;
  &:first-child {
    margin-top: 0rem;
  }
  &:last-child {
    margin-bottom: 0rem;
  }
`;
