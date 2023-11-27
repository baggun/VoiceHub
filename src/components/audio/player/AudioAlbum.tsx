"use client";

import Image from "next/image";
import styled, { css } from "styled-components";

import Tag from "@components/common/tag";

import { profileURL } from "@utils/url";
import Player, { AudioLikeStyle, AudioName, AudioPlayButton, AudioProps } from ".";

const AudioAlbum = ({ audioSrc, info, tags, userId, audioId, likes, $darkmode = false }: AudioProps) => {
  return (
    <AudioAlbumStyle $darkmode={$darkmode}>
      <Album>
        <AudioProfileImage src={profileURL(info.ownerProfile)} alt="profile" width={176} height={176}/>
        <Player audioSrc={audioSrc} info={info} $darkmode={$darkmode} />
      </Album>
      <div>
        <AudioName href={`/${userId}/${info.title}`} $darkmode={$darkmode}>
          {info.title}
        </AudioName>
        <AudioTags>{tags && tags.map(t => <Tag tag={t} key={`audioId-${t}`} />)}</AudioTags>
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
  width: 11rem;
  margin: 0.5rem 1.5rem 0.5rem 0rem;
  ${props =>
    props.$darkmode &&
    css`
      background-color: #2a2a2a;
    `}
  &:first-child {
    margin-top: 0rem;
  }
  &:last-child {
    margin-bottom: 0rem;
  }
  ${AudioName} {
    font-weight: 400;
    font-size: 1.125rem;
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    white-space: normal;
    overflow-wrap: break-word;
    padding-right: 0px;
  }
  .tag {
    opacity: 0.8;
  }
`;

const AudioProfileImage = styled(Image)`
  width: 11rem;
  height: 11rem;
  border: 1px solid #efefef;
  /* cursor: pointer; */
  border-radius: 0.5rem;
	-webkit-filter: blur(0);
	filter: blur(0);
	-webkit-transition: .2s ease-in-out;
	transition: .2s ease-in-out;
`;
const Album = styled.div`
  position: relative;
  border-radius: 0.5rem;
  &:hover {
    ${AudioPlayButton} {
      display: flex;
    }
    ${AudioProfileImage} {
      -webkit-filter: blur(1px);
      filter: blur(1px) brightness(90%);;
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

const AudioTags = styled.div`
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  white-space: normal;
  overflow-wrap: break-word;
  padding-right: 0px;
  font-size: 0.5rem;
`;
