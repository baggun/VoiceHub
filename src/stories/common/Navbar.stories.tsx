import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { NavBar, NavBarNav, NavBarCollapse, NavBarNavLink } from "@/components/common/navbar";

const meta = {
  title: "common/NavBar",
  component: NavBar,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<{ children: React.ReactNode }>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "내용",
  },
};

export const Collapse: Story = {
  args: {
    children: "내용",
  },
  render: () => (
    <NavBar>
      <NavBarCollapse>
        <NavBarNav className="hide-lg">
          {["MENU_1", "MENU_2"].map(menu => (
            <NavBarNavLink to={menu} key={menu}>
              {menu}
            </NavBarNavLink>
          ))}
        </NavBarNav>
      </NavBarCollapse>
    </NavBar>
  ),
};

export const CollapseSide: Story = {
  args: {
    children: "내용",
  },
  render: () => (
    <NavBar>
      <NavBarCollapse>
        <NavBarNav className="hide-lg">
          {["메뉴_1", "메뉴_2"].map(menu => (
            <NavBarNavLink to={menu} key={menu}>
              {menu}
            </NavBarNavLink>
          ))}
        </NavBarNav>
      </NavBarCollapse>
      <div className="d-flex">사이드_메뉴</div>
    </NavBar>
  ),
};
