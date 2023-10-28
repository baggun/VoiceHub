export type AudioState = {
  audio: string;

  isControlWave: boolean;
  // ref: HTMLAudioElement | undefined;
  waveRef: WaveSurfer | undefined | any;
};
