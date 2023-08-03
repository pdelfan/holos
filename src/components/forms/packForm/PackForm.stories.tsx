import type { Meta, StoryObj } from "@storybook/react";
import PackForm from "./PackForm";

const meta: Meta<typeof PackForm> = {
  title: "Forms/Pack Form",
  component: PackForm,
};

export default meta;
type Story = StoryObj<typeof PackForm>;

export const Default: Story = {
  args: {
    onClose: () => {},
  },
};
