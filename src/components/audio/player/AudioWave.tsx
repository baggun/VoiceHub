"use client";

import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { audioCurTimeState, audioInfoState, audioPlayState, audioState } from "@/recoil/audio/atom";

import WaveSurfer from "wavesurfer.js";
import PlayButton from "@components/common/button/PlayButton";
import { IconPlayerPauseFilled, IconPlayerPlayFilled } from "@tabler/icons-react";

import { timeFormat } from "@utils/format";
import { AudioInfo } from "@type/voice";

export default function AudioWave({
  audioSrc,
  info,
  $darkmode = true,
}: {
  audioSrc: string;
  info: AudioInfo;
  $darkmode?: boolean;
}) {
  const [audio, setAudio] = useRecoilState(audioState);
  const [audioPlay, setAudioPlay] = useRecoilState(audioPlayState);
  const setAudioInfo = useSetRecoilState(audioInfoState);
  const setAudioCurTime = useSetRecoilState(audioCurTimeState);

  const wavesurfer = useRef<any>(null);
  const waveformRef = useRef<any>(null);

  const [duration, setDuraion] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);

  const setTime = (t: number) => {
    if (!t) return;
    setAudioCurTime(t);
  };

  const changeAudio = (src: string, info: AudioInfo, isWave: boolean = false) => {
    if (info.title === "") info.title = "(알수없음)";
    setAudio({
      ...audio,
      audio: src,
      isControlWave: isWave,
    });
    setAudioPlay(true);
    setAudioInfo({ ...info });
    setAudioCurTime(0);
  };

  const setPlay = (isPlay: boolean, isWave: boolean = false) => {
    setAudio({
      ...audio,
      isControlWave: isWave || audio.isControlWave,
    });
    setAudioPlay(isPlay);
  };

  useEffect(() => {
    try {
      // 일시정지 중이었는데 플레이 요청이 들어오면 wavesurfer 도 플레이 시작
      if (audioPlay && audio.isControlWave) {
        wavesurfer.current?.play();
      } else if (wavesurfer && wavesurfer.current) wavesurfer.current.pause();
    } catch (e) {
      console.error("개발중 AudioPlayer 재렌더링시 생기는 에러", e);
    }
  }, [audioPlay, audio.isControlWave, wavesurfer]);

  const createWaveSufer = async () => {
    try {
      if (waveformRef.current) {
        wavesurfer.current = WaveSurfer.create({
          container: waveformRef.current,
          waveColor: "#646464",
          progressColor: "#c8c8ec",
          cursorColor: "#676AF9",
          barWidth: 5,
          barRadius: 5,
          // responsive: true,
          height: 200,
          normalize: true,
          // partialRender: true,
          plugins: [
            //     WaveSurfer.cursor.create({
            //     opacity: "1",
            //     showTime: true,
            //     customShowTimeStyle: {
            //       "background-color": "#000",
            //       color: "#fff",
            //       padding: "2px",
            //       "font-size": "1rem",
            //     },
            //   }),
          ],
          // maxCanvasWidth: 200
        });

        // console.log("11111", audioSrc);

        if (audioSrc) wavesurfer.current.load(audioSrc);
        // wavesurfer.current.load(
        //   "https://www.mfiles.co.uk/mp3-downloads/brahms-st-anthony-chorale-theme-two-pianos.mp3"
        // );

        //   플레이 시간 조정
        wavesurfer.current.on("seek", (e: any) => {
          setTime(e * wavesurfer.current.getDuration());
        });
        // 현재 시간 조정
        wavesurfer.current.on("audioprocess", function () {
          setCurrentTime(wavesurfer.current.getCurrentTime());
          setTime(wavesurfer.current.getCurrentTime());
        });
        // 오디오 로드 완료시
        wavesurfer.current.on("ready", function () {
          setDuraion(wavesurfer.current.getDuration());

          setAudioCurTime(wavesurfer.current.getCurrentTime());
        });
        // 오디오 재생 끝
        wavesurfer.current.on("finish", function () {
          setPlay(false);
        });
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    if (audioSrc) createWaveSufer();

    return () => {
      wavesurfer.current?.destroy();
    };
  }, [audioSrc]);

  const handlePlay = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
 
    if (audio.audio !== audioSrc) {
      changeAudio(audioSrc, info, true);
    } else {
      setPlay(!audioPlay, true);
    }
  };

  return (
    <WaveForm $darkmode={$darkmode}>
      <div className="controls">
        <PlayButton onClick={handlePlay}>
          {audioPlay && audio.audio === audioSrc ? (
            <IconPlayerPauseFilled className="icon" />
          ) : (
            <IconPlayerPlayFilled className="icon" />
          )}
        </PlayButton>
      </div>
      <Visualizer ref={waveformRef} className="visualizer">
        <p className="time">
          {timeFormat(currentTime)} / {timeFormat(duration)}
        </p>
      </Visualizer>
      {/* <audio src={} */}
    </WaveForm>
  );
}

const WaveForm = styled.div<{ $darkmode?: boolean }>`
  width: 100%;
  padding: 2rem;
  margin-bottom: 0.5rem;
  border-radius: 1rem;
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  background: ${props => (props.$darkmode ? props.theme.colors.grey_bg : props.theme.colors.bg)};
  ${({ theme }) => theme.devices.max_tablet} {
    padding: 1rem;
  }
`;
const Visualizer = styled.div`
  position: relative;
  margin-left: 1.5rem;
  width: 100%;
  ${({ theme }) => theme.devices.max_tablet} {
    margin-left: 1rem;
  }
  .time {
    position: absolute;
    right: 0;
    bottom: -1.25rem;
    color: #a5a5a5;
  }
`;
