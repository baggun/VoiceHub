import { Input } from "@/components/common/input";
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

const meta = {
  title: "common/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {},
  parameters: {
    // layout: "centered",
    // 추가
    componentSubtitle: "기본 Input",
    docs: {
      description: {
        // 추가
        component: `모든 Input은 해당 Input을 상속하여 사용합니다. `,
      },
    },
  },
} satisfies Meta<React.ComponentProps<"input">>;

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

    const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      setArgs({ value: e.target.value });
    };

    return <Input {...args} onChange={onValueChange} />;
  },
};
