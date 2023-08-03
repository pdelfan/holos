import type { Meta, StoryObj } from "@storybook/react";
import ChartSummary from "./ChartSummary";

const meta: Meta<typeof ChartSummary> = {
  title: "Data Display/Chart Summary",
  component: ChartSummary,
};

export default meta;
type Story = StoryObj<typeof ChartSummary>;

export const Default: Story = {
  args: {
    data: [
      { category: "Food", weight: 3 },
      { category: "IPO", weight: 1 },
      { category: "Shelter", weight: 5.5 },
      { category: "Pack", weight: 6 },
      { category: "CAT", weight: 1.9 },
      { category: "Clothing", weight: 4.4 },
      { category: "Cooking", weight: 4 },
      { category: "Sleeping", weight: 5 },
      { category: "HOA", weight: 1.9 },
      { category: "Water", weight: 2.5 },
      { category: "Electronics", weight: 2.2 },
    ],
  },
};
