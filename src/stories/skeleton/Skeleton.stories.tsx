import type { Meta, StoryObj } from "@storybook/react";
import Skeleton, { SkeletonProps } from "@components/sekeleton";

const meta = {
  title: "skeleton/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  argTypes: {},
  parameters: {
    // 추가
    componentSubtitle: "community 에서 게시물로 이동하기 위한 Post 컴포넌트입니다.",
    docs: {
      description: {
        // 추가
        component: `게시물 목록을 출력할때 사용합니다.`,
      },
    },
  },
} satisfies Meta<SkeletonProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    width: "10rem",
    height: "10rem",
  },
  render: Skeleton,
};
