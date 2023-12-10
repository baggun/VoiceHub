import type { Meta, StoryObj } from "@storybook/react";
import AudioWave, { AudioWaveProps } from "@components/audio/player/AudioWave";
import { RecoilRoot } from "recoil";

const meta = {
  title: "voice/AudioWave",
  component: AudioWave,
  tags: ["autodocs"],
  argTypes: {},
  parameters: {
    componentSubtitle: "WaveSurfer 를 사용한 AudioWave 입니다.",
    docs: {
      description: {
        component: `내부적으로 audio recoil 로 값을 보내 별도로 재생합니다. (때문에 Storybook 에서는 재생이 되지 않습니다.)`,
      },
    },
  },
} satisfies Meta<AudioWaveProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    audioSrc: "test_voice.m4a",
    info: {
      id: "id",
      title: "title",
      ownerID: "ownerID",
      ownerName: "ownerName",
      ownerProfile: "base_profile.png",
      ownerDesc: "ownerDesc",
    },
    $darkmode: true,
  },
  render: AudioWave,
};
