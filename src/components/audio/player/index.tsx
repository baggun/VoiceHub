"use client";

import styled, { css } from "styled-components";
import Tag from "@/components/common/tag";
import { useRecoilState, useSetRecoilState } from "recoil";
import { audioCurTimeState, audioInfoState, audioPlayState, audioState } from "@/recoil/audio/atom";

import { IconPlayerPauseFilled, IconPlayerPlayFilled } from "@tabler/icons-react";
import { AudioInfo } from "@type/voice";
import Link from "next/link";

export type PlayerProps = {
  audioSrc: string;
  info: AudioInfo;
  $darkmode?: boolean;
};
export type AudioProps = PlayerProps & {
  userId: string;
  audioId: string;
  likes?: number;
  tags?: string[];
};
const Player = ({ audioSrc, info, $darkmode = false }: PlayerProps) => {
  const [audio, setAudio] = useRecoilState(audioState);
  const [play, setPlay] = useRecoilState(audioPlayState);
  const setAudioInfo = useSetRecoilState(audioInfoState);
  const setAudioCurTime = useSetRecoilState(audioCurTimeState);

  const onClickHandler = () => {
    if (audio.audio !== audioSrc) {
      setAudio(prev => {
        return {
          ...prev,
          // ref: prev.ref ? prev.ref : new Audio(),
          audio: audioSrc,
          isControlWave: false,
        };
      });
      let curInfo = { ...info };
      if (curInfo.title === "") curInfo.title = "(알수없음)";
      setAudioInfo({ ...curInfo });
      setPlay(true);
      setAudioCurTime(0);
    } else {
      setPlay(!play);
    }
  };

  return (
    <AudioPlayButton onClick={onClickHandler} $darkmode={$darkmode}>
      {play && audio.audio === audioSrc ? (
        <IconPlayerPauseFilled width={26} height={26} className="icon" />
      ) : (
        <IconPlayerPlayFilled width={26} height={26} className="icon" />
      )}
    </AudioPlayButton>
  );
};
export default Player;

export const AudioPlayButton = styled.button<{ $darkmode: boolean }>`
  display: flex;
  flex: 0 0 auto;
  /* margin: 0 0.25rem; */
  width: 2.5rem;
  height: 2.5rem;
  border: none;
  border-radius: 0.5rem;
  align-items: center;
  justify-content: center;
  color: black;
  background-color: #efefef;
  ${props =>
    props.$darkmode &&
    css`
      color: white;
      background-color: #2a2a2a;
    `}
`;

export const AudioName = styled(Link)<{ $darkmode: boolean }>`
  font-weight: 300;
  flex: 1 0 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0px;
  flex: 1 1 auto;
  padding-right: 1rem;
  color: ${props => (props.$darkmode ? "#d5d5d5" : "black")};
`;

export const AudioLikeStyle = styled.span`
  flex: 0 0 auto;
  margin-right: 1rem;
  color: #efefef;
  font-weight: 300;
  font-size: 0.75rem;
`;
