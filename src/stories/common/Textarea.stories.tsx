import Textarea from "@components/common/textarea";
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

const meta = {
  title: "common/Textarea/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  argTypes: {},
  parameters: {
    // layout: "centered",
    // 추가
    componentSubtitle: "기본 Textarea",
    docs: {
      description: {
        // 추가
        component: `모든 Textarea은 해당 Textarea을 상속하여 사용합니다. `,
      },
    },
  },
} satisfies Meta<React.ComponentProps<"textarea">>;

export default meta;
import { useArgs } from "@storybook/preview-api";

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: "default",
    value: "",
    placeholder: "입력하세요",
  },
  render: ({ ...args }) => {
    const [, setArgs] = useArgs();

    const onValueChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      e.preventDefault();
      setArgs({ value: e.target.value });
    };

    return <Textarea {...args} onChange={onValueChange} />;
  },
};
