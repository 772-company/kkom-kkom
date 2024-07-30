import ButtonFloating from "@/components/button-floating/button-floating";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Example/ButtonFloating",
  component: ButtonFloating,
  argTypes: {},
} satisfies Meta<typeof ButtonFloating>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Solid: Story = {
  args: {
    btnStyle: "solid",
    btnSize: "large",
    children: "solid",
  },
};

export const Outlined: Story = {
  args: {
    btnStyle: "outlined",
    btnSize: "medium",
    children: "outlined",
  },
};

export const Large: Story = {
  args: {
    btnStyle: "outlined",
    btnSize: "large",
    children: "large",
  },
};

export const Medium: Story = {
  args: {
    btnStyle: "solid",
    btnSize: "medium",
    children: "medium",
  },
};
