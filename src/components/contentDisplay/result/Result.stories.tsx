import type { Meta, StoryObj } from "@storybook/react";
import Result from "./Result";

const meta: Meta<typeof Result> = {
  title: "Content Display/Result",
  component: Result,
};

export default meta;
type Story = StoryObj<typeof Result>;

export const Default: Story = {
  args: {
    status: "info",
    children: "No results found",
  },
};

export const Error: Story = {
  args: {
    status: "error",
    children: "Could not load results",
  },
};