"use client";

import Link from "next/link";
import styled, { css } from "styled-components";
import { useRecoilState, useSetRecoilState } from "recoil";
import { audioCurTimeState, audioInfoState, audioPlayState, audioState } from "@/recoil/audio/atom";

import { IconPlayerPauseFilled, IconPlayerPlayFilled } from "@tabler/icons-react";
import { AudioInfo } from "@type/voice";
import Image from "next/image";
import { profileURL } from "@/utils/url";
import Tag from "../../common/tag";
import Player, { AudioLikeStyle, AudioName, AudioPlayButton, AudioProps } from ".";

const AudioAlbum = ({ audioSrc, info, tags, userId, audioId, likes, $darkmode = false }: AudioProps) => {
  return (
    <AudioAlbumStyle $darkmode={$darkmode}>
      <Album>
        <AudioProfileImage src={profileURL(info.ownerProfile)} alt="profile" />
        <Player audioSrc={audioSrc} info={info} $darkmode={$darkmode} />
      </Album>
      <div>
        <AudioName href={`/${userId}/${info.title}`} $darkmode={$darkmode}>
          {info.title}
        </AudioName>
        <div>{tags && tags.map(t => <Tag tag={t} key={`audioId-${t}`} />)}</div>
      </div>
      {likes && <AudioLikeStyle>{likes} LIKE</AudioLikeStyle>}
    </AudioAlbumStyle>
  );
};
export default AudioAlbum;

const AudioAlbumStyle = styled.div<{ $darkmode: boolean }>`
  display: inline-flex;
  flex-direction: column;
  /* background-color: ${({ theme }) => theme.colors.minute_bg}; */
  ${props =>
    props.$darkmode &&
    css`
      background-color: #2a2a2a;
    `}
  /* padding: 0.5rem 0rem; */
  /* border-radius: 0.5rem; */
  /* align-items: center; */
  margin: 0.5rem 1.5rem 0.5rem 0rem;
  &:first-child {
    /* margin-left: 0rem; */
    margin-top: 0rem;
  }
  &:last-child {
    margin-bottom: 0rem;
  }
  /* &+& {
    margin-left: 1rem;
  } */
  ${AudioName} {
    font-weight: 400;
    font-size: 1.125rem;
  }
  .tag {
    opacity: 0.8;
  }
`;

const AudioProfileImage = styled.img`
  width: 11rem;
  height: 11rem;
  border: 1px solid #efefef;
  /* cursor: pointer; */
  border-radius: 0.5rem;
`;
const Album = styled.div`
  position: relative;
  border-radius: 0.5rem;
  &:hover {
    ${AudioPlayButton} {
      display: flex;
    }
  }
  ${AudioPlayButton} {
    width: 3rem;
    height: 3rem;
    display: none;
    border-radius: 1rem;
    background-color: ${({ theme }) => theme.colors.primary};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: 0px;
    .icon {
      color: white;
    }
  }
`;
