import type { Meta, StoryObj } from "@storybook/react";
import AppBar from "./AppBar";

const meta: Meta<typeof AppBar> = {
  title: "Navigational/AppBar",
  component: AppBar,
};

export default meta;
type Story = StoryObj<typeof AppBar>;

export const Default: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
};
