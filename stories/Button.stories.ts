import Button from "@/components/button";
import type { Meta, StoryObj } from "@storybook/react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/Button",
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Solid: Story = {
  args: {
    children: "solid large",
    btnSize: "large",
    btnStyle: "solid",
  },
};

export const Outlined: Story = {
  args: {
    children: "outlined large",
    btnSize: "large",
    btnStyle: "outlined",
  },
};

export const OutlinedSecondary: Story = {
  args: {
    children: "outlined_secondary large",
    btnSize: "large",
    btnStyle: "outlined_secondary",
  },
};

export const Danger: Story = {
  args: {
    children: "danger large",
    btnSize: "large",
    btnStyle: "danger",
  },
};

export const DisabledLarge: Story = {
  args: {
    children: "disabled large",
    btnSize: "large",
    btnStyle: "solid",
    disabled: true,
  },
};

export const SolidSmall: Story = {
  args: {
    children: "solid small",
    btnSize: "x-small",
    btnStyle: "solid",
  },
};

export const OutlinedSmall: Story = {
  args: {
    children: "outlined small",
    btnSize: "x-small",
    btnStyle: "outlined",
  },
};

export const OutlinedSecondarySmall: Story = {
  args: {
    children: "outlined secondary small",
    btnSize: "x-small",
    btnStyle: "outlined_secondary",
  },
};

export const DisabledSmall: Story = {
  args: {
    children: "solid small",
    btnSize: "x-small",
    btnStyle: "solid",
    disabled: true,
  },
};
