import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import Search from "@components/search";

const meta = {
  title: "common/Search",
  component: Search,

  tags: ["autodocs"],
  argTypes: {},
  parameters: {
    // 추가
    componentSubtitle: "모든 게시물을 검색할때 사용합니다.",
    docs: {
      description: {
        // 추가
        component: `화면 중앙에 나타나는 Modal 기능이므로 사용할떄 덮을 배경과 클릭시 현 컴포넌트를 숨길 기능이 필요합니다.`,
      },
    },

    layout: "centered",
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: () => (
    <div style={{ height: "30rem" }}>
      <Search />
    </div>
  ),
};
