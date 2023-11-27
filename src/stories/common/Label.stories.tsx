import Label from "@/components/common/Label";
import type { Meta, StoryObj } from "@storybook/react";
import { FormGroup } from "@/components/common/form/Form";
import { Input } from "@/components/common/input";
import React from "react";

const meta = {
  title: "common/Label",
  component: Label,
  tags: ["autodocs"],
  argTypes: {},
  parameters: {
    // layout: "centered",
    // 추가
    componentSubtitle: "기본 Label",
    docs: {
      description: {
        // 추가
        component: `Label 을 사용할때는 기본적으로 가리킬 Input 이 필요합니다. 이떄 FormGroup으로 묶어주세요.`,
      },
    },
  },
} satisfies Meta<React.ComponentProps<"label">>;

export default meta;

type Story = StoryObj<typeof meta>;

const TemplateLabelForm = ({ ...args }) => {
  return (
    <FormGroup>
      <Label {...args} htmlFor="inputTitle">
        제목
      </Label>
      <Input id="inputTitle" />
    </FormGroup>
  );
}

export const Default: Story = {
  args: {},
  render: TemplateLabelForm,
};

export const RequireLabel: Story = {
  args: {
    $require: true,
  },
  render: TemplateLabelForm,
};
