import { Button, CustomButtonProps } from "@components/common/button";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "common/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    $padding: {
      table: {
        category: "Customize Design",
        subcategory: "CSS",
        defaultValue: {
          summary: "",
          detail: "단위까지 입력해야 합니다. e.g. 1rem",
        },
        type: { summary: "string" },
      },
    },
    $margin: {
      table: {
        category: "Customize Design",
        subcategory: "CSS",
        defaultValue: {
          summary: "",
          detail: "단위까지 입력해야 합니다. e.g. 1rem",
        },
        type: { summary: "string" },
      },
    },
    $borderRadius: {
      table: {
        category: "Customize Design",
        subcategory: "CSS",
        defaultValue: {
          summary: "",
          detail: "단위까지 입력해야 합니다. e.g. 1rem",
        },
        type: { summary: "string" },
      },
    },
    $customStyle: {
      table: {
        category: "Customize Design",
        subcategory: "CSS",
        defaultValue: {
          summary: "",
          detail: "정령 방법이 없을떄 임시로 사용합니다.",
        },
        type: { summary: "string" },
      },
    },
  },
  parameters: {
    layout: "fullscreen",
    // 추가
    componentSubtitle:
      "기본적인 상호작용을 위한 버튼은 이 컴포넌트를 사용합니다.",
    docs: {
      description: {
        // 추가
        component: `type올 조절해 submit 버튼으로 활용도 가능하나 useForm을 사용한다면 SubmitButton이 따로 존재합니다.`,
      },
    },
  },
} satisfies Meta<CustomButtonProps>;

export default meta;

type Story = StoryObj<typeof meta>;

// export const HomePage = () => <Home />;
export const Primary: Story = {
  args: {
    variant: "primary",
    children: "button",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "button",
  },
};

export const Transparent: Story = {
  args: {
    variant: "transparent",
    children: "button",
  },
};
