import type { Meta, StoryObj } from "@storybook/react";
import { PostType } from "@/types/post";
import Post from "@components/community/Post";

const meta = {
  title: "post/Post",
  component: Post,
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
    nextjs: {
      appDirectory: true,
    },
  },
} satisfies Meta<{ post: PostType }>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    post: {
      id: "id",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.      ",
      createdAt: new Date(),
      title: "title",
      user_id: "user_id",
      user_nickname: "user_nickname",
      user_oid: "user_oid",
      user_profile: "base_profile.png",
      tags: ["tag1", "tag2"],
      commentCount: 1,
      comments: ["aaa", "bbb"],
    },
  },
};
