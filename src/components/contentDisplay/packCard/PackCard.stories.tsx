import type { Meta, StoryObj } from "@storybook/react";
import PackCard from "./PackCard";

const meta: Meta<typeof PackCard> = {
  title: "Components/Pack Card",
  component: PackCard,
};

export default meta;
type Story = StoryObj<typeof PackCard>;

export const Default: Story = {
  args: {
    title: "Ultralight backpacking",
    description: "Affordable, ultralight, and easy to find backpacking items",
  },
};
