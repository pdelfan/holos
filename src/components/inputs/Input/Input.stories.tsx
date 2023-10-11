import type { Meta, StoryObj } from "@storybook/react";
import Input from "./Input";

const meta: Meta<typeof Input> = {
  title: "Input/Input",
  component: Input,
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    type: "text",
  },
};

export const Email: Story = {
  args: {
    type: "email",
    placeholder: "example@email.com",
  },
};

export const Number: Story = {
  args: {
    type: "number",
    step: "0.01",
    placeholder: "0",
  },
};

export const URL: Story = {
  args: {
    type: "url",
    placeholder: "https://",
  },
};
