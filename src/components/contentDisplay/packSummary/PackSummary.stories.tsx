import type { Meta, StoryObj } from "@storybook/react";
import PackSummary from "./PackSummary";

const meta: Meta<typeof PackSummary> = {
  title: "Content Display/Pack Summary",
  component: PackSummary,
};

export default meta;
type Story = StoryObj<typeof PackSummary>;

export const Default: Story = {
  args: {
    data: {
      weight_unit: "kg",
      base_weight: 2.2,
      total_weight: 5,
      currency: "$",
      total_cost: 900,
      total_items: 10,
    },
  },
};
