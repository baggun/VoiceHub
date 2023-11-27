import type { Meta, StoryObj } from "@storybook/react";
import ContestCard from "@components/contest/ContestCard";
import { ContestData } from "@/types/contest";

const meta = {
  title: "contest/Contest",
  component: ContestCard,
  tags: ["autodocs"],
  argTypes: {},
  parameters: {
    // 추가
    componentSubtitle: "contest(공고 목록) 에서 상세 공고로 이동하기 위한 Contest 컴포넌트입니다. 이 컴포넌트를 사용하기 위해 항상 부모 컴포넌트가 flex 를 지녀야 함 을 명시하세요",
    docs: {
      description: {
        // 추가
        component: `게시물 목록을 출력할때 사용합니다.`,
      },
    },
  },
} satisfies Meta<ContestData>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: "id",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.      ",
    startDate: new Date(),
    endDate: new Date(),
    contest: "contest title",
    thumbnail: "111.png",
    hit: 111,
    company: "company",
  },
  render: args => (
    <div className="row">
      <ContestCard {...args} />
    </div>
  ),
};
