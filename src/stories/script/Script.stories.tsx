import ScriptCard, { ScriptCardProps } from "@components/script/ScriptCard";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "script/ScriptCard",
  component: ScriptCard,
  tags: ["autodocs"],
  argTypes: {},
  parameters: {
    // 추가
    componentSubtitle: "대본 카드", 
  },
} satisfies Meta<ScriptCardProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    script: {
      id: "id",
      likeCount: 3,
      script:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.        ",
      tags: ["tag1", "tag2"],
      title: "Script Titlte",
      voiceCount: 55,
    },
  },
};

export const Liked: Story = {
  ...Default,
  args: {
    script: {
      ...Default.args.script,
      likedByUser: true,
    },
  },
};
