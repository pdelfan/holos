import type { Meta, StoryObj } from "@storybook/react";
import PackSummary from "./PackSummary";

const meta: Meta<typeof PackSummary> = {
  title: "Example/Pack Summary",
  component: PackSummary,
};

export default meta;
type Story = StoryObj<typeof PackSummary>;

export const Default: Story = {};
