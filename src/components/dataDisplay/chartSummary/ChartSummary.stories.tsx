import type { Meta, StoryObj } from "@storybook/react";
import ChartSummary from "./ChartSummary";

const meta: Meta<typeof ChartSummary> = {
  title: "Data Display/Chart Summary",
  component: ChartSummary,
};

export default meta;
type Story = StoryObj<typeof ChartSummary>;

export const Default: Story = {
  // args: {
  //   data: [
  //     { group: "Food", weight: 3 },
  //     { group: "IPO", weight: 1 },
  //     { group: "Shelter", weight: 5.5 },
  //     { group: "Pack", weight: 6 },
  //     { group: "CAT", weight: 1.9 },
  //     { group: "Clothing", weight: 4.4 },
  //     { group: "Cooking", weight: 4 },
  //     { group: "Sleeping", weight: 5 },
  //     { group: "HOA", weight: 1.9 },
  //     { group: "Water", weight: 2.5 },
  //     { group: "Electronics", weight: 2.2 },
  //   ],
  // },
};

export const NoData: Story = {
  args: {
    data: [],
  },
};
