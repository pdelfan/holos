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
      { group_id: 0, group: "Food", weight: 3, weight_unit: "kg" },
      { group_id: 1, group: "IPO", weight: 1, weight_unit: "kg" },
      { group_id: 2, group: "Shelter", weight: 5.5, weight_unit: "kg" },
      { group_id: 3, group: "Pack", weight: 6, weight_unit: "kg" },
      { group_id: 4, group: "CAT", weight: 1.9, weight_unit: "kg" },
      { group_id: 5, group: "Clothing", weight: 4.4, weight_unit: "kg" },
      { group_id: 6, group: "Cooking", weight: 4, weight_unit: "kg" },
      { group_id: 7, group: "Sleeping", weight: 5, weight_unit: "kg" },
      { group_id: 8, group: "HOA", weight: 1.9, weight_unit: "kg" },
      { group_id: 9, group: "Water", weight: 2.5, weight_unit: "kg" },
      { group_id: 10, group: "Electronics", weight: 2.2, weight_unit: "kg" },
    ],
  },
};

export const NoData: Story = {
  args: {
    data: [],
  },
};

