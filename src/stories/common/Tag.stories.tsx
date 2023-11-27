import type { Meta, StoryObj } from "@storybook/react";
import Tag, { TagProps } from "@/components/common/tag";

const meta = {
  title: "common/Tag",
  component: Tag,
  tags: ["autodocs"],
  argTypes: {},
  parameters: {
    // 추가
    componentSubtitle: "모든 게시물의 관련 태그는 이 컴포넌트를 사용합니다.",
    docs: {
      description: {
        // 추가
        component: `태그를 누르면 해당 태그 검색 페이지로 이동`,
      },
    },
  },
} satisfies Meta<TagProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tag: "태그",
  },
};
export const DarkMode: Story = {
  args: {
    tag: "태그",
    $darkmode: true,
  },
};
