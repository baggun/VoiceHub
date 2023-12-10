import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";
import React from "react";
import Selector, { SelectorProps } from "@components/common/input/Selector";
import { OptionType } from "@type/option";

const meta = {
  title: "common/Selector",
  component: Selector,
  tags: ["autodocs"],
  argTypes: {},
  parameters: {
    // layout: "",
    // 추가
    componentSubtitle: "태그 Selector",
    docs: {
      description: {
        // 추가
        component: `태그를 검색하고, 존재하지 않는 태그라면 생성함`,
      },
    },
  },
} satisfies Meta<SelectorProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: [],
  },
  render: ({ ...args }) => {
    // const [selectorValue, setSelectorValue] = React.useState<readonly OptionType[]>([]);

    const [, setArgs] = useArgs();

    const setValueCHange = (
      value: React.SetStateAction<readonly OptionType[]>
    ) => {
      setArgs({ value });
    };

    return <Selector {...args} setValue={setValueCHange} />;
  },
};
