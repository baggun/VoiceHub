import Badge, { BadgeProps } from "@/components/common/badge";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "common/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {},
  parameters: {
    layout: "fullscreen",
    // 추가
    componentSubtitle: "간단한 강조가 필요할 때 사용합니다.",
    docs: {
      description: {
        // 추가
        component: ``,
      },
    },
  },
} satisfies Meta<BadgeProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "배지",
    $variant: "",
  },
};

export const Primary: Story = {
  args: {
    children: "배지",
    $variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    children: "배지",
    $variant: "secondary",
  },
};

export const Grey: Story = {
  args: {
    children: "배지",
    $variant: "grey",
  },
};
