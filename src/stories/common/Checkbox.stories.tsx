import Checkbox, { CheckboxProps } from "@/components/common/input/Checkbox";
import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";
import React from "react";

const meta = {
  title: "common/Checkbox/CheckBox",
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {},
  parameters: {
    layout: "fullscreen",
    // 추가
    componentSubtitle: "기본 Checkbox",
    docs: {
      description: {
        // 추가
        component: `단순 디자인의 Checkbox`,
      },
    },
  },
} satisfies Meta<CheckboxProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "라벨",
    checked: false,
  },
  render: ({ ...args }) => {
    const [, setArgs] = useArgs();

    const onValueChange = (checked: boolean) => {
      setArgs({ checked });
    };

    return <Checkbox {...args} onChange={onValueChange} />;
  },
};
