"use client";

import React, { useRef } from "react";
import styled from "styled-components";
// import { useDispatch, useSelector, shallowEqual } from "react-redux";
// import { RootState } from "@modules/index";
// import { setDuration, setPlay, setTime } from "@modules/audio";
import { timeFormat } from "@utils/format";
import {
  audioCurTimeState,
  audioDurationState,
  audioPlayState,
  audioState,
} from "@/recoil/audio/atom";
import { useRecoilState, useRecoilValue } from "recoil";

const ProgressBar = () => {
  const _audio = useRef<HTMLAudioElement | undefined>(
    typeof Audio !== "undefined" ? new Audio("") : undefined
  );

  // const {
  //     audioAudio,
  //     audioRef,
  //     audioWaveRef,
  //     audioIsPlay,
  //     isControlWave,
  //     currentTime,
  //     duration,
  // } = useSelector(
  //     (state: RootState) => ({
  //         audioAudio: state.audio.audio,
  //         audioRef: state._audio.current,
  //         audioWaveRef: state.audio.waveRef,
  //         audioIsPlay: state.audio.isPlay,
  //         isControlWave: state.audio.isControlWave,
  //         currentTime: state.audioCurTime,
  //         duration: state.audioDuration,
  //     }),
  //     shallowEqual
  // );
  // const dispatch = useDispatch();
  const audio = useRecoilValue(audioState);
  const inputRef = React.useRef<any>(null);
  const [play, setPlay] = useRecoilState(audioPlayState);
  const [audioCurTime, setAudioCurTime] = useRecoilState(audioCurTimeState);
  const [audioDuration, setAudioDuration] = useRecoilState(audioDurationState);

  React.useEffect(() => {
    if (!_audio.current) return;
    if (_audio.current.src !== audio.audio) _audio.current.src = audio.audio;
    if (!audio.isControlWave) {
      // _audio.current.src = audio.audio;
      if (play) {
        // 10초 이하의 오디오는 currentTime 조절시 자동으로 0으로 가는 문제 있음
        if (audioDuration > 10)
          _audio.current.currentTime =
            audioCurTime >= audioDuration ? 0 : audioCurTime;
        _audio.current.play();
      } else {
        _audio.current.pause();
      }
    }
  }, [play, audio.isControlWave, audio.audio]);

  React.useEffect(() => {
    const playEnded = () => {
      // dispatch(setPlay(false));
      setPlay(false);
    };
    const loadedData = () => {
      if (_audio.current)
        // setAudio({
        //     ...audio,
        //     duration: _audio.current.duration
        // })
        setAudioDuration(_audio.current?.duration);
      // dispatch(setDuration(_audio.current.duration));
    };
    const timeUpdate = () => {
      if (!_audio.current) return;

      if (_audio.current?.currentTime !== 0)
        setAudioCurTime(_audio.current?.currentTime);

      const per =
        (_audio.current?.currentTime / _audio.current?.duration) * 100;

      drawProgress(per);
      //     setAudio({
      // ...audio, currentTime: _audio.current.currentTime})
      // dispatch(setTime(_audio.current.currentTime));
      // drawProgress((audioRef.currentTime / audioRef.duration) * 100);
    };

    if (_audio.current) {
      _audio.current.addEventListener("timeupdate", timeUpdate);
      _audio.current.addEventListener("ended", playEnded);
      _audio.current.addEventListener("loadeddata", loadedData);
    }

    return () => {
      if (!_audio.current) return;
      _audio.current.removeEventListener("timeupdate", timeUpdate);
      _audio.current.removeEventListener("ended", playEnded);
      _audio.current.removeEventListener("loadeddata", loadedData);
    };
  }, [_audio.current]);

  // React.useEffect(() => {
  //   const per = (audioCurTime / audioDuration) * 100;

  //   drawProgress(per);
  // }, [audioCurTime, audioDuration]);

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (_audio.current) _audio.current.currentTime = +e.target.value;

    if (audio.isControlWave) {
      audio.waveRef?.seekTo(
        (_audio.current ? _audio.current.currentTime : 0) / audioDuration
      );
    }
  };

  const drawProgress = (per: number) => {
    inputRef.current.style.background = `linear-gradient(to right, #676AF9 0%, #676AF9 ${per}%, #404040 ${per}%, #404040 100%)`;
  };

  return (
    <div className="progress">
      <ProgressController
        ref={inputRef}
        min={0}
        step="0.001"
        max={audioDuration || 0}
        value={audioCurTime || 0}
        onChange={handleProgressChange}
      />
      <Timer>
        {_audio.current && (
          <>
            <span className="time current">
              {timeFormat(_audio.current?.currentTime)}
            </span>
            <span> / </span>
            <span className="time">{timeFormat(_audio.current?.duration)}</span>
          </>
        )}
      </Timer>
    </div>
  );
};

export default React.memo(ProgressBar);

const ProgressController = styled.input.attrs({
  type: "range",
})`
  width: 100%;
  position: absolute;
  top: -6px;
  left: 0px;
  z-index: ${({ theme }) => theme.zIndex.footerPlayer};

  height: 6px;
  -webkit-appearance: none;
  // margin: 10px 0;
  margin: 0px;
  width: 100%;
  transition: 450ms ease-in, top 0.1s linear, height 0.1s linear;
  // transition: all 0.1s linear;
  // transition-property: height, top;
  background: linear-gradient(to right, #404040 0%, #404040 100%);
  &:focus {
    outline: none;
  }
  &:hover {
    top: -12px;
    height: 12px;
  }
  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 7px;
    cursor: pointer;
    /* animate: 0.2s; */
    // box-shadow: 0px 0px 1px #2e2e2e;
    // background: #2e2e2e;
    border-radius: 50px;
    border: none;
  }
  &::-webkit-slider-thumb {
    opacity: 0;
  }
  &:focus::-webkit-slider-runnable-track {
    // background: #2e2e2e;
  }
  &::-moz-range-track {
    width: 100%;
    height: 7px;
    cursor: pointer;
    /* animate: 0.2s; */
    box-shadow: 0px 0px 5x #0000007f;
    background: #2e2e2e;
    border-radius: 50px;
    border: none;
  }
  &::-moz-range-thumb {
    opacity: 0;
  }
  &::-ms-track {
    width: 100%;
    height: 7px;
    cursor: pointer;
    /* animate: 0.2s; */
    background: transparent;
    border-color: transparent;
    color: transparent;
  }
  &::-ms-fill-lower {
    background: #2e2e2e;
    border: none;
    border-radius: 100px;
    // box-shadow: 0px 0px 1px #2e2e2e;
  }
  &::-ms-fill-upper {
    background: #2e2e2e;
    border: none;
    border-radius: 100px;
    // box-shadow: 0px 0px 1px #2e2e2e;
  }
  &::-ms-thumb {
    opacity: 0;
  }
  &:focus::-ms-fill-lower {
    background: black;
  }
  &:focus::-ms-fill-upper {
    background: black;
  }
`;

const Timer = styled.div`
  position: absolute;
  top: 50%;
  right: 10rem;
  transform: translate(0px, -50%);
  color: white;
  font-weight: 300;
`;
