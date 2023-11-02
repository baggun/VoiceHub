import { DefaultValue, atom, atomFamily, selector } from "recoil";
import { AudioState } from "@/types/audio";
import { AudioInfo } from "@/types/voice";

/********************************************
 *
 *      Audio
 *
 ********************************************/
export const audioState = atom<AudioState>({
  key: "audioState",
  default: {
    audio: "",

    isControlWave: false,
    // ref: undefined, // new Audio // Global Audio, wave player를 제외한 모든 오디오는 여기서 실행함
    waveRef: undefined, // Wave Audio, 오디오 상세 페이지에서 setWaveRef로 값 변경해줌. wave player 를 이용한 오디오만 실행함.
  },
});
export const audioPlayState = atom<boolean>({
  key: "audioPlayState",
  default: false,
});

export const audioVolumeState = atom<number>({
  key: "audioVolumeState",
  default: 1,
});
export const audioMuteState = atom<boolean>({
  key: "audioMuteState",
  default: false,
});

export const audioInfoState = atom<AudioInfo>({
  key: "audioInfoState",
  default: {
    id: "",
    ownerID: "",
    ownerName: "",
    title: "",
  },
});

export const audioCurTimeState = atom<number>({
  key: "audioCurTimeState",
  default: 0,
});
export const audioDurationState = atom<number>({
  key: "audioDurationState",
  default: 0,
});
