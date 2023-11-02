"use client";

import styled, { css } from "styled-components";
// import { Link } from "react-router-dom";
// import { useDispatch, useSelector, shallowEqual } from "react-redux";
// import { RootState } from "@modules/index";
// import { changeAudio, setPlay } from "@modules/audio";
import { IconPlayerPauseFilled, IconPlayerPlayFilled } from "@tabler/icons-react";
import { AudioInfo } from "@type/voice";
import { useRecoilState, useSetRecoilState } from "recoil";
import { audioCurTimeState, audioInfoState, audioPlayState, audioState } from "@/recoil/audio/atom";
import Link from "next/link";

type AudioFileType = {
  audioSrc: string;
  info: AudioInfo;
  $darkmode?: boolean;
};
export const AudioFileButton = ({ audioSrc, info, $darkmode = false }: AudioFileType) => {
  const [audio, setAudio] = useRecoilState(audioState);
  const [play, setPlay] = useRecoilState(audioPlayState);
  const setAudioInfo = useSetRecoilState(audioInfoState);
  const setAudioCurTime = useSetRecoilState(audioCurTimeState);
  //   const [user, setUser] = useRecoilState(userState);

  // const dispatch = useDispatch();
  // const { audio.audio, audio.isPlay } = useSelector(
  //     (state: RootState) => ({
  //         audio.audio: state.audio.audio,
  //         audio.isPlay: state.audio.isPlay,
  //     }),
  //     shallowEqual
  // );

  const onClickHandler = () => {
    // console.log(play);

    if (audio.audio !== audioSrc) {
      // console.log(audioSrc, audio.audio);
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
      //   dispatch(changeAudio(audioSrc, info));
    } else {
      // console.log('1111111111');
      // setAudio((prev) => {
      //   return {
      //     ...prev,
      //     // isPlay: !audio.isPlay,
      //     isControlWave: prev.isControlWave,
      //   };
      // });
      setPlay(!play);
      // dispatch(setPlay(!audio.isPlay));
    }
  };

  return (
    <AudioPlayButton onClick={onClickHandler} $darkmode={$darkmode}>
      {play && audio.audio === audioSrc ? (
        <IconPlayerPauseFilled className="icon" />
      ) : (
        <IconPlayerPlayFilled className="icon" />
      )}
    </AudioPlayButton>
  );
};

type AudioFileBarType = AudioFileType & {
  userId: string;
  audioId: string;
  likes?: number;
};
export const AudioFileBar = ({ audioSrc, info, userId, audioId, likes, $darkmode = false }: AudioFileBarType) => {
  return (
    <AudioFileBarStyle $darkmode={$darkmode}>
      <AudioFileButton audioSrc={audioSrc} info={info} $darkmode={$darkmode} />
      <AudioName href={`/${userId}/${info.title}`} $darkmode={$darkmode}>
        {info.title}
      </AudioName>
      {likes && <AudioLikeStyle>{likes} LIKE</AudioLikeStyle>}
    </AudioFileBarStyle>
  );
};

const AudioName = styled(Link)<{ $darkmode: boolean }>`
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

const AudioFileBarStyle = styled.div<{ $darkmode: boolean }>`
  display: flex;
  background-color: ${({ theme }) => theme.colors.minute_bg};
  ${props =>
    props.$darkmode &&
    css`
      background-color: #2a2a2a;
    `}
  padding: 0.5rem 0rem;
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

const AudioPlayButton = styled.button<{ $darkmode: boolean }>`
  display: flex;
  flex: 0 0 auto;
  margin: 0 0.25rem;
  width: 3rem;
  height: 3rem;
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

const AudioLikeStyle = styled.span`
  flex: 0 0 auto;
  margin-right: 1rem;
  color: #efefef;
  font-weight: 300;
  font-size: 0.75rem;
`;
