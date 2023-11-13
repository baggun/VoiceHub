import SwitchCheckbox, { SwitchCheckboxProps } from "@/components/common/checkbox/SwitchCheckbox";
import Profile, { ProfileProps } from "@/components/profile";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "common/SwitchCheckbox",
  component: SwitchCheckbox,
  tags: ["autodocs"],
  argTypes: {},
  parameters: {
    layout: "fullscreen",
    // 추가
    componentSubtitle: "프로필의 기본이 되는 컴포넌트입니다.",
    docs: {
      description: {
        // 추가
        component: `팔로우 및 자기소개 등 더 큰 프로필을 관리하려면 이 컴포넌트를 재사용하는 ProfileCard를 사용하세요.`,
      },
    },
  },
} satisfies Meta<SwitchCheckboxProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: "default",
    checked: false,
  },
};

export const Checked: Story = {
  args: {
    id: "default",
    checked: true,
  },
};
